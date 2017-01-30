/* @flow */
import test from 'ava'
import dedent from 'dedent'
import Document from 'html-lens/Document'

test((t) => {
  const document = new Document(`
    <!doctype html>
    <meta charset="utf-8">
    <p>
      <span>Hello World!</span>
    </p>
  `)

  t.is(String(document), dedent`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>
          <span>Hello World!</span>
        </p>
      </body>
    </html>
  `)

  t.is(
    document.querySelectorAll('span')[0].toString(),
    '<span>Hello World!</span>'
  )
})
