# Memo

-> [TLDR](#Usage)

Everything you need to develop a smooth high-end react application, in less than a week. The project's focus is to allow us, developers, to quickly realize ideas in projects that never gets blocked.

![img](https://media.giphy.com/media/3oriNYQX2lC6dfW2Ji/giphy.gif)

All modules in the project follow the same structure, the typical module patter, all files regarding a specific module (in this case a component) exist in the same folder. Like this example, generic components are placed in a shared folder named `common`.

```
src/components/common/Button/
├── Button.scss
├── Button.scss.d.ts
├── Button.test.tsx
├── Button.tsx
├── __snapshots__
│   └── Button.test.tsx.snap
└── index.tsx
```

A more extensive example may be seen [here](#Nested-Components)

All in all, the project counters most (if not all) problematic parts one usually encounters during the development of new applications (or old).

## Includes

- Typescript
- React (>16.8)
- Jest
- Webpack (>4)
- Scss (CSS-modules)
- Autoprefixer
- An easy way to work with custom SVGs
- Code splitting

![img](https://media.giphy.com/media/ofrkfuqsR8mvm/giphy.gif)

## Folders Purpose

### API

All external communication should be placed inside this folder and exposed via a singular object, which components, later on, may destruct for ease of use. Hence, this folder will contain all integration interfaces.

### Assets

Include all types of media, more concretely bitmaps, svgs, or anything similar.

### Components

- App - Essentially, the root of your application.
- Common - Components that are used in at least two places.
- Contexts - The folder contains global states and actions that tie together application-logic and API integrations. It is either via contexts or hooks which your API is exposed to your components.
- Hooks - Reusable hooks of any kind.
- Utils - This module includes all type of reusable functions or objects.
- Alias imports.

## Usage

The setup currently uses [mockoon](https://github.com/mockoon/mockoon), to mock API endpoints. Download it, import the API definition in `./mockoon/api.json` and start the mock-server.

### Development:

1. Start the mock-server-api.
2. [Generate a local ssl-cert](#SSL). (optional)
3. `npm start` or `npm run start:no-ssl`

### Coverage

`npm t -- --coverage.`

### Build

To create a production ready build run:`npm run build`. The build ill be outputted to `./dist/`

## Add new path resolutions

### tsconfig.json

```json
"paths": {
  "components/*": ["components/*"]
}
```

### weboack.config.js

```js
resolve: {
  extensions: ['.ts', '.tsx', '.js', '.json'],
  alias: {
    components: path.join(srcPath, 'components')
  }
},
```

For even help see [this](https://decembersoft.com/posts/say-goodbye-to-relative-paths-in-typescript-imports/) or read about module resolution [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

## SSL

````bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
 -newkey rsa:2048 -nodes -sha256 \
 -subj '/CN=localhost' -extensions EXT -config <( \
 printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
 ```bash
````

## Chrome SSL localhost

chrome://flags/#allow-insecure-localhost

## Appendix

### Nested Components

```
src/components/App/subs/Account/
├── Account.scss
├── Account.scss.d.ts
├── Account.test.tsx
├── Account.tsx
├── __snapshots__
│   └── Account.test.tsx.snap
├── index.tsx
└── subs
    ├── Dashboard
    │   ├── Dashboard.scss
    │   ├── Dashboard.scss.d.ts
    │   ├── Dashboard.tsx
    │   ├── index.tsx
    │   └── subs
    │       └── Status
    │           ├── Status.scss
    │           ├── Status.scss.d.ts
    │           ├── Status.test.tsx
    │           ├── Status.tsx
    │           ├── __snapshots__
    │           │   └── Status.test.tsx.snap
    │           └── index.tsx
    ├── Navigation
    │   ├── Navigation.scss
    │   ├── Navigation.scss.d.ts
    │   ├── Navigation.tsx
    │   ├── index.tsx
    │   └── subs
    │       └── Item
    │           ├── Item.scss
    │           ├── Item.scss.d.ts
    │           ├── Item.tsx
    │           └── index.tsx
    └── StatusBar
        ├── StatusBar.scss
        ├── StatusBar.scss.d.ts
        ├── StatusBar.test.tsx
        ├── StatusBar.tsx
        ├── __snapshots__
        └── index.tsx
```

### Project layout

```
src/
├── api
│   ├── index.tsx
│   └── modules
│       ├── auth
│       │   └── index.ts
│       └── db
│           └── index.ts
├── assets
│   ├── img
│   │   └── leaf.jpg
│   └── svg
│       ├── bell.svg
│       ├── density.svg
│       ├── eye-with-line.svg
│       ├── grow-zone.svg
│       ├── home.svg
│       ├── led.svg
│       ├── loader.svg
│       ├── logo.svg
│       ├── logout.svg
│       ├── sensor.svg
│       ├── settings.svg
│       ├── system.svg
│       └── user.svg
├── components
│   ├── App
│   │   ├── App.scss
│   │   ├── App.scss.d.ts
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── __snapshots__
│   │   │   └── App.test.tsx.snap
│   │   ├── index.tsx
│   │   └── subs
│   │       ├── About
│   │       │   ├── About.scss
│   │       │   ├── About.scss.d.ts
│   │       │   ├── About.test.tsx
│   │       │   ├── About.tsx
│   │       │   ├── __snapshots__
│   │       │   │   └── About.test.tsx.snap
│   │       │   └── index.tsx
│   │       ├── Account
│   │       │   ├── Account.scss
│   │       │   ├── Account.scss.d.ts
│   │       │   ├── Account.test.tsx
│   │       │   ├── Account.tsx
│   │       │   ├── __snapshots__
│   │       │   │   └── Account.test.tsx.snap
│   │       │   ├── index.tsx
│   │       │   └── subs
│   |       ...
│   └── common
│       ├── Button
│       │   ├── Button.scss
│       │   ├── Button.scss.d.ts
│       │   ├── Button.test.tsx
│       │   ├── Button.tsx
│       │   ├── __snapshots__
│       │   │   └── Button.test.tsx.snap
│       │   └── index.tsx
│       ...
├── contexts
│   ├── __snapshots__
│   ├── user-context.test.tsx
│   └── user-context.tsx
├── hooks
│   └── useDidMount.tsx
├── index.html
├── index.tsx
├── project-config.ts
├── react-env.d.ts
├── setupEnzyme.ts
└── utils
    ├── env
    │   ├── env.test.ts
    │   ├── env.ts
    │   └── index.ts
    ├── functions.scss
    ├── source
    │   ├── source.test.ts
    │   └── source.ts
    ├── time
    │   ├── index.ts
    │   └── now.ts
    └── variables.scss

```
