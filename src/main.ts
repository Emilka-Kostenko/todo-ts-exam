import './style.css'
import type { Todo } from './types.ts'
import { addTodo, removeTodo } from './todos.ts'

let todos: Todo[] = []

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement

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

    if (text !== '') {
        todos = addTodo(todos, text)
        todoInput.value = ''
        renderTodos()
    }
})

renderTodos()
