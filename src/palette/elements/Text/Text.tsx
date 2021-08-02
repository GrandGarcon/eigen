import { TEXT_LINE_HEIGHTS } from "@artsy/palette-tokens/dist/text"
import React from "react"
import { TextProps as RNTextProps } from "react-native"
import { animated } from "react-spring"
import styled from "styled-components/native"
import {
  color,
  ColorProps,
  compose,
  space,
  SpaceProps,
  style,
  typography,
  TypographyProps,
  variant as systemVariant,
} from "styled-system"
import {
  calculateLetterSpacing,
  calculateLineHeight,
  isControlledFontSize,
  isControlledLetterSpacing,
  isControlledLineHeight,
  TEXT_VARIANTS,
  TextLineHeight,
  TextVariant,
  TREATMENTS,
} from "./tokens"

/** BaseTextProps */
export type BaseTextProps = TypographyProps &
  ColorProps &
  SpaceProps & {
    variant?: TextVariant
  }

const textColor = style({
  prop: "textColor",
  cssProperty: "color",
  key: "colors",
})

/** styled functions for Text */
export const textMixin = compose(typography, color, textColor, space)

/** TextProps */
export type TextProps = BaseTextProps & RNTextProps

const InnerStyledText = styled.Text<TextProps>`
  ${systemVariant({ variants: TEXT_VARIANTS })}
  ${textMixin}
`

const InnerText = animated(InnerStyledText)

/** Text */
export const Text: React.FC<TextProps> = ({ children, variant, fontSize, letterSpacing, lineHeight, ...rest }) => {
  const props = {
    variant,
    fontSize,
    ...(!variant && letterSpacing && fontSize
      ? // Possibly convert the letterSpacing
        {
          letterSpacing:
            isControlledLetterSpacing(letterSpacing) && isControlledFontSize(fontSize)
              ? calculateLetterSpacing(fontSize, letterSpacing)
              : letterSpacing,
        }
      : {}),
    ...(!variant && lineHeight && fontSize
      ? // Possibly convert the lineHeight
        {
          lineHeight:
            isControlledLineHeight(lineHeight) && isControlledFontSize(fontSize)
              ? calculateLineHeight(fontSize, lineHeight)
              : lineHeight,
        }
      : {}),
    ...(variant && fontSize && typeof fontSize === "number" && !lineHeight
      ? // Possibly convert the lineHeight
        {
          lineHeight: fontSize * TEXT_LINE_HEIGHTS[TREATMENTS[variant].lineHeight as TextLineHeight],
        }
      : {}),
    ...rest,
  }

  return <InnerText {...props}>{children}</InnerText>
}

Text.displayName = "Text"

Text.defaultProps = {
  fontFamily: "sans",
}
