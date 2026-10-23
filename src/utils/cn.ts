/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to clsx for simple use cases.
 */
export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ')
