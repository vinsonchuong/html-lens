/* @flow */
import pretty from 'pretty'

export default function(html: string): string {
  return pretty(html)
    .replace(/<(.*?) \/>/g, '<$1>')
    .replace(/ *\n/g, '\n')
    .trim()
}
