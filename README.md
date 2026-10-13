# api-todo

api todo is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `SessionsController`, `Session`, `Todo`, `User`, `Todos`, `Users`.

## Repository layout

- `controllers/` — 1 tracked file(s); source examples: `controllers/SessionsController.js`.
- `models/` — 3 tracked file(s); source examples: `models/Session.js`, `models/Todo.js`.
- `routes/` — 2 tracked file(s); source examples: `routes/Todos.js`, `routes/Users.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/api-todo.git
cd api-todo
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `node index.js` — executes the package entry point.
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [controllers/SessionsController.js](controllers/SessionsController.js)
- [index.js](index.js)
- [models/Session.js](models/Session.js)
- [models/Todo.js](models/Todo.js)
- [models/User.js](models/User.js)
- [routes/Todos.js](routes/Todos.js)
- [routes/Users.js](routes/Users.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
