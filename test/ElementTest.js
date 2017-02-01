/* @flow */
import test from 'ava'
import dedent from 'dedent'
import minidom from 'minidom'
import Element from 'html-lens/Element'

test(t => {
  const minidomDocument = minidom(
    `
      <!doctype html>
      <meta charset="utf-8">
      <p>
        <span role="status">Hello World!</span>
      </p>
    `
  )

  const p = new Element(minidomDocument.getElementsByTagName('p')[0])
  t.is(p.tagName, 'p')
  t.is(p.textContent.trim(), 'Hello World!')
  t.is(
    String(p),
    dedent`
      <p>
        <span role="status">Hello World!</span>
      </p>
    `
  )
  t.is(p.children.length, 1)

  const span = p.children[0]
  t.is(span.tagName, 'span')
  t.is(span.textContent, 'Hello World!')
  t.is(String(span), '<span role="status">Hello World!</span>')
  t.is(span.parentElement, p)
  t.is(span.attributes.role, 'status')
})

test(t => {
  const minidomDocument = minidom(
    `
      <!doctype html>
      <meta charset="utf-8">
      <p>Hello World!</p>
    `
  )
  const htmlElement = new Element(minidomDocument.documentElement)

  t.deepEqual(
    htmlElement.querySelectorAll('*').map(element => element.tagName),
    ['html', 'head', 'meta', 'body', 'p']
  )
})
