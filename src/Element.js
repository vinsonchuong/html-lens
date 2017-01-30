/* @flow */
import {Element as MinidomElement} from 'minidom/dom'
import formatHtml from './formatHtml'
import findElements from './findElements';

export default class Element {
  minidomElement: MinidomElement
  tagName: string
  textContent: string
  parentElement: ?Element
  children: Element[]

  constructor(minidomElement: MinidomElement, parentElement: ?Element) {
    this.minidomElement = minidomElement
    this.tagName = minidomElement.tagName.toLowerCase()
    this.textContent = minidomElement.textContent
    this.children = [...minidomElement.children]
      .map((minidomElement) => new Element(minidomElement, this))
    this.parentElement = parentElement
  }

  toString(): string {
    return formatHtml(this.minidomElement.outerHTML)
  }

  getAttribute(name: string): string {
    return this.minidomElement.getAttribute(name)
  }

  * traverse(): Generator<Element, void, void> {
    yield this
    for (const childElement of this.children) {
      yield* childElement.traverse()
    }
  }

  querySelectorAll(selector: string): Element[] {
    return findElements(selector, Array.from(this.traverse()))
  }
}
