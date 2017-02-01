/* @flow */
import { Element as MinidomElement } from 'minidom/dom'
import formatHtml from './formatHtml'
import findElements from './findElements'

export default class Element {
  tagName: string;
  attributes: { [name: string]: string };
  outerHTML: string;
  textContent: string;
  parentElement: ?Element;
  children: Element[];

  constructor (minidomElement: MinidomElement, parentElement: ?Element) {
    this.tagName = minidomElement.tagName.toLowerCase()
    this.attributes = Array
      .from(minidomElement.attributes)
      .reduce(
        (memo, node) => Object.assign(memo, { [node.name]: node.value }),
        {}
      )
    this.outerHTML = minidomElement.outerHTML
    this.textContent = minidomElement.textContent
    this.parentElement = parentElement
    this.children = [ ...minidomElement.children ].map(
      minidomElement => new Element(minidomElement, this)
    )
  }

  toString (): string {
    return formatHtml(this)
  }

  querySelectorAll (selector: string): Element[] {
    return findElements(selector, this)
  }
}
