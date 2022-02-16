import { MyCollectionArtworkInsights_artwork$key } from "__generated__/MyCollectionArtworkInsights_artwork.graphql"
import { MyCollectionArtworkInsights_marketPriceInsights$key } from "__generated__/MyCollectionArtworkInsights_marketPriceInsights.graphql"
import { StickyTabPageScrollView } from "lib/Components/StickyTabPage/StickyTabPageScrollView"
import { Flex, Text } from "palette/elements"
import React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"
import { MyCollectionArtworkDemandIndex } from "./Components/ArtworkInsights/MyCollectionArtworkDemandIndex"

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
      <Flex my={2} pt={1}>
        <Text variant="lg">Price & Market Insights</Text>
        <MyCollectionArtworkDemandIndex
          artwork={artwork}
          marketPriceInsights={marketPriceInsights}
        />
      </Flex>
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
