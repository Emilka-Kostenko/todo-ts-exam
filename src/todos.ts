import type { Todo, Filter } from './types.ts'

// Pure functions: they get the current list and return a new list.
// No DOM in here, so they are easy to test.

export const addTodo = (todos: Todo[], text: string): Todo[] => {
    const newTodo: Todo = {
        id: Date.now(),
        text: text,
        completed: false
    }
    return [...todos, newTodo]
}

export const removeTodo = (todos: Todo[], id: number): Todo[] => {
    return todos.filter(todo => todo.id !== id)
}

// A todo text is valid when it is not empty after removing spaces at the start and end
export const isValidTodoText = (text: string): boolean => {
    return text.trim() !== ''
}

// Flip the completed status of the todo with the given id (true -> false, false -> true).
// The other todos stay the same.
export const toggleTodo = (todos: Todo[], id: number): Todo[] => {
    return todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed }
        }
        return todo
    })
}

// Return only the todos that match the filter:
// all = every todo, active = not completed, completed = completed
export const filterTodos = (todos: Todo[], filter: Filter): Todo[] => {
    if (filter === 'active') {
        return todos.filter(todo => !todo.completed)
    }
    if (filter === 'completed') {
        return todos.filter(todo => todo.completed)
    }
    return todos
}
