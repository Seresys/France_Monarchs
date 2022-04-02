import { FC } from "react";
import { Person } from "../generated/graphql";
import { Headpiece } from "../headpiece/Headpiece";
import { getPersonById } from "../utils/helpers";
import { FamilyTree } from "./Tree";

interface Props {
  tree: FamilyTree;
  persons: Person[];
}

export const TreeNode: FC<Props> = ({ tree, persons }) => {
  const person = getPersonById(tree.id, persons) || {
    id: tree.id,
    label: tree.id.replace("_", " "),
  };

  return (
    <>
      <Headpiece person={person}></Headpiece>
      <div>
        {tree.child.map((child) => {
          return (
            <TreeNode tree={child} persons={persons} key={child.id}></TreeNode>
          );
        })}
      </div>
    </>
  );
};
