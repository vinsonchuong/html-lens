/* @flow */
import cssauron from 'cssauron'

type Matchable<T> = {
  tagName: string,
  textContent: string,
  getAttribute(name: string): string,
  parentElement: ?T,
  children: T[]
}

export default function findElements<S, T: S & Matchable<S>>(
  selector: string,
  elements: T[]
): T[] {
  const elementLookup = new Set(elements)

  const match = cssauron({
    tag: 'tagName',
    contents: 'textContent',
    id: 'getAttribute("id")',
    class: 'getAttribute("class")',
    parent: (element) => elementLookup.has(element.parentElement) ?
      element.parentElement :
      null,
    children: 'children',
    attr: 'getAttribute(attr)'
  })(selector)

  return Array.from(elements)
    .filter(match)
}
