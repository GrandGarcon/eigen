import { MyCollectionArtworkInsights_artwork$key } from "__generated__/MyCollectionArtworkInsights_artwork.graphql"
import { MyCollectionArtworkInsights_marketPriceInsights$key } from "__generated__/MyCollectionArtworkInsights_marketPriceInsights.graphql"
import { StickyTabPageScrollView } from "lib/Components/StickyTabPage/StickyTabPageScrollView"
import { Text } from "palette/elements"
import React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"
import { MyCollectionArtworkDemandIndexFragmentContainer } from "./Components/ArtworkInsights/MyCollectionArtworkDemandIndex"

interface MyCollectionArtworkInsightsProps {
  artwork: MyCollectionArtworkInsights_artwork$key
  marketPriceInsights: MyCollectionArtworkInsights_marketPriceInsights$key
}

export const MyCollectionArtworkInsights: React.FC<MyCollectionArtworkInsightsProps> = ({
  ...restProps
}) => {
  const artwork = useFragment<MyCollectionArtworkInsights_artwork$key>(
    artworkFragment,
    restProps.artwork
  )

  const marketPriceInsights = useFragment<MyCollectionArtworkInsights_marketPriceInsights$key>(
    marketPriceInsightsFragment,
    restProps.marketPriceInsights
  )

  return (
    <StickyTabPageScrollView>
      <Text>Price & Market Insights</Text>
      <MyCollectionArtworkDemandIndexFragmentContainer
        artwork={artwork}
        marketPriceInsights={marketPriceInsights}
      />
    </StickyTabPageScrollView>
  )
}

const artworkFragment = graphql`
  fragment MyCollectionArtworkInsights_artwork on Artwork {
    id
    slug
    internalID
    ...MyCollectionArtworkDemandIndex_artwork
  }
`

const marketPriceInsightsFragment = graphql`
  fragment MyCollectionArtworkInsights_marketPriceInsights on MarketPriceInsights {
    ...MyCollectionArtworkDemandIndex_marketPriceInsights
  }
`
