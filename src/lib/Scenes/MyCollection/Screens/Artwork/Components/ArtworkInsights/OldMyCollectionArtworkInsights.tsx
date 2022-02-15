import { OldMyCollectionArtworkInsights_artwork } from "__generated__/OldMyCollectionArtworkInsights_artwork.graphql"
import { OldMyCollectionArtworkInsights_marketPriceInsights } from "__generated__/OldMyCollectionArtworkInsights_marketPriceInsights.graphql"
import { ScreenMargin } from "lib/Scenes/MyCollection/Components/ScreenMargin"
import { capitalize } from "lodash"
import { Separator, Spacer, Text } from "palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { pluralizeMedium } from "../../../../utils/pluralizeArtworkMedium"
import { MyCollectionArtworkArtistArticlesFragmentContainer } from "./MyCollectionArtworkArtistArticles"
import { MyCollectionArtworkArtistAuctionResultsFragmentContainer } from "./MyCollectionArtworkArtistAuctionResults"
import { MyCollectionArtworkArtistMarketFragmentContainer } from "./MyCollectionArtworkArtistMarket"
import { MyCollectionArtworkDemandIndexFragmentContainer } from "./MyCollectionArtworkDemandIndex"

interface OldMyCollectionArtworkInsightsProps {
  artwork: OldMyCollectionArtworkInsights_artwork
  marketPriceInsights: OldMyCollectionArtworkInsights_marketPriceInsights
}

export const OldMyCollectionArtworkInsights: React.FC<OldMyCollectionArtworkInsightsProps> = ({
  artwork,
  marketPriceInsights,
}) => {
  const showMarketPriceInsights = Boolean(marketPriceInsights)
  return (
    <>
      {showMarketPriceInsights && (
        <>
          <Separator />
          <Spacer my={1} />

          <ScreenMargin>
            <Text variant="md">Market Insights</Text>
            <Text variant="xs" color="black60">
              {capitalize(artwork.sizeBucket!)} {pluralizeMedium(artwork.medium!)} by{" "}
              {artwork.artist?.name || "Unknown Artist"}
            </Text>
          </ScreenMargin>
          <Spacer mt={3} />
          <MyCollectionArtworkDemandIndexFragmentContainer
            artwork={artwork}
            marketPriceInsights={marketPriceInsights}
          />
          <ScreenMargin mt={2} mb={3}>
            <Separator />
          </ScreenMargin>
          <MyCollectionArtworkArtistMarketFragmentContainer
            artwork={artwork}
            marketPriceInsights={marketPriceInsights}
          />
        </>
      )}

      <MyCollectionArtworkArtistAuctionResultsFragmentContainer artwork={artwork} />
      <MyCollectionArtworkArtistArticlesFragmentContainer artwork={artwork} />
    </>
  )
}

export const OldMyCollectionArtworkInsightsFragmentContainer = createFragmentContainer(
  OldMyCollectionArtworkInsights,
  {
    artwork: graphql`
      fragment OldMyCollectionArtworkInsights_artwork on Artwork {
        sizeBucket
        medium
        artist {
          name
        }
        ...MyCollectionArtworkArtistAuctionResults_artwork
        ...MyCollectionArtworkArtistArticles_artwork
        ...MyCollectionArtworkArtistMarket_artwork
        ...MyCollectionArtworkDemandIndex_artwork
      }
    `,
    marketPriceInsights: graphql`
      fragment OldMyCollectionArtworkInsights_marketPriceInsights on MarketPriceInsights {
        ...MyCollectionArtworkDemandIndex_marketPriceInsights
        ...MyCollectionArtworkArtistMarket_marketPriceInsights
      }
    `,
  }
)
