import { FC } from "react";
import { Person } from "../generated/graphql";
import { Headpiece } from "../headpiece/Headpiece";
import { getPersonById } from "../utils/helpers";

interface Props {
  person: Person;
  persons: Person[];
}

export const TreeNode: FC<Props> = ({ person, persons }) => {
  return (
    <>
      <div>
        <Headpiece person={person}></Headpiece>
      </div>
      {person.child?.map((childId) => {
        const child = getPersonById(childId, persons);
        if (child) {
          return (
            <TreeNode person={child} persons={persons} key={childId}></TreeNode>
          );
        }
      })}
    </>
  );
};
