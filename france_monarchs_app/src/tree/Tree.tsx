import { Loader } from "../components/Loader";
import { Line, Person, useTreeQuery } from "../generated/graphql";
import { TreeNode } from "./TreeNode";
import { getPersonById } from "../utils/helpers";

export type FamilyTree = {
  id: string;
  child: FamilyTree[];
};

const buildTree = (line: Line, persons: Person[]) => {
  if (!line || !line.suite || !line.suite[0] || !line.label) {
    throw new Error("Impossible to build tree");
  }

  const usedPersons: string[] = [];

  const addPersonToTree = (id: string, asc: boolean): FamilyTree => {
    const currentPerson = getPersonById(id, persons);
    usedPersons.push(id);

    if (currentPerson?.father && asc) {
      if (getPersonById(currentPerson?.father, persons)) {
        return addPersonToTree(currentPerson.father, true);
      } else {
        return addPersonToTree(id, false);
      }
    }
    const child = currentPerson?.child?.length
      ? currentPerson.child.map((c) => addPersonToTree(c as string, false))
      : [];

    return {
      id,
      child,
    };
  };

  return addPersonToTree(line.suite[0], true);
};

export const Tree = () => {
  const [result, reexecuteQuery] = useTreeQuery();
  const { data, fetching, error } = result;

  if (fetching) {
    return <Loader></Loader>;
  }

  if (!data || !data.lines || !data.persons || error) {
    throw new Error("Unable to load tree");
  }

  const lines = data.lines;
  const persons = data.persons as Person[];

  const neustrianLine = lines.find((line) => line?.label === "Roi de Neustrie");

  if (neustrianLine) {
    const tree = buildTree(neustrianLine, persons);

    return <TreeNode tree={tree} persons={persons}></TreeNode>;
  }
};
