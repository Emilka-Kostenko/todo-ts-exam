import { Selector } from 'testcafe'

fixture('Toggle completed status')
    .page('http://localhost:4173/todo-ts-exam/')

const input = Selector('#todo-input')
const addButton = Selector('.todo-form button')
const checkbox = Selector('.todo-item input[type="checkbox"]')
const todoText = Selector('.todo-item span')

test('marks a todo as completed when the checkbox is clicked', async t => {
    await t
        .typeText(input, 'Buy milk')
        .click(addButton)
        // A new todo is not completed
        .expect(checkbox.checked).notOk()
        .expect(todoText.hasClass('completed')).notOk()
        // Click the checkbox: the todo is completed and has a line through the text
        .click(checkbox)
        .expect(checkbox.checked).ok()
        .expect(todoText.hasClass('completed')).ok()
})

test('makes a completed todo active again when the checkbox is clicked twice', async t => {
    await t
        .typeText(input, 'Buy milk')
        .click(addButton)
        .click(checkbox)
        .click(checkbox)
        .expect(checkbox.checked).notOk()
        .expect(todoText.hasClass('completed')).notOk()
})

test('only toggles the todo that was clicked', async t => {
    await t
        .typeText(input, 'First')
        .click(addButton)
        .typeText(input, 'Second')
        .click(addButton)
        // Complete only the first todo
        .click(checkbox.nth(0))
        .expect(checkbox.nth(0).checked).ok()
        .expect(checkbox.nth(1).checked).notOk()
})
