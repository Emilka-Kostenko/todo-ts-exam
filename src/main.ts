import './style.css'
import type { Todo, Filter } from './types.ts'
import { addTodo, removeTodo, isValidTodoText, toggleTodo, filterTodos, clearCompleted, getProgress, searchTodos } from './todos.ts'

let todos: Todo[] = []
// The filter that is selected right now
let currentFilter: Filter = 'all'
// The text in the search field
let searchQuery = ''

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement

// Show the red border on the input and the error text under it
const showError = (): void => {
    todoInput.classList.add('input-error')
    errorMessage.style.display = 'block'
}

// Remove the red border and hide the error text again
const hideError = (): void => {
    todoInput.classList.remove('input-error')
    errorMessage.style.display = 'none'
}

const searchInput = document.getElementById('search-input') as HTMLInputElement
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-button')
const clearCompletedButton = document.getElementById('clear-completed') as HTMLButtonElement
const progressBar = document.querySelector('.progress-bar') as HTMLDivElement
const progressFill = document.getElementById('progress-fill') as HTMLDivElement
const progressText = document.getElementById('progress-text') as HTMLParagraphElement

const renderTodos = (): void => {
    todoList.innerHTML = ''

    // Update the progress bar. It always counts all todos, not only the filtered ones.
    const percent = getProgress(todos)
    progressFill.style.width = `${percent}%`
    progressText.textContent = `${percent}% completed`
    progressBar.setAttribute('aria-valuenow', String(percent))

    // Highlight the button of the selected filter
    filterButtons.forEach(button => {
        button.classList.toggle('selected', button.dataset.filter === currentFilter)
        // Tell screen readers which filter button is pressed
        button.setAttribute('aria-pressed', String(button.dataset.filter === currentFilter))
    })

    // First search by text, then apply the selected filter, and show what is left
    const visibleTodos = filterTodos(searchTodos(todos, searchQuery), currentFilter)
    visibleTodos.forEach(todo => {
        const li = document.createElement('li')
        li.className = 'todo-item'

        // Checkbox that shows and changes the completed status
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed
        // Give the checkbox a name for screen readers
        checkbox.setAttribute('aria-label', todo.text)
        checkbox.addEventListener('change', () => {
            todos = toggleTodo(todos, todo.id)
            renderTodos()
        })

        const span = document.createElement('span')
        span.textContent = todo.text
        // The "completed" class draws a line through the text (see style.css)
        span.classList.toggle('completed', todo.completed)

        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.addEventListener('click', () => {
            todos = removeTodo(todos, todo.id)
            renderTodos()
        })

        li.append(checkbox, span, removeButton)
        todoList.appendChild(li)
    })
}

todoForm.addEventListener('submit', (event: Event) => {
    event.preventDefault()

    const text = todoInput.value.trim()

    // Empty input: show the error and stop, so no todo is added
    if (!isValidTodoText(text)) {
        showError()
        return
    }

    // Valid input: clear the error, add the todo and update the page
    hideError()
    todos = addTodo(todos, text)
    todoInput.value = ''
    renderTodos()
})

// Typing in the search field saves the text and updates the list on every key
searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value
    renderTodos()
})

// Clicking "Clear completed" removes all completed todos at once
clearCompletedButton.addEventListener('click', () => {
    todos = clearCompleted(todos)
    renderTodos()
})

// Clicking a filter button saves the new filter and updates the list
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter as Filter
        renderTodos()
    })
})

renderTodos()
