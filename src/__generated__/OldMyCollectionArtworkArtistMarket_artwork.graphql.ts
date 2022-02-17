/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OldMyCollectionArtworkArtistMarket_artwork = {
    readonly internalID: string;
    readonly slug: string;
    readonly " $refType": "OldMyCollectionArtworkArtistMarket_artwork";
};
export type OldMyCollectionArtworkArtistMarket_artwork$data = OldMyCollectionArtworkArtistMarket_artwork;
export type OldMyCollectionArtworkArtistMarket_artwork$key = {
    readonly " $data"?: OldMyCollectionArtworkArtistMarket_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkArtistMarket_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OldMyCollectionArtworkArtistMarket_artwork",
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'a8cc4184b49afba9d105917a4608f3c6';
export default node;
