import { FC } from "react";
import { Person } from "../generated/graphql";
import { Headpiece } from "../headpiece/Headpiece";
import { getPersonById } from "../utils/helpers";
import { FamilyTree } from "./Tree";

interface Props {
  node: FamilyTree;
  persons: Person[];
}

export const TreeNode: FC<Props> = ({ node, persons }) => {
  const person = getPersonById(node.id, persons) || {
    id: node.id,
    label: node.id.replace("_", " "),
  };

  return (
    <>
      <Headpiece person={person}></Headpiece>
      <div>
        {node.child.map((child) => {
          return (
            <TreeNode node={child} persons={persons} key={child.id}></TreeNode>
          );
        })}
      </div>
    </>
  );
};
