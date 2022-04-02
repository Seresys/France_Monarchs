import { graphql, useLazyLoadQuery } from "react-relay";
import { TreeQuery } from "./__generated__/TreeQuery.graphql";

const query = graphql`
  query TreeQuery {
    persons {
      ... on PersonCommon {
        id
        label
        abstract
        birthDate {
          date
          precise
          format
        }
        birthPlace
        deathDate {
          date
          precise
          format
        }
        deathPlace
        burialPlace
        mother
        father
        child
        spouse
      }
      ... on King {
        activeYearsStartYear
        activeYearsEndYear
        house
        title
      }
    }
    lines {
      label
      suite
    }
  }
`;

export const Tree = () => {
  const { persons, lines } = useLazyLoadQuery<TreeQuery>(query, {});

  return <>{persons?.map((p) => (p ? <div>{p.label}</div> : <div></div>))}</>;
};
