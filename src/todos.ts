import type { Todo } from './types.ts'

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
