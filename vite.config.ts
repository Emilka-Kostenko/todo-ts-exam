import { defineConfig } from 'vitest/config'

// base is the sub path of the GitHub Pages site: https://<user>.github.io/todo-ts-exam/
export default defineConfig({
  base: '/todo-ts-exam/',
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.ts'],
  },
})
