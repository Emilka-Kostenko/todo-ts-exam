import { Selector } from 'testcafe'

fixture('Progress bar')
    .page('http://localhost:4173/todo-ts-exam/')

const input = Selector('#todo-input')
const addButton = Selector('.todo-form button')
const checkbox = Selector('.todo-item input[type="checkbox"]')
const removeButtons = Selector('.todo-item button')
const clearButton = Selector('#clear-completed')
const progressText = Selector('#progress-text')

// The bar width is set in the style attribute, for example "width: 50%;"
const fillWidth = (percent: number) =>
    Selector('#progress-fill').withAttribute('style', new RegExp(`width:\\s*${percent}%`))

// Add two todos, so one completed todo means 50%
const addTwoTodos = async (t: TestController) => {
    await t
        .typeText(input, 'First')
        .click(addButton)
        .typeText(input, 'Second')
        .click(addButton)
}

test('shows 0% when there are no todos', async t => {
    await t
        .expect(progressText.innerText).contains('0%')
        .expect(fillWidth(0).exists).ok()
})

test('shows 50% when one of two todos is completed', async t => {
    await addTwoTodos(t)
    await t
        .click(checkbox.nth(0))
        .expect(progressText.innerText).contains('50%')
        .expect(fillWidth(50).exists).ok()
})

test('goes back to 0% when the completed todos are cleared', async t => {
    await addTwoTodos(t)
    await t
        .click(checkbox.nth(0))
        .expect(progressText.innerText).contains('50%')
        .click(clearButton)
        .expect(progressText.innerText).contains('0%')
        .expect(fillWidth(0).exists).ok()
})

test('updates when a todo is removed', async t => {
    await addTwoTodos(t)
    await t
        .click(checkbox.nth(0))
        // Remove the second (not completed) todo: the only todo left is completed
        .click(removeButtons.nth(1))
        .expect(progressText.innerText).contains('100%')
})
