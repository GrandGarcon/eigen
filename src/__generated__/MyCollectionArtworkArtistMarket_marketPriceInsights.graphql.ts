/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkArtistMarket_marketPriceInsights = {
    readonly annualLotsSold: number | null;
    readonly annualValueSoldCents: unknown | null;
    readonly sellThroughRate: number | null;
    readonly medianSaleOverEstimatePercentage: number | null;
    readonly liquidityRank: number | null;
    readonly demandTrend: number | null;
    readonly " $refType": "MyCollectionArtworkArtistMarket_marketPriceInsights";
};
export type MyCollectionArtworkArtistMarket_marketPriceInsights$data = MyCollectionArtworkArtistMarket_marketPriceInsights;
export type MyCollectionArtworkArtistMarket_marketPriceInsights$key = {
    readonly " $data"?: MyCollectionArtworkArtistMarket_marketPriceInsights$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkArtistMarket_marketPriceInsights">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkArtistMarket_marketPriceInsights",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "annualLotsSold",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "annualValueSoldCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sellThroughRate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medianSaleOverEstimatePercentage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "liquidityRank",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "demandTrend",
      "storageKey": null
    }
  ],
  "type": "MarketPriceInsights",
  "abstractKey": null
};
(node as any).hash = '5bc1529fa80b983eb9e732969def497b';
export default node;
