import { MyCollectionArtworkInsights_artwork$key } from "__generated__/MyCollectionArtworkInsights_artwork.graphql"
import { Flex, Text } from "palette/elements"
import React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"

interface MyCollectionArtworkInsightsProps {
  artwork: MyCollectionArtworkInsights_artwork$key
}

export const MyCollectionArtworkInsights: React.FC<MyCollectionArtworkInsightsProps> = ({
  ...restProps
}) => {
  const artwork = useFragment<MyCollectionArtworkInsights_artwork$key>(
    artworkFragment,
    restProps.artwork
  )

  return (
    <Flex>
      <Text>Price & Market Insights</Text>
      {/* TODO: Demand Index */}
    </Flex>
  )
}

const artworkFragment = graphql`
  fragment MyCollectionArtworkInsights_artwork on Artwork {
    id
    slug
    internalID
  }
`
