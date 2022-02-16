/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OldMyCollectionArtworkInsights_artwork = {
    readonly sizeBucket: string | null;
    readonly medium: string | null;
    readonly artist: {
        readonly name: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkArtistAuctionResults_artwork" | "MyCollectionArtworkArtistArticles_artwork" | "MyCollectionArtworkArtistMarket_artwork" | "OldMyCollectionArtworkDemandIndex_artwork">;
    readonly " $refType": "OldMyCollectionArtworkInsights_artwork";
};
export type OldMyCollectionArtworkInsights_artwork$data = OldMyCollectionArtworkInsights_artwork;
export type OldMyCollectionArtworkInsights_artwork$key = {
    readonly " $data"?: OldMyCollectionArtworkInsights_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkInsights_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OldMyCollectionArtworkInsights_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sizeBucket",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkArtistAuctionResults_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkArtistArticles_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkArtistMarket_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OldMyCollectionArtworkDemandIndex_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '12003b5e88858e145f28943a556fb5ac';
export default node;
