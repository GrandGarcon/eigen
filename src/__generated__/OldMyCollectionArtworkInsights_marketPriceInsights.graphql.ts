/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OldMyCollectionArtworkInsights_marketPriceInsights = {
    readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkDemandIndex_marketPriceInsights" | "OldMyCollectionArtworkArtistMarket_marketPriceInsights">;
    readonly " $refType": "OldMyCollectionArtworkInsights_marketPriceInsights";
};
export type OldMyCollectionArtworkInsights_marketPriceInsights$data = OldMyCollectionArtworkInsights_marketPriceInsights;
export type OldMyCollectionArtworkInsights_marketPriceInsights$key = {
    readonly " $data"?: OldMyCollectionArtworkInsights_marketPriceInsights$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkInsights_marketPriceInsights">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OldMyCollectionArtworkInsights_marketPriceInsights",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OldMyCollectionArtworkDemandIndex_marketPriceInsights"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OldMyCollectionArtworkArtistMarket_marketPriceInsights"
    }
  ],
  "type": "MarketPriceInsights",
  "abstractKey": null
};
(node as any).hash = '8119720bd0c955292e605b4285caf23c';
export default node;
