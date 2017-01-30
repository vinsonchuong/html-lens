/* @flow */
import minidom from 'minidom'
import {Document as MinidomDocument} from 'minidom/dom'
import Element from './Element'
import findElements from './findElements';

export default class Document {
  minidomDocument: MinidomDocument
  children: Element[]

  constructor(html: string) {
    const minidomDocument = minidom(html)
    this.children = [new Element(minidomDocument.documentElement)]
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
