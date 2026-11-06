import { Selector } from 'testcafe'

fixture('Validation of empty input')
    .page('http://localhost:4173/todo-ts-exam/')

const input = Selector('#todo-input')
const addButton = Selector('.todo-form button')
const errorMessage = Selector('#error-message')
const items = Selector('.todo-item')

test('shows an error message and a red input when the input is empty', async t => {
    // The error is hidden before the user does anything
    await t.expect(errorMessage.visible).notOk()

    // Click Add without typing anything
    await t
        .click(addButton)
        .expect(errorMessage.visible).ok()
        .expect(errorMessage.innerText).contains('Please enter a todo item')
        .expect(input.hasClass('input-error')).ok()
})

test('does not add a todo when the input only has spaces', async t => {
    await t
        .typeText(input, '   ')
        .click(addButton)
        .expect(items.count).eql(0)
        .expect(errorMessage.visible).ok()
})

test('hides the error after a valid todo is added', async t => {
    // First trigger the error, then add a real todo
    await t
        .click(addButton)
        .expect(errorMessage.visible).ok()
        .typeText(input, 'Buy milk')
        .click(addButton)
        .expect(errorMessage.visible).notOk()
        .expect(input.hasClass('input-error')).notOk()
        .expect(items.count).eql(1)
})
