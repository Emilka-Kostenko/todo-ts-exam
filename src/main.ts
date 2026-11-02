import './style.css'
import type { Todo } from './types.ts'
import { addTodo, removeTodo, isValidTodoText } from './todos.ts'

let todos: Todo[] = []

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

const renderTodos = (): void => {
    todoList.innerHTML = ''

    todos.forEach(todo => {
        const li = document.createElement('li')
        li.className = 'todo-item'

        const span = document.createElement('span')
        span.textContent = todo.text

        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.addEventListener('click', () => {
            todos = removeTodo(todos, todo.id)
            renderTodos()
        })

        li.append(span, removeButton)
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

renderTodos()
