/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Filters_filteredArtworks$ref } from "./Filters_filteredArtworks.graphql";
export type FiltersTestsQueryVariables = {};
export type FiltersTestsQueryResponse = {
    readonly show: {
        readonly filteredArtworks: {
            readonly " $fragmentRefs": Filters_filteredArtworks$ref;
        } | null;
    } | null;
};
export type FiltersTestsQuery = {
    readonly response: FiltersTestsQueryResponse;
    readonly variables: FiltersTestsQueryVariables;
};



/*
query FiltersTestsQuery {
  show(id: "anderson-fine-art-gallery-flickinger-collection") {
    filteredArtworks(size: 0, medium: "*", priceRange: "*-*", aggregations: [MEDIUM, PRICE_RANGE, TOTAL]) {
      ...Filters_filteredArtworks
      id
    }
    id
  }
}

fragment Filters_filteredArtworks on FilterArtworks {
  aggregations {
    slice
    counts {
      internalID
      name
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "anderson-fine-art-gallery-flickinger-collection"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "MEDIUM",
      "PRICE_RANGE",
      "TOTAL"
    ]
  },
  {
    "kind": "Literal",
    "name": "medium",
    "value": "*"
  },
  {
    "kind": "Literal",
    "name": "priceRange",
    "value": "*-*"
  },
  {
    "kind": "Literal",
    "name": "size",
    "value": 0
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FiltersTestsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "show",
        "storageKey": "show(id:\"anderson-fine-art-gallery-flickinger-collection\")",
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "filteredArtworks",
            "storageKey": "filteredArtworks(aggregations:[\"MEDIUM\",\"PRICE_RANGE\",\"TOTAL\"],medium:\"*\",priceRange:\"*-*\",size:0)",
            "args": (v1/*: any*/),
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Filters_filteredArtworks",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FiltersTestsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "show",
        "storageKey": "show(id:\"anderson-fine-art-gallery-flickinger-collection\")",
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "filteredArtworks",
            "storageKey": "filteredArtworks(aggregations:[\"MEDIUM\",\"PRICE_RANGE\",\"TOTAL\"],medium:\"*\",priceRange:\"*-*\",size:0)",
            "args": (v1/*: any*/),
            "concreteType": "FilterArtworks",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "aggregations",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "slice",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "internalID",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "name",
                        "args": null,
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ]
                  }
                ]
              },
              (v2/*: any*/)
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FiltersTestsQuery",
    "id": "b478a3aad4b9ea11f9139b4c8a982185",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = 'e318e38974eb410658681707b3444b16';
export default node;
