import { describe, it, expect } from 'vitest'
import { addTodo, removeTodo, isValidTodoText } from '../../src/todos.ts'
import type { Todo } from '../../src/types.ts'

const sample: Todo[] = [
    { id: 1, text: 'Buy milk', completed: false },
    { id: 2, text: 'Walk the dog', completed: true },
]

describe('addTodo', () => {
    it('adds a new todo that is not completed', () => {
        const result = addTodo([], 'Learn TypeScript')

        expect(result).toHaveLength(1)
        expect(result[0].text).toBe('Learn TypeScript')
        expect(result[0].completed).toBe(false)
    })

    it('does not change the original list', () => {
        addTodo(sample, 'Another one')

        expect(sample).toHaveLength(2)
    })
})

describe('removeTodo', () => {
    it('removes the todo with the given id', () => {
        const result = removeTodo(sample, 1)

        expect(result).toEqual([{ id: 2, text: 'Walk the dog', completed: true }])
    })

    it('keeps the list the same when the id does not exist', () => {
        expect(removeTodo(sample, 99)).toEqual(sample)
    })
})

describe('isValidTodoText', () => {
    it('accepts a normal text', () => {
        expect(isValidTodoText('Buy milk')).toBe(true)
    })

    it('rejects an empty text', () => {
        expect(isValidTodoText('')).toBe(false)
    })

    it('rejects a text with only spaces', () => {
        expect(isValidTodoText('   ')).toBe(false)
    })
})
