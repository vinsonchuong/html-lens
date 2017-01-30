/* @flow */
import cssauron from 'cssauron'

type Matchable<T> = {
  tagName: string,
  textContent: string,
  attributes: {[name: string]: string},
  parentElement: ?(T & Matchable<T>),
  children: (T & Matchable<T>)[]
}

function flattenTree<S, T: S & Matchable<S>>(rootElement: T): T[] {
  let elements = [rootElement]
  for (let index = 0; index < elements.length; index++) {
    elements = [
      ...elements.slice(0, index + 1),
      ...elements[index].children,
      ...elements.slice(index + 1)
    ]
  }
  return elements
}

export default function findElements<S, T: S & Matchable<S>>(
  selector: string,
  rootElement: T
): T[] {
  const elements = flattenTree(rootElement)
  const elementLookup = new Set(elements)

  const match = cssauron({
    tag: 'tagName',
    contents: 'textContent',
    id: 'attributes.id',
    class: 'attributes.class',
    parent: (element) => elementLookup.has(element.parentElement) ?
      element.parentElement :
      null,
    children: 'children',
    attr: 'attributes[attr]'
  })(selector)

  return elements.filter(match)
}
