# Task Boilerplate

This is a simple boilerplate for the task. You are free to use it and modify it to your needs.

## Installation

```bash
npm install
npm run dev
```

This will start a simple dev server with hot reload using vite and express for some mock API requests.

No testing framework is provided by default. Use whatever you like and are familiar with.

## API

You find the express js api under src/server. A simple file upload API is provided. You can use it and/or modify it to your needs.

API Routes
- POST /api/upload (multipart/form-data)
- GET /api/files (returns a list of files)
- GET /api/hello-world

## Styling

You can use whatever you like. The boilerplate is using tailwindcss. If you want to use something else, feel free to add it.
