/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkAbout_artwork = {
    readonly id: string;
    readonly slug: string;
    readonly internalID: string;
    readonly " $refType": "MyCollectionArtworkAbout_artwork";
};
export type MyCollectionArtworkAbout_artwork$data = MyCollectionArtworkAbout_artwork;
export type MyCollectionArtworkAbout_artwork$key = {
    readonly " $data"?: MyCollectionArtworkAbout_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkAbout_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkAbout_artwork",
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '22d2bb2421f248c03d7832025114ddf1';
export default node;
