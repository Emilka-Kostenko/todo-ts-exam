# Todo TS App

A small todo application written in TypeScript with Vite.
It was made for the BDE exam, and it uses Gitflow, Conventional Commits, pull requests with review,
TestCafe tests and a GitHub Actions pipeline.

**Live app:** https://emilka-kostenko.github.io/todo-ts-exam/

## Features

These features come from the teacher's list of optional features.

| Option | Feature | What it does |
|---|---|---|
| 16 | Handle errors | An empty input shows a red border and an error message |
| 1 | Toggle completed | A checkbox marks a todo as done, and the text gets a line through it |
| 4 | Filter by status | Buttons for All, Active and Completed |
| 2 | Clear completed | A button removes all completed todos |
| 10 | Progress bar | Shows the percentage of completed todos |
| 8 | Search | A search field shows only the todos that contain the text |

## Run the app

```bash
npm install
npm run dev
```

Open http://localhost:5173/todo-ts-exam/ in the browser.

## Tests

```bash
npm test                 # unit tests (Vitest)
npm run build            # type check and build
npm run test:e2e         # end-to-end tests (TestCafe, needs Chrome)
```

Every feature has unit tests and at least two TestCafe tests.

## Code structure

- `src/types.ts` - the `Todo` interface and the `Filter` type
- `src/todos.ts` - pure functions (add, remove, toggle, filter, search and so on)
- `src/main.ts` - connects the functions to the page
- `tests/unit` - Vitest tests
- `tests/e2e` - TestCafe tests

## How we work on GitHub

**Issues.** Every feature has an issue with acceptance criteria. The issues belong to a milestone.

**Gitflow branches.**

- `main` - released versions only. This is what is online.
- `develop` - finished features come together here.
- `feature/*` - one branch for each feature, made from `develop`.
- `release/*` - made from `develop` to prepare a release, then merged to `main`.

**Conventional commits.** Commit messages look like `type(scope): description`, for example
`feat(filter): add buttons to filter todos by status`. Types: `feat`, `fix`, `test`, `docs`, `style`, `ci`, `chore`.
Husky and commitlint check this on every commit, and the pipeline checks it on every pull request.

**Pull requests.** A feature is merged to `develop` with a pull request. Another person must review and approve it,
and the checks must be green.

## Pipeline

| Workflow | When | What it does |
|---|---|---|
| `ci.yml` | pull request, push to `develop` | Continuous integration: unit tests, build, TestCafe tests, commit check |
| `release.yml` | push to `release/*` | Continuous delivery: runs the tests and saves the build as an artifact |
| `deploy.yml` | push to `main` | Continuous deployment: builds the app and publishes it on GitHub Pages |
