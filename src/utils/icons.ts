import type { IconsConfig } from '~/types'
import defu from 'defu'
import { defaultConfig } from '~/defaults'
import { variantPalettes, type VariantColorName, type VariantName } from '~/utils/variants'

/**
 * Create icon with Text color from `flavor` only
 * @param svg unflavored (css-variables) icon svg
 * @param flavor flavor to pick Text color from
 * @returns flavored monochrome icon svg
 */
export function monochromeIcon(svg: string, flavor: VariantName) {
  return svg.replaceAll(
    /var\(--vscode-ctp-\w+\)/g,
    variantPalettes[flavor].text,
  )
}

/**
 * Create icon with default colors from `flavor`
 * @param svg unflavored (css-variables) icon svg
 * @param flavor flavor to pick palette from
 * @returns flavored default icon svg
 */
export function defaultIcon(svg: string, flavor: VariantName) {
  return svg.replaceAll(
    /var\(--vscode-ctp-\w+\)/g,
    v => variantPalettes[flavor][v.slice(17, -1) as VariantColorName],
  )
}

/**
 * Create icon given IconsConfig
 * @param svg unflavored (css-variables) icon svg
 * @param flavor flavor to pick palette from
 * @param config config to pick options from
 * @returns flavored default icon svg
 */
export function compileIcon(svg: string, flavor: VariantName, config: Partial<IconsConfig>) {
  const { monochrome } = defu(config, {
    monochrome: defaultConfig.monochrome,
  })

  return monochrome ? monochromeIcon(svg, flavor) : defaultIcon(svg, flavor)
}

/**
 * Generate hash based on options, used to bust VSC cache
 * @param config config to pick options from
 * @returns hash
 */
export function iconHash(config: Partial<IconsConfig>) {
  const hash = []
  if (config.monochrome)
    hash.push('m')
  return hash.join('')
}

/**
 * Adds hash to an SVG path
 * @param svgPath path string `<basename>.svg`
 * @param hash hash to apped to path
 * @returns `<basename><hash>.svg`
 */
export function hashedSvgPath(svgPath: string, hash: string) {
  return `${svgPath.slice(0, -4)}${hash}.svg`
}
