import { Person } from "../generated/graphql";

export const Headpiece = ({ person }: { person: Person }) => {
  return <>{person.label}</>;
};
