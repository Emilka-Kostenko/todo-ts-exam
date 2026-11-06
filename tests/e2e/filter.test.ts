import { Selector } from 'testcafe'

fixture('Filter todos by status')
    .page('http://localhost:4173/todo-ts-exam/')

const input = Selector('#todo-input')
const addButton = Selector('.todo-form button')
const checkbox = Selector('.todo-item input[type="checkbox"]')
const items = Selector('.todo-item')
const allButton = Selector('.filter-button[data-filter="all"]')
const activeButton = Selector('.filter-button[data-filter="active"]')
const completedButton = Selector('.filter-button[data-filter="completed"]')

// Add two todos and complete the first one, so every test starts with the same list
const addTwoTodos = async (t: TestController) => {
    await t
        .typeText(input, 'Done todo')
        .click(addButton)
        .typeText(input, 'Open todo')
        .click(addButton)
        .click(checkbox.nth(0))
}

test('Active shows only todos that are not completed', async t => {
    await addTwoTodos(t)
    await t
        .click(activeButton)
        .expect(items.count).eql(1)
        .expect(items.innerText).contains('Open todo')
})

test('Completed shows only completed todos', async t => {
    await addTwoTodos(t)
    await t
        .click(completedButton)
        .expect(items.count).eql(1)
        .expect(items.innerText).contains('Done todo')
})

test('All shows every todo again and the selected filter is highlighted', async t => {
    await addTwoTodos(t)
    await t
        .click(completedButton)
        .expect(completedButton.hasClass('selected')).ok()
        .click(allButton)
        .expect(items.count).eql(2)
        .expect(allButton.hasClass('selected')).ok()
        .expect(completedButton.hasClass('selected')).notOk()
})
