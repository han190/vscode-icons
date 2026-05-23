import type { VariantColorName, VariantName } from '~/utils/variants'
import { cssVariablePalette, variantEntries } from '~/utils/variants'

export type ColorName = Exclude<VariantColorName, 'mantle'>

/**
 * Simplified ColorName/Hexcode palettes
 */
export const palettes = {
  ...variantEntries.reduce((acc, [variantName, palette]) => ({
    ...acc,
    [variantName]: Object.entries(palette)
      .filter(([color]) => color !== 'mantle')
      .map(([color, hex]) => [color as ColorName, hex]),
  }), {} as Record<VariantName | 'css-variables', Array<[ColorName, string]>>),
  'css-variables': cssVariablePalette as Array<[ColorName, string]>,
}

export const folders = [
  'css-variables',
  'frappe',
  'latte',
  'macchiato',
  'mocha',
  'dark-2026',
  'light-2026',
] satisfies Array<keyof typeof palettes>
