import { Loader } from "../stateHandling/Loader";
import { Line, Person, useTreeQuery } from "../../generated/graphql";
import { TreeNode } from "./TreeNode";
import { getPersonById } from "../../utils/helpers";

export type FamilyTree = {
  id: string;
  spouse?: string[];
  child: FamilyTree[];
};

/*
 * Builder
 */

const buildTree = (line: Line, persons: Person[]) => {
  const usedPersons: string[] = [];
  const trees: FamilyTree[] = [];

  const findOldestFatherNotInTree = (id: string): string => {
    const currentPerson = getPersonById(id, persons);

    if (currentPerson?.father) {
      if (usedPersons.includes(currentPerson.father)) {
        return id;
      }
      if (!getPersonById(currentPerson.father, persons)) {
        return id;
      }
      return findOldestFatherNotInTree(currentPerson.father);
    }

    return id;
  };

  const buildTreeFromFather = (id: string): FamilyTree => {
    const currentPerson = getPersonById(id, persons);
    const spouse = (currentPerson?.spouse ?? []) as string[];

    usedPersons.push(id);

    if (currentPerson?.child) {
      return {
        id,
        spouse,
        child: (
          currentPerson.child.filter(
            (c) => c && getPersonById(c, persons)
          ) as string[]
        ).map((c) => {
          return buildTreeFromFather(c);
        }),
      };
    }

    return {
      id,
      spouse,
      child: [],
    };
  };

  if (!line || !line.suite || !line.suite[0] || !line.label) {
    throw new Error("Impossible to build tree");
  }

  line.suite.forEach((p) => {
    const oldestNotInTreeId = findOldestFatherNotInTree(p as string);
    const oldestNotInTree = getPersonById(oldestNotInTreeId, persons);

    if (
      oldestNotInTree?.father &&
      usedPersons.includes(oldestNotInTree.father)
    ) {
      let fatherFound = false;
      trees.some((tree) => {
        const stack = [tree];

        while (stack.length && !fatherFound) {
          let currentNode = stack.pop();

          if (currentNode && currentNode.id === oldestNotInTree.father) {
            fatherFound = true;
            if (
              !currentNode.child.find((child) => child.id === oldestNotInTreeId)
            ) {
              currentNode.child.push(buildTreeFromFather(oldestNotInTreeId));
            }
          }
          if (currentNode?.child && currentNode.child.length) {
            stack.push(...currentNode.child);
          }
        }

        return fatherFound;
      });

      if (fatherFound) {
        return trees;
      }
    }

    if (!usedPersons.includes(p || "")) {
      trees.push(buildTreeFromFather(oldestNotInTreeId));
    }
  });

  return trees;
};

/*
 * Component
 */

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
    const trees = buildTree(neustrianLine, persons);
    console.log({ trees });
    return (
      <>
        {trees.map((t) => (
          <TreeNode key={t.id} node={t} persons={persons}></TreeNode>
        ))}
      </>
    );
  }

  return <></>;
};
