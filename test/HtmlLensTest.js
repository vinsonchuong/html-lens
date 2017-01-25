import test from 'ava'
import HtmlLens from 'html-lens'

test((t) => {
  const document = new HtmlLens(`
    <!doctype html>
    <meta charset="utf-8">
    <p>Hello World!</p>
  `)
  t.true(document.html.includes('Hello World!'))
})
