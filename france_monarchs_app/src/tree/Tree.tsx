import { Loader } from "../components/Loader";
import { Person, useTreeQuery } from "../generated/graphql";
import { TreeNode } from "./TreeNode";
import { getPersonById } from "../utils/helpers";

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

  const neustrianLine = data.lines.find(
    (line) => line?.label === "Roi de Neustrie"
  );
  const kingsIds = neustrianLine?.suite;
  if (kingsIds && kingsIds.length && kingsIds[0] && persons) {
    const firstKing = getPersonById(kingsIds[0], persons);

    if (firstKing) {
      return <TreeNode person={firstKing} persons={persons}></TreeNode>;
    }
  }
};
