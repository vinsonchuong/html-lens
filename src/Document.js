/* @flow */
import minidom from 'minidom'
import Element from './Element'
import formatHtml from './formatHtml'
import findElements from './findElements'

export default class Document {
  outerHTML: string
  children: Element[]

  constructor (html: string) {
    const minidomDocument = minidom(html)
    this.outerHTML = minidomDocument.outerHTML
    this.children = [new Element(minidomDocument.documentElement)]
  }

  toString (): string {
    return formatHtml(this)
  }

  querySelectorAll (selector: string): Element[] {
    return findElements(selector, this.children[0])
  }
}
