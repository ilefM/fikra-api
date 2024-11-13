<h1 align="center">Fikra API</h1>

<p align="center">API of the social network Fikra

<h3>Tech stack</h3>

- Nestjs
- Typescript
- Postgres
- Render

<h3>Features</h3>

<h4>Post:</h4>

- CRUD operations on posts
- Object post `{id: string, createdAt: Date, updatedAt: Date, content: string, authorUsername: User}`

<h4>User:</h4>

- Sign In
- Sign Up
- Object user `{id: string, createdAt: Date, updatedAt: Date, email: string, username: string, passwordHash: string, refreshHash: string, role: {USER | ADMIN}, bio: string, posts: POST[]}`
