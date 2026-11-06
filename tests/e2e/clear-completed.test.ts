import { Selector } from 'testcafe'

fixture('Clear completed todos')
    .page('http://localhost:4173/todo-ts-exam/')

const input = Selector('#todo-input')
const addButton = Selector('.todo-form button')
const checkbox = Selector('.todo-item input[type="checkbox"]')
const items = Selector('.todo-item')
const clearButton = Selector('#clear-completed')
const completedFilter = Selector('.filter-button[data-filter="completed"]')

// Add three todos and complete the first two
const addThreeTodos = async (t: TestController) => {
    await t
        .typeText(input, 'First')
        .click(addButton)
        .typeText(input, 'Second')
        .click(addButton)
        .typeText(input, 'Third')
        .click(addButton)
        .click(checkbox.nth(0))
        .click(checkbox.nth(1))
}

test('removes all completed todos and keeps the active ones', async t => {
    await addThreeTodos(t)
    await t
        .click(clearButton)
        .expect(items.count).eql(1)
        .expect(items.innerText).contains('Third')
})

test('keeps the list the same when no todo is completed', async t => {
    await t
        .typeText(input, 'First')
        .click(addButton)
        .typeText(input, 'Second')
        .click(addButton)
        .click(clearButton)
        .expect(items.count).eql(2)
})

test('the Completed filter is empty after clearing', async t => {
    await addThreeTodos(t)
    await t
        .click(clearButton)
        .click(completedFilter)
        .expect(items.count).eql(0)
})
