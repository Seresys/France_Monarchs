import { Literal, Term, NamedNode } from "@rdfjs/types/data-model";
import ParsingClient from "sparql-http-client/ParsingClient";
import fs from "fs-extra";
import { Person } from "../types/person";

const MAX_PROPAGATION_LEVEL = 1;

/*
 * SparQL settings
 */

const endpointUrl = "https://dbpedia.org/sparql";
const getGeneralInfoQuery = (id: string) => `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://dbpedia.org/property/>
PREFIX db: <http://dbpedia.org/resource/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?label ?house ?title ?abstract ?birthPlace ?deathPlace ?burialPlace
WHERE {
  VALUES ?entity { <http://dbpedia.org/resource/${id}> }
    ?entity rdfs:label ?label.
    FILTER langMatches(lang(?label), 'fr')

    OPTIONAL {
      ?entity dbp:house/rdfs:label ?house
      FILTER langMatches(lang(?house), 'fr')
    }
    OPTIONAL {
      ?entity dbp:title/rdfs:label ?title
      FILTER langMatches(lang(?title), 'fr')
    }
    OPTIONAL {
      ?entity dbo:abstract ?abstract
      FILTER langMatches(lang(?abstract), 'fr')
    }
    OPTIONAL {
      ?entity dbp:birthPlace ?birthPlace
      FILTER langMatches(lang(?birthPlace), 'fr')
    }
    OPTIONAL {
      ?entity dbp:deathPlace ?deathPlace
      FILTER langMatches(lang(?deathPlace), 'fr')
    }
    OPTIONAL {
      ?entity dbp:burialPlace ?burialPlace
      FILTER langMatches(lang(?burialPlace), 'fr')
    }
}`;
const getDateInfoQuery = (id: string) => `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://dbpedia.org/property/>
PREFIX db: <http://dbpedia.org/resource/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?label ?birthDate ?deathDate ?activeYearsStartYear ?activeYearsEndYear
WHERE {
  VALUES ?entity { <http://dbpedia.org/resource/${id}> }
    ?entity rdfs:label ?label.
    FILTER langMatches(lang(?label), 'fr')

    OPTIONAL {
      ?entity dbp:birthDate ?birthDate
    }
    OPTIONAL {
      ?entity dbp:deathDate ?deathDate
    }
    OPTIONAL {
      ?entity dbo:activeYearsStartYear ?activeYearsStartYear
    }
    OPTIONAL {
      ?entity dbo:activeYearsEndYear ?activeYearsEndYear
    }
}`;
const getFamilyInfosQuery = (id: string) => `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://dbpedia.org/property/>
PREFIX db: <http://dbpedia.org/resource/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?label ?father ?mother ?child ?spouse
WHERE {
  VALUES ?entity { <http://dbpedia.org/resource/${id}> }
    ?entity rdfs:label ?label.
    FILTER langMatches(lang(?label), 'fr')

    OPTIONAL {
      ?entity dbp:father ?father
    }
    OPTIONAL {
      ?entity dbp:mother ?mother
    }
    OPTIONAL {
      ?entity dbo:child ?child
    }
    OPTIONAL {
      ?entity dbo:spouse ?spouse
    }
}`;

const client = new ParsingClient({ endpointUrl });

/*
 * Formatting
 */

const getValue = (term: Term) => {
  return (term && term.value) ?? undefined;
};
const getResourceValue = (term?: Term) => {
  return (
    term && term.value && term.value.replace("http://dbpedia.org/resource/", "")
  );
};
const getValues = (terms: Term[]) => {
  if (!terms) {
    return [];
  }
  return [
    ...new Set(terms.map((term) => getResourceValue(term)).filter(Boolean)),
  ];
};
const buildDate = (date: Term) => {
  if (!date) {
    return undefined;
  }

  if (
    (date as Literal).datatype.value ===
      "http://www.w3.org/2001/XMLSchema#integer" ||
    (date as Literal).datatype.value ===
      "http://www.w3.org/2001/XMLSchema#gYear"
  ) {
    return {
      dateFormat: "yyyy",
      precise: true,
      date: new Date(new Date(0).setFullYear(Number(date.value))),
    };
  }

  if (
    (date as Literal).datatype.value ===
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"
  ) {
    const cleanValue = date.value.replace("c. ", "");

    return {
      dateFormat: "yyyy",
      precise: false,
      date: new Date(new Date(0).setFullYear(Number(cleanValue))),
    };
  }

  if (
    (date as Literal).datatype.value === "http://www.w3.org/2001/XMLSchema#date"
  ) {
    return {
      dateFormat: "dd-mm-yyyy",
      precise: true,
      date: new Date(date.value),
    };
  }

  console.log("Unhandled case for date", JSON.stringify(date));

  return undefined;
};
const getOnePersonGeneralInfos = async (id: string) => {
  const generalInfo = (await client.query.select(getGeneralInfoQuery(id)))[0];
  const dateInfo = (await client.query.select(getDateInfoQuery(id)))[0];

  return {
    id,
    label: getValue(generalInfo.label),
    house: getValue(generalInfo.house),
    title: getValue(generalInfo.title),
    abstract: getValue(generalInfo.abstract),
    birthDate: buildDate(dateInfo.birthDate),
    birthPlace: getValue(generalInfo.birthPlace),
    deathDate: buildDate(dateInfo.deathDate),
    deathPlace: getValue(generalInfo.deathPlace),
    burialPlace: getValue(generalInfo.burialPlace),
    activeYearsStartYear: parseInt(
      getValue(dateInfo.activeYearsStartYear) ?? "0"
    ),
    activeYearsEndYear: parseInt(getValue(dateInfo.activeYearsEndYear) ?? "0"),
  };
};

/*
 * Files handling
 */

const writePersonFile = async (id: string, obj: Person): Promise<void> => {
  try {
    await fs.outputJson(`./assets/persons/${id}.json`, obj);
    console.log("Extract done for " + id);
  } catch (err) {
    console.error("Error writing file for " + id, err);
  }
};
const getLine = async (id: string) => {
  try {
    const data = await fs.readJson(`./assets/lines/${id}.json`);
    return data;
  } catch (err) {
    return {
      label: "",
      suite: [],
    };
  }
};

const isPersonExists = async (id: string): Promise<boolean> => {
  try {
    const data = await fs.readJson(`./assets/persons/${id}.json`);
    return Boolean(data);
  } catch (err) {
    return false;
  }
};

/*
 * Tree build
 */

const buildFamily = (
  fetchFamily: (string | undefined)[],
  existingFamily?: string[],
  knownFamily?: string
): string[] => {
  return [
    ...new Set([
      ...((fetchFamily.filter(Boolean) ?? []) as string[]),
      ...(existingFamily ?? []),
      ...(knownFamily ? [knownFamily.replace(" ", "_")] : []),
    ]),
  ];
};

const buildPersonInfos = async (
  id?: string,
  propagationLevel: number = MAX_PROPAGATION_LEVEL,
  knownFamily?: { knownChild?: string; knownSpouse?: string }
) => {
  if (!id || propagationLevel > MAX_PROPAGATION_LEVEL || id.includes(" ")) {
    return;
  }

  const familyInfos = await client.query.select(getFamilyInfosQuery(id));

  if (familyInfos.length === 0) {
    return;
  }

  const readData = (await isPersonExists(id))
    ? await fs.readJson(`./assets/persons/${id}.json`)
    : {
        child: [],
        spouse: [],
      };

  const father = getResourceValue(familyInfos[0].father);
  const mother = getResourceValue(familyInfos[0].mother);
  const child = getValues(familyInfos.map((info) => info.child));
  const spouse = getValues(familyInfos.map((info) => info.spouse));

  await buildPersonInfos(mother, propagationLevel + 1, {
    knownChild: id.replace(" ", "_"),
  });
  await buildPersonInfos(father, propagationLevel + 1, {
    knownChild: id.replace(" ", "_"),
  });
  child.forEach(async (p) => await buildPersonInfos(p, propagationLevel + 1));
  spouse.forEach(
    async (p) =>
      await buildPersonInfos(p, propagationLevel + 1, {
        knownSpouse: id.replace(" ", "_"),
      })
  );

  const links = {
    father: father?.replace(" ", "_"),
    mother: mother?.replace(" ", "_"),
    child: buildFamily(child, readData.child, knownFamily?.knownChild),
    spouse: buildFamily(spouse, readData.spouse, knownFamily?.knownSpouse),
  };

  const person = {
    ...(await getOnePersonGeneralInfos(id)),
    ...links,
  } as Person;

  await writePersonFile(id, person);
};

const writeSuiteInfos = async (suite: string[]) => {
  // I put delay here, or I'll reach dbpedia rate limit
  suite.forEach(
    async (person, index) =>
      await setTimeout(function () {
        buildPersonInfos(person, 0);
      }, index * 1000)
  );
};

const writeSuitesInfos = async () => {
  await fs.remove(`./assets/persons`);

  const salianFranksKings = await getLine("salian_franks_kings");
  const franksKings = await getLine("franks_kings");
  const neustrianFranceKings = await getLine("neustrian_france_kings");
  const austrasianFranceKings = await getLine("austrasian_france_kings");
  const franceKings = await getLine("france_kings");
  const franceEmpire = await getLine("france_empire");
  const franceAndNavarreKings = await getLine("france_and_navarre_kings");
  const frenchKings = await getLine("french_kings");

  // I put delay here, or I'll reach dbpedia rate limit
  await writeSuiteInfos(salianFranksKings.suite);
  await setTimeout(async () => {
    await writeSuiteInfos(franksKings.suite);
  }, 2000);
  await setTimeout(async () => {
    await writeSuiteInfos(neustrianFranceKings.suite);
  }, 2000);
  await setTimeout(async () => {
    await writeSuiteInfos(austrasianFranceKings.suite);
  }, 2000);
  await setTimeout(async () => {
    await writeSuiteInfos(franceKings.suite);
  }, 2000);
  await setTimeout(async () => {
    await writeSuiteInfos(franceEmpire.suite);
  }, 2000);
  await setTimeout(async () => {
    await writeSuiteInfos(franceAndNavarreKings.suite);
  }, 2000);
  await setTimeout(async () => {
    await writeSuiteInfos(frenchKings.suite);
  }, 2000);
};

const buildTrees = async () => {
  await writeSuitesInfos();
};

buildTrees();

