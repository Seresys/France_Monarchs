import { Maybe } from "graphql/jsutils/Maybe";
import { Person } from "../generated/graphql";

export const getPersonById = (
  id?: Maybe<string>,
  persons?: Person[]
): Person | undefined => {
  if (!id || !persons) {
    return undefined;
  }
  return persons.find((p) => p.id === id);
};
