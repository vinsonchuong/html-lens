/* @flow */
import {Element as MinidomElement} from 'minidom/dom'
import formatHtml from './formatHtml'
import findElements from './findElements';

export default class Element {
  minidomElement: MinidomElement
  tagName: string
  outerHTML: string
  textContent: string
  parentElement: ?Element
  children: Element[]

  constructor(minidomElement: MinidomElement, parentElement: ?Element) {
    this.minidomElement = minidomElement
    this.tagName = minidomElement.tagName.toLowerCase()
    this.outerHTML = minidomElement.outerHTML
    this.textContent = minidomElement.textContent
    this.children = [...minidomElement.children]
      .map((minidomElement) => new Element(minidomElement, this))
    this.parentElement = parentElement
  }

  toString(): string {
    return formatHtml(this)
  }

  getAttribute(name: string): string {
    return this.minidomElement.getAttribute(name)
  }

  querySelectorAll(selector: string): Element[] {
    return findElements(selector, this)
  }
}
