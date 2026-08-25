# killerbee

![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript&logoColor=white)
![styled-components](https://img.shields.io/badge/styled--components-5-DB7093?logo=styledcomponents&logoColor=white)

KillerBee is a React administration dashboard prototype (2021): login flow
and general settings area, built with a reusable component set.

## Features

- Login screen
- General settings page with form controls
- Reusable UI components: Button, Header, Input, Modal, Select

## Tech stack

| Layer | Tools |
|---|---|
| Language | TypeScript |
| UI | React 17, Create React App, styled-components, react-icons |
| Forms | Unform, react-select |
| Routing | react-router-dom 5 |

## How to run

```bash
# requirements: Node.js 14-16 era runtime (see legacy note)
yarn install
yarn start    # http://localhost:3000
```

## Legacy note

Prototype from 2021 with era-pinned dependencies (React 17, CRA 4,
TypeScript 4.1). Expect friction on current Node versions without upgrades.
Estimated modernization effort if picked up later: small (half-day),
migrating CRA to Vite and bumping dependencies. No fixes are planned as part
of this cleanup phase.

## License

[MIT](LICENSE)

## Author

Built by [Tiago Gonçalves de Castro](https://github.com/tiagogcastro)
· [LinkedIn](https://www.linkedin.com/in/tiagogcastro)
