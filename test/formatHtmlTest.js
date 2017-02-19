/* @flow */
import test from 'ava'
import dedent from 'dedent'
import formatHtml from 'html-lens/src/formatHtml'

function makeElement (outerHTML) {
  return { outerHTML }
}

test(t => {
  t.is(
    formatHtml(
      makeElement(
        `
          <!DOCTYPE html>
          <meta charset="utf-8">
        `
      )
    ),
    dedent`
      <!doctype html>
      <meta charset="utf-8">
    `
  )
  t.is(
    formatHtml(makeElement('<!doctype html><meta charset="utf-8"><p>Hi</p>')),
    dedent`
      <!doctype html>
      <meta charset="utf-8">
      <p>Hi</p>
    `
  )

  t.is(
    formatHtml(
      makeElement(
        `
          <!doctype html>
          <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <p>Hello World!</p>
          </body>
          </html>
        `
      )
    ),
    dedent`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <p>Hello World!</p>
        </body>
      </html>
    `
  )

  t.is(
    formatHtml(
      makeElement(
        `
          <p>
            <span>Hello World!</span>
          </p>
        `
      )
    ),
    dedent`
      <p>
        <span>Hello World!</span>
      </p>
    `
  )

  t.is(
    formatHtml(makeElement('<span>Hello World!</span>')),
    '<span>Hello World!</span>'
  )
})
