/* @flow */
import minidom from 'minidom'
import {Document as MinidomDocument} from 'minidom/dom'
import Element from './Element'
import formatHtml from './formatHtml'
import findElements from './findElements';

export default class Document {
  minidomDocument: MinidomDocument
  outerHTML: string
  children: Element[]

  constructor(html: string) {
    this.minidomDocument = minidom(html)
    this.outerHTML = this.minidomDocument.outerHTML
    this.children = [new Element(this.minidomDocument.documentElement)]
  }

  toString(): string {
    return formatHtml(this)
  }

  * traverse(): Generator<Element, void, void> {
    for (const childElement of this.children) {
      yield* childElement.traverse()
    }
  }

  querySelectorAll(selector: string): Element[] {
    return findElements(selector, Array.from(this.traverse()))
  }
}
