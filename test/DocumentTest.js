/* @flow */
import test from 'ava'
import minidom from 'minidom'
import Document from 'html-lens/Document'

test((t) => {
  const document = new Document(`
    <!doctype html>
    <meta charset="utf-8">
    <p>
      <span>Hello World!</span>
    </p>
  `)

  t.is(
    document.querySelectorAll('span')[0].toString(),
    '<span>Hello World!</span>'
  )
})
