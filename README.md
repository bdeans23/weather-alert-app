# Weather Alert app

Weather Alert application

Migrating an old project from GitLab that was created using `Create React App` and using `JavaScript`, `Node v15` and `React v17` to GitHub and using `Vite`, `JavaScript`, `Node v20`, and `React v19`.

## Table of contents

- [Instructions](#Instructions)
- [Description](#Description)
- [Technologies](#Technologies)

## Instructions

First clone this repository.

```bash
$ git clone https://github.com/bdeans23/weather-alert-app.git
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.

```bash
$ npm install # or yarn
```

Run it

```bash
$ npm dev # or yarn dev
```

## Description

This is a simple React weather app using OpenWeatherMap API. It was created using the Vite build tool to migrate away from the now obsolete Create React App

## Technologies

Project uses:

- React
- Styled Components

## Developer notes on steps involved in migration process

- Created new repo on GitHub
- My first thought to use a more recent version of Create React App to build a simple app to migrate old project to GitHub

  `$ npx create-react-app my-app`

  I found that this is now deprecated so I investigated options. I found that commonly suggested alternatives are

  - NextJS
  - Vite

  I selected `Vite` as it seemed a good, lightweight, starting point.

  `$ npm create vite@latest`

* Copied `src`, `components` and `asset` files into `weather-alert-app`, ignoring `.git`, `.gitignore` and `README.md` as I wanted to use my own

* Copied v1 `.gitignore` contents to v2

#### Updating dependencies

`$ yarn add styled-components`

- added `.env`, change to prefix with `VITE` and use `import.meta.env` instead of `process.env`

* `Vite` comes with fontawesome so I didn't need to install these:

  ```
  $ yarn add @fortawesome/fontawesome-svg-core
  $ yarn add @fortawesome/free-solid-svg-icons
  $ yarn add @fortawesome/react-fontawesome
  ```

`$ yarn add node-sass`

> This was in the old implementation but I found it was not supported by Apple silicon. I thought about trying `sass` package instead but ulitmately the better choice was to switch to plain css, so I did that.

#### Updating OpenWeatherApi integration

I discovered that this is no longer completely free so I looked at alternatives including `OpenMeteo API`. Since `OpenWeather` currently allows up to 1000 calls per day on the free tier, I thought that would be sufficient, at least to begin with.

#### Refactoring

- Used `componentDidMount` instead of `componentWillMount` as the latter is deprecated
- Removed fragements with only one child

## Ideas for Future improvements

- Add tests
- Styling updates
- Use `SonarQube` to identify code quality issues
- Look at switching weather API to an alternative such as `OpenMeteo`
- Introduce `TypeScript`
