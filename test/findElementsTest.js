/* @flow */
import test from 'ava'
import findElements from 'html-lens/src/findElements'

function makeElement (tagName, attributes = {}, parentElement) {
  return { tagName, attributes, textContent: '', parentElement, children: [] }
}

test(t => {
  const div = makeElement('div')
  const span = makeElement('span', { id: 'id', class: 'class' }, div)
  div.children.push(span)

  t.deepEqual(findElements('div', div), [div])
  t.deepEqual(findElements('span', div), [span])
  t.deepEqual(findElements('.class', div), [span])
  t.deepEqual(findElements('#id', div), [span])
  t.deepEqual(findElements('span[id="id"]', div), [span])
  t.deepEqual(findElements('div > span', div), [span])

  t.deepEqual(findElements('div > span', span), [])
})
