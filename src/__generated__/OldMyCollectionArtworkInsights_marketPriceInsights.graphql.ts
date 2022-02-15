/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OldMyCollectionArtworkInsights_marketPriceInsights = {
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkDemandIndex_marketPriceInsights" | "MyCollectionArtworkArtistMarket_marketPriceInsights">;
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
      "name": "MyCollectionArtworkDemandIndex_marketPriceInsights"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkArtistMarket_marketPriceInsights"
    }
  ],
  "type": "MarketPriceInsights",
  "abstractKey": null
};
(node as any).hash = '124898c3a77c5b9186630725fd977720';
export default node;
