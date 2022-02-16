/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OldMyCollectionArtworkDemandIndex_marketPriceInsights = {
    readonly demandRank: number | null;
    readonly " $refType": "OldMyCollectionArtworkDemandIndex_marketPriceInsights";
};
export type OldMyCollectionArtworkDemandIndex_marketPriceInsights$data = OldMyCollectionArtworkDemandIndex_marketPriceInsights;
export type OldMyCollectionArtworkDemandIndex_marketPriceInsights$key = {
    readonly " $data"?: OldMyCollectionArtworkDemandIndex_marketPriceInsights$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkDemandIndex_marketPriceInsights">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OldMyCollectionArtworkDemandIndex_marketPriceInsights",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "demandRank",
      "storageKey": null
    }
  ],
  "type": "MarketPriceInsights",
  "abstractKey": null
};
(node as any).hash = 'c52fcab1107b08d20421087309691ed0';
export default node;
