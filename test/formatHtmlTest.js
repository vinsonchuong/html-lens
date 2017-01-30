/* @flow */
import test from 'ava'
import dedent from 'dedent'
import formatHtml from 'html-lens/formatHtml'

test((t) => {
  t.is(
    formatHtml(`
      <!doctype html>
      <meta charset="utf-8">
    `),
    dedent`
      <!doctype html>
      <meta charset="utf-8">
    `
  )
  t.is(
    formatHtml('<!doctype html><meta charset="utf-8"><p>Hi</p>'),
    dedent`
      <!doctype html>
      <meta charset="utf-8">
      <p>Hi</p>
    `
  )

  t.is(
    formatHtml(`
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hello World!</p>
      </body>
      </html>
    `),
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
    formatHtml(`
      <p>
        <span>Hello World!</span>
      </p>
    `),
    dedent`
      <p>
        <span>Hello World!</span>
      </p>
    `
  )

  t.is(
    formatHtml('<span>Hello World!</span>'),
    '<span>Hello World!</span>'
  )
})
