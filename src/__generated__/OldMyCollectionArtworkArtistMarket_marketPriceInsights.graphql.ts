/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OldMyCollectionArtworkArtistMarket_marketPriceInsights = {
    readonly annualLotsSold: number | null;
    readonly annualValueSoldCents: unknown | null;
    readonly sellThroughRate: number | null;
    readonly medianSaleToEstimateRatio: number | null;
    readonly liquidityRank: number | null;
    readonly demandTrend: number | null;
    readonly " $refType": "OldMyCollectionArtworkArtistMarket_marketPriceInsights";
};
export type OldMyCollectionArtworkArtistMarket_marketPriceInsights$data = OldMyCollectionArtworkArtistMarket_marketPriceInsights;
export type OldMyCollectionArtworkArtistMarket_marketPriceInsights$key = {
    readonly " $data"?: OldMyCollectionArtworkArtistMarket_marketPriceInsights$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OldMyCollectionArtworkArtistMarket_marketPriceInsights">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OldMyCollectionArtworkArtistMarket_marketPriceInsights",
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
      "name": "medianSaleToEstimateRatio",
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
(node as any).hash = 'a2822079a8c3ba3d459504b56fe93412';
export default node;
