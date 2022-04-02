import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type HistoricDate = {
  __typename?: 'HistoricDate';
  date?: Maybe<Scalars['Date']>;
  format?: Maybe<Scalars['String']>;
  precise?: Maybe<Scalars['Boolean']>;
};

export type Line = {
  __typename?: 'Line';
  label?: Maybe<Scalars['String']>;
  suite?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Person = {
  __typename?: 'Person';
  abstract?: Maybe<Scalars['String']>;
  activeYearsEndYear?: Maybe<Scalars['Int']>;
  activeYearsStartYear?: Maybe<Scalars['Int']>;
  birthDate?: Maybe<HistoricDate>;
  birthPlace?: Maybe<Scalars['String']>;
  burialPlace?: Maybe<Scalars['String']>;
  child?: Maybe<Array<Maybe<Scalars['String']>>>;
  deathDate?: Maybe<HistoricDate>;
  deathPlace?: Maybe<Scalars['String']>;
  father?: Maybe<Scalars['String']>;
  house?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  label: Scalars['String'];
  mother?: Maybe<Scalars['String']>;
  spouse?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  lines?: Maybe<Array<Maybe<Line>>>;
  persons?: Maybe<Array<Maybe<Person>>>;
};

export type TreeQueryVariables = Exact<{ [key: string]: never; }>;


export type TreeQuery = { __typename?: 'Query', persons?: Array<{ __typename?: 'Person', id: string, label: string, abstract?: string | null, birthPlace?: string | null, deathPlace?: string | null, burialPlace?: string | null, mother?: string | null, father?: string | null, child?: Array<string | null> | null, spouse?: Array<string | null> | null, activeYearsStartYear?: number | null, activeYearsEndYear?: number | null, house?: string | null, title?: string | null, birthDate?: { __typename?: 'HistoricDate', date?: any | null, precise?: boolean | null, format?: string | null } | null, deathDate?: { __typename?: 'HistoricDate', date?: any | null, precise?: boolean | null, format?: string | null } | null } | null> | null, lines?: Array<{ __typename?: 'Line', label?: string | null, suite?: Array<string | null> | null } | null> | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": null,
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "HistoricDate",
        "fields": [
          {
            "name": "date",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "format",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "precise",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Line",
        "fields": [
          {
            "name": "label",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "suite",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Person",
        "fields": [
          {
            "name": "abstract",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "activeYearsEndYear",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "activeYearsStartYear",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "birthDate",
            "type": {
              "kind": "OBJECT",
              "name": "HistoricDate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "birthPlace",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "burialPlace",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "child",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deathDate",
            "type": {
              "kind": "OBJECT",
              "name": "HistoricDate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "deathPlace",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "father",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "house",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "label",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "mother",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "spouse",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "lines",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Line",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "persons",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Person",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;

export const TreeDocument = gql`
    query Tree {
  persons {
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
    activeYearsStartYear
    activeYearsEndYear
    house
    title
  }
  lines {
    label
    suite
  }
}
    `;

export function useTreeQuery(options?: Omit<Urql.UseQueryArgs<TreeQueryVariables>, 'query'>) {
  return Urql.useQuery<TreeQuery>({ query: TreeDocument, ...options });
};