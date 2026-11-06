import { Selector } from 'testcafe'

fixture('Search todos')
    .page('http://localhost:4173/todo-ts-exam/')

const input = Selector('#todo-input')
const addButton = Selector('.todo-form button')
const searchInput = Selector('#search-input')
const items = Selector('.todo-item')
const checkbox = Selector('.todo-item input[type="checkbox"]')
const activeFilter = Selector('.filter-button[data-filter="active"]')

// Add three todos with different texts
const addTodos = async (t: TestController) => {
    await t
        .typeText(input, 'Buy milk')
        .click(addButton)
        .typeText(input, 'Walk the dog')
        .click(addButton)
        .typeText(input, 'Buy bread')
        .click(addButton)
}

test('shows only the todos that match the search text', async t => {
    await addTodos(t)
    await t
        .typeText(searchInput, 'buy')
        .expect(items.count).eql(2)
        .expect(items.nth(0).innerText).contains('Buy milk')
        .expect(items.nth(1).innerText).contains('Buy bread')
})

test('ignores upper and lower case', async t => {
    await addTodos(t)
    await t
        .typeText(searchInput, 'DOG')
        .expect(items.count).eql(1)
        .expect(items.innerText).contains('Walk the dog')
})

test('shows all todos again when the search field is cleared', async t => {
    await addTodos(t)
    await t
        .typeText(searchInput, 'milk')
        .expect(items.count).eql(1)
        .selectText(searchInput)
        .pressKey('delete')
        .expect(items.count).eql(3)
})

test('works together with the Active filter', async t => {
    await addTodos(t)
    await t
        // Complete "Buy milk", then search for "buy" and show only active todos
        .click(checkbox.nth(0))
        .typeText(searchInput, 'buy')
        .click(activeFilter)
        .expect(items.count).eql(1)
        .expect(items.innerText).contains('Buy bread')
})
