/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 50fb790a1c3e52364c963968eee2b71e */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OldMyCollectionArtworkDemandIndexTestsQueryVariables = {};
export type OldMyCollectionArtworkDemandIndexTestsQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkDemandIndex_artwork">;
    } | null;
    readonly marketPriceInsights: {
        readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkDemandIndex_marketPriceInsights">;
    } | null;
};
export type OldMyCollectionArtworkDemandIndexTestsQuery = {
    readonly response: OldMyCollectionArtworkDemandIndexTestsQueryResponse;
    readonly variables: OldMyCollectionArtworkDemandIndexTestsQueryVariables;
};



/*
query OldMyCollectionArtworkDemandIndexTestsQuery {
  artwork(id: "some-artwork-id") {
    ...OldMyCollectionArtworkDemandIndex_artwork
    id
  }
  marketPriceInsights(artistId: "some-artist-id", medium: "painting") {
    ...OldMyCollectionArtworkDemandIndex_marketPriceInsights
    id
  }
}

fragment OldMyCollectionArtworkDemandIndex_artwork on Artwork {
  internalID
  slug
}

fragment OldMyCollectionArtworkDemandIndex_marketPriceInsights on MarketPriceInsights {
  demandRank
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "some-artwork-id"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "artistId",
    "value": "some-artist-id"
  },
  {
    "kind": "Literal",
    "name": "medium",
    "value": "painting"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OldMyCollectionArtworkDemandIndexTestsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OldMyCollectionArtworkDemandIndex_artwork"
          }
        ],
        "storageKey": "artwork(id:\"some-artwork-id\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketPriceInsights",
        "kind": "LinkedField",
        "name": "marketPriceInsights",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OldMyCollectionArtworkDemandIndex_marketPriceInsights"
          }
        ],
        "storageKey": "marketPriceInsights(artistId:\"some-artist-id\",medium:\"painting\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OldMyCollectionArtworkDemandIndexTestsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"some-artwork-id\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketPriceInsights",
        "kind": "LinkedField",
        "name": "marketPriceInsights",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "demandRank",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "marketPriceInsights(artistId:\"some-artist-id\",medium:\"painting\")"
      }
    ]
  },
  "params": {
    "id": "50fb790a1c3e52364c963968eee2b71e",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v3/*: any*/),
        "artwork.internalID": (v3/*: any*/),
        "artwork.slug": (v3/*: any*/),
        "marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MarketPriceInsights"
        },
        "marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "marketPriceInsights.id": (v3/*: any*/)
      }
    },
    "name": "OldMyCollectionArtworkDemandIndexTestsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '9b72b73e6fd352f394e26ddcf3489e95';
export default node;
