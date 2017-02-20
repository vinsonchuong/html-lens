/* @flow */
import test from 'ava'
import findElements from 'html-lens/src/findElements'

function makeElement (tagName, attributes = {}, parentElement) {
  return { tagName, attributes, textContent: '', parentElement, children: [] }
}

test(t => {
  const container = makeElement('div')
  const child1 = makeElement('span', { id: 'c1', class: 'c1' }, container)
  const child2 = makeElement('span', { id: 'c2', class: 'c2' }, container)
  container.children.push(child1)
  container.children.push(child2)

  t.deepEqual(findElements('div', container), [])
  t.deepEqual(findElements('span', container), [child1, child2])
  t.deepEqual(findElements('.c1', container), [child1])
  t.deepEqual(findElements('#c1', container), [child1])
  t.deepEqual(findElements('span[id="c1"]', container), [child1])
  t.deepEqual(findElements('div > span', container), [child1, child2])

  t.deepEqual(findElements('div > span', child1), [])
})
