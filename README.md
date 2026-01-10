# Registry Management

Simple registry management web application using server-rendered EJS templates and Node.js.

- Primary languages: EJS, JavaScript, CSS
- Contains two Dockerfile for containerization one is for the application and another one for the mongo db database
- Contains a docker compose file to run both container togather

## Features

- Server-rendered UI using EJS templates
- Basic registry CRUD operations (add, view, edit, delete)
- Lightweight styling with CSS
- Docker support for containerized runs

## Tech stack

- Node.js + Express
- EJS (views / templates)
- JavaScript (application logic)
- CSS (styles)
- Docker (optional containerization)

## Project structure

A simple, common layout for this project:

```
Registry-management/
├─ .env
├─ .gitignore
├─ Dockerfile
├─ docker-compose.yml
├─ mongo.Dockerfile
├─ package.json
├─ package-lock.json
├─ README.md
├─ authMdlwr.js
├─ app.js
├─ server/               # or app.js - main application entry
|     ├─ config/
|     │  └─ db.js             # configuration and environment setup
|     ├─ routes/
|     │  ├─ home.js
|     │  ├─ student.js
|     │  └─ user.js
|     ├─ controllers/
|     │  ├─ homeController.js
|     │  ├─ studentController.js
|     |  └─ userController.js
|     ├─ models/
|        ├─student.js
|        └─ user.js
├─ views/
│  ├─ layouts/
|  |  ├─mainz.js
│  │  └─ default.ejs
│  ├─ partials/
│  │  └─ navbar.ejs
│  ├─ index.ejs
│  ├─ about.ejs
│  ├─ addAdmin.ejs
│  ├─ default.ejs
│  ├─ login.ejs
│  ├─ search.ejs
│  └─ student/
│     ├─ add.ejs
│     ├─ view.ejs
│     └─ edit.ejs
├─ public/
   ���─ css/
   │  └─ styles.css
   ├─ js/
   │  └─ main.js
   └─ images/
      └─ logo.png
```

## Getting started

### Prerequisites

- Node.js (14+ recommended)
- npm or yarn
- Docker (optional)

### Install

```bash
git clone https://github.com/tapas-kumar-shety/Registry-management.git
cd Registry-management
npm install
```

### Configuration

If the project uses environment variables, create a `.env` file from the example:

```bash
cp .env.example .env
# edit .env as needed
```

### Run (development)

Check your package.json for exact scripts; common commands:

```bash
# development
npm run dev

# or start normally
npm start
```

The app typically runs on http://localhost:3000 unless configured otherwise.

### Docker

Build and run the container:

```bash
docker compose up

```

## Tests

If tests exist, run:

```bash
npm test
```

## Contributing

Contributions welcome — open issues or PRs.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit and push
4. Open a Pull Request


## Contact

Repository: [Registry-management](https://github.com/tapas-kumar-shety/Registry-management)  
Maintainer: tapas-kumar-shety
```
