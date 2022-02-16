/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkInsights_marketPriceInsights = {
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkDemandIndex_marketPriceInsights">;
    readonly " $refType": "MyCollectionArtworkInsights_marketPriceInsights";
};
export type MyCollectionArtworkInsights_marketPriceInsights$data = MyCollectionArtworkInsights_marketPriceInsights;
export type MyCollectionArtworkInsights_marketPriceInsights$key = {
    readonly " $data"?: MyCollectionArtworkInsights_marketPriceInsights$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkInsights_marketPriceInsights">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkInsights_marketPriceInsights",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkDemandIndex_marketPriceInsights"
    }
  ],
  "type": "MarketPriceInsights",
  "abstractKey": null
};
(node as any).hash = '0c21256ca277ce45bf53c8c4745a7ff3';
export default node;
