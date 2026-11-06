import { Selector } from 'testcafe'

fixture('Add and remove todos')
    .page('http://localhost:4173/todo-ts-exam/')

const input = Selector('#todo-input')
const addButton = Selector('.todo-form button')
const items = Selector('.todo-item')

test('adds a todo to the list', async t => {
    await t
        .typeText(input, 'Buy milk')
        .click(addButton)
        .expect(items.count).eql(1)
        .expect(items.innerText).contains('Buy milk')
})

test('removes a todo from the list', async t => {
    await t
        .typeText(input, 'Buy milk')
        .click(addButton)
        .click(items.find('button'))
        .expect(items.count).eql(0)
})
