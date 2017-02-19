/* @flow */
import pretty from 'pretty'

type Formattable = { outerHTML: string }

export default function (element: Formattable): string {
  return pretty(element.outerHTML)
    .replace(/<!doctype html>/i, '<!doctype html>')
    .replace(/<(.*?) \/>/g, '<$1>')
    .replace(/ *\n/g, '\n')
    .trim()
}
