/* @flow */
import test from 'ava'
import findElements from 'html-lens/findElements'

function makeElement(tagName, attributes = {}, parentElement) {
  return {
    tagName,
    textContent: '',
    getAttribute(name: string) {
      return attributes[name]
    },
    parentElement,
    children: []
  }
}

test((t) => {
  const div = makeElement('div')
  const span = makeElement('span', {id: 'id', class: 'class'}, div)
  div.children.push(span)

  t.deepEqual(findElements('div', [div, span]), [div])
  t.deepEqual(findElements('span', [div, span]), [span])
  t.deepEqual(findElements('.class', [div, span]), [span])
  t.deepEqual(findElements('#id', [div, span]), [span])
  t.deepEqual(findElements('div > span', [div, span]), [span])

  t.deepEqual(findElements('div > span', [span]), [])
})
