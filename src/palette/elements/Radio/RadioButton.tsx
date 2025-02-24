import { themeGet } from "@styled-system/theme-get"
import { Text, useTheme } from "palette"
import React, { useState } from "react"
import {
  PixelRatio,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native"
import styled from "styled-components/native"

import { CssTransition } from "lib/Components/Bidding/Components/Animation/CssTransition"
import { Flex, FlexProps } from "lib/Components/Bidding/Elements/Flex"

const RADIOBUTTON_SIZE = 20
const DURATION = 250

export interface RadioButtonProps extends TouchableWithoutFeedbackProps, FlexProps {
  selected?: boolean
  focused?: boolean
  disabled?: boolean
  error?: boolean
  text?: React.ReactElement | string
  subtitle?: React.ReactElement | string
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected: selectedProp,
  disabled,
  error,
  onPress,
  style,
  text,
  subtitle,
  children,
  ...restProps
}) => {
  const { color, space } = useTheme()

  const fontScale = PixelRatio.getFontScale()
  const radioButtonSize = RADIOBUTTON_SIZE * fontScale

  const [selected, setSelected] = useState(selectedProp)
  const isSelected = selectedProp ?? selected

  const defaultRadioButtonStyle = {
    backgroundColor: color("white100"),
    borderColor: color("black60"),
  }

  const selectedRadioButtonStyle = {
    backgroundColor: color("black100"),
    borderColor: color("black100"),
  }

  const disabledRadioButtonStyle = {
    backgroundColor: color("black5"),
    borderColor: color("black10"),
  }

  const radioButtonStyles = {
    default: {
      notSelected: defaultRadioButtonStyle,
      selected: selectedRadioButtonStyle,
    },
    error: {
      notSelected: { backgroundColor: color("white100"), borderColor: color("red100") },
      selected: selectedRadioButtonStyle,
    },
  }

  const radioButtonStyle = disabled
    ? disabledRadioButtonStyle
    : radioButtonStyles[error ? "error" : "default"][isSelected ? "selected" : "notSelected"]

  const textColor = error ? color("red100") : disabled ? color("black30") : color("black100")
  const subtitleColor = error ? color("red100") : color("black30")

  return (
    <TouchableWithoutFeedback
      onPress={(event) => {
        if (disabled) {
          return
        }

        setSelected(!selected)
        onPress?.(event)
      }}
    >
      <Flex {...restProps}>
        <Flex flexDirection="row">
          <Flex mt="2px">
            <CssTransition
              style={[
                styles(fontScale).container,
                { marginRight: space("1") * fontScale },
                radioButtonStyle,
              ]}
              animate={["backgroundColor", "borderColor"]}
              duration={DURATION}
            >
              {!!isSelected &&
                (!!disabled ? (
                  <DisabledDot size={radioButtonSize} />
                ) : (
                  <RadioDot size={radioButtonSize} />
                ))}
            </CssTransition>
          </Flex>

          <Flex justifyContent="center">
            {!!text && (
              <Text variant="md" color={textColor}>
                {text}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex ml={(RADIOBUTTON_SIZE + space("1")) * fontScale} mt="6px">
          {!!subtitle && (
            <Text variant="xs" color={subtitleColor}>
              {subtitle}
            </Text>
          )}
        </Flex>
      </Flex>
    </TouchableWithoutFeedback>
  )
}

// styled-component does not have support for Animated.View
const styles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderStyle: "solid",
      height: RADIOBUTTON_SIZE * fontScale,
      width: RADIOBUTTON_SIZE * fontScale,
      borderRadius: (RADIOBUTTON_SIZE * fontScale) / 2,
    },
  })

interface RadioDotProps {
  size: number
}

// This component represents the white ● mark in CSS. We are not using styled-system since it's easier to specify raw CSS
// properties with styled-component.
// Height, Width, and Border Radius calculations are used to maintain the size of the white dot when scaling
export const RadioDot = styled.View.attrs<RadioDotProps>({})`
  height: ${({ size }) => size * 0.625};
  width: ${({ size }) => size * 0.625};
  border-radius: ${({ size }) => `${size * 0.3125}px`};
  background-color: white;
`

export const DisabledDot = styled(RadioDot)`
  border-bottom-color: ${themeGet("colors.black30")};
  border-left-color: ${themeGet("colors.black30")};
`
