/**
 * @generated SignedSource<<894163c31cc09112a48bdb8ca461db2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TreeQuery$variables = {};
export type TreeQuery$data = {
  readonly persons: ReadonlyArray<{
    readonly id?: string;
    readonly label?: string;
    readonly abstract?: string | null;
    readonly birthDate?: {
      readonly date: any | null;
      readonly precise: boolean | null;
      readonly format: string | null;
    } | null;
    readonly birthPlace?: string | null;
    readonly deathDate?: {
      readonly date: any | null;
      readonly precise: boolean | null;
      readonly format: string | null;
    } | null;
    readonly deathPlace?: string | null;
    readonly burialPlace?: string | null;
    readonly mother?: string | null;
    readonly father?: string | null;
    readonly child?: ReadonlyArray<string | null> | null;
    readonly spouse?: ReadonlyArray<string | null> | null;
    readonly activeYearsStartYear?: number | null;
    readonly activeYearsEndYear?: number | null;
    readonly house?: string | null;
    readonly title?: string | null;
  } | null> | null;
  readonly lines: ReadonlyArray<{
    readonly label: string | null;
    readonly suite: ReadonlyArray<string | null> | null;
  } | null> | null;
};
export type TreeQuery = {
  variables: TreeQuery$variables;
  response: TreeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "date",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "precise",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "format",
    "storageKey": null
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "abstract",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "HistoricDate",
      "kind": "LinkedField",
      "name": "birthDate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "birthPlace",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "HistoricDate",
      "kind": "LinkedField",
      "name": "deathDate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deathPlace",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "burialPlace",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mother",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "father",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "child",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "spouse",
      "storageKey": null
    }
  ],
  "type": "PersonCommon",
  "abstractKey": "__isPersonCommon"
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "activeYearsStartYear",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "activeYearsEndYear",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "house",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "King",
  "abstractKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Line",
  "kind": "LinkedField",
  "name": "lines",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "suite",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TreeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "persons",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      (v4/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TreeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "persons",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      (v4/*: any*/)
    ]
  },
  "params": {
    "cacheID": "8553ac16951e6c03b3bf26959d1c34ec",
    "id": null,
    "metadata": {},
    "name": "TreeQuery",
    "operationKind": "query",
    "text": "query TreeQuery {\n  persons {\n    __typename\n    ... on PersonCommon {\n      __isPersonCommon: __typename\n      id\n      label\n      abstract\n      birthDate {\n        date\n        precise\n        format\n      }\n      birthPlace\n      deathDate {\n        date\n        precise\n        format\n      }\n      deathPlace\n      burialPlace\n      mother\n      father\n      child\n      spouse\n    }\n    ... on King {\n      activeYearsStartYear\n      activeYearsEndYear\n      house\n      title\n    }\n  }\n  lines {\n    label\n    suite\n  }\n}\n"
  }
};
})();

(node as any).hash = "8bf990513f402313e28b69b18b114e37";

export default node;
