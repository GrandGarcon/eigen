/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OldMyCollectionArtworkDemandIndex_artwork = {
    readonly internalID: string;
    readonly slug: string;
    readonly " $refType": "OldMyCollectionArtworkDemandIndex_artwork";
};
export type OldMyCollectionArtworkDemandIndex_artwork$data = OldMyCollectionArtworkDemandIndex_artwork;
export type OldMyCollectionArtworkDemandIndex_artwork$key = {
    readonly " $data"?: OldMyCollectionArtworkDemandIndex_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkDemandIndex_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OldMyCollectionArtworkDemandIndex_artwork",
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
(node as any).hash = 'ced2569b9d79207a9f2a0ddfc50a03f8';
export default node;
