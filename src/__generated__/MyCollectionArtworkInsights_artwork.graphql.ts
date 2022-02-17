/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkInsights_artwork = {
    readonly id: string;
    readonly slug: string;
    readonly internalID: string;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkDemandIndex_artwork" | "MyCollectionArtworkArtistMarket_artwork">;
    readonly " $refType": "MyCollectionArtworkInsights_artwork";
};
export type MyCollectionArtworkInsights_artwork$data = MyCollectionArtworkInsights_artwork;
export type MyCollectionArtworkInsights_artwork$key = {
    readonly " $data"?: MyCollectionArtworkInsights_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkInsights_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkInsights_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkDemandIndex_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkArtistMarket_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '825549861c770ed219f4f63b02b90525';
export default node;
