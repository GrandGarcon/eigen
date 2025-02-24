import OpaqueImageView from "lib/Components/OpaqueImageView/OpaqueImageView"
import { LocalImage, retrieveLocalImages } from "lib/utils/LocalImageStore"
import { Flex, NoImageIcon, useColor } from "palette"
import React, { useEffect, useState } from "react"
import { Image as RNImage } from "react-native"

export interface MyCollectionImageViewProps {
  imageURL?: string
  imageWidth: number
  imageHeight?: number
  aspectRatio?: number
  artworkSlug: string
}

export const MyCollectionImageView: React.FC<MyCollectionImageViewProps> = ({
  imageURL,
  imageWidth,
  imageHeight,
  aspectRatio,
  artworkSlug,
}) => {
  const color = useColor()
  const [localImage, setLocalImage] = useState<LocalImage | null>(null)

  useEffect(() => {
    retrieveLocalImages(artworkSlug).then((images) => {
      if (images && images.length > 0) {
        setLocalImage(images[0])
      }
    })
  }, [])

  const renderImage = () => {
    if (!!imageURL) {
      const targetURL = imageURL.replace(":version", "square")
      return (
        <OpaqueImageView
          testID="Image-Remote"
          imageURL={targetURL}
          retryFailedURLs
          height={imageHeight}
          width={imageWidth}
          aspectRatio={aspectRatio}
        />
      )
    } else if (localImage) {
      return (
        <RNImage
          testID="Image-Local"
          style={{
            width: imageWidth,
            height: (imageWidth / localImage.width) * localImage.height,
          }}
          resizeMode="contain"
          source={{ uri: localImage.path }}
        />
      )
    } else {
      const width = imageWidth ?? 120

      return (
        <Flex
          testID="Fallback"
          bg={color("black5")}
          width={width}
          height={120}
          justifyContent="center"
        >
          <NoImageIcon fill="black60" mx="auto" />
        </Flex>
      )
    }
  }

  return <>{renderImage()}</>
}
