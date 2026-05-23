import type { AccentName, FlavorName, MonochromaticName } from '@catppuccin/palette'
import { flavorEntries } from '@catppuccin/palette'
import { dark2026Palette, light2026Palette } from '~/variants/2026'

export type VariantColorName = AccentName | Extract<MonochromaticName, 'mantle' | 'overlay1' | 'text'>

export type VariantPalette = Record<VariantColorName, string>

export const variantColorNames = [
  'rosewater',
  'flamingo',
  'pink',
  'mauve',
  'red',
  'maroon',
  'peach',
  'yellow',
  'green',
  'teal',
  'sky',
  'sapphire',
  'blue',
  'lavender',
  'text',
  'overlay1',
  'mantle',
] satisfies VariantColorName[]

const catppuccinVariants = flavorEntries.reduce((acc, [name, flavor]) => {
  acc[name] = variantColorNames.reduce((colors, color) => {
    colors[color] = flavor.colors[color].hex
    return colors
  }, {} as VariantPalette)
  return acc
}, {} as Record<FlavorName, VariantPalette>)

export const variantPalettes = {
  ...catppuccinVariants,
  'dark-2026': dark2026Palette,
  'light-2026': light2026Palette,
} as const satisfies Record<string, VariantPalette>

export type VariantName = keyof typeof variantPalettes

export const variantNames = Object.keys(variantPalettes) as VariantName[]

export const variantEntries = variantNames.map(name => [name, variantPalettes[name]] as const)

export const cssVariablePalette = variantColorNames
  .filter(color => color !== 'mantle')
  .map(color => [color, `var(--vscode-ctp-${color})`] as const)
