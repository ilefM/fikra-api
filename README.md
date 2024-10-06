<h1 align="center">Fikra API</h1>

<p align="center">API of the social network Fikra

<h3>Tech stack</h3>

- Nestjs
- Typescript
- Postgres
- Railway

<h3>Features</h3>

<h4>Post:</h4>

- CRUD operations on posts
- object post `{id: string, createdAt: Date, updatedAt: Date, content: string, authorUsername: User}`
- No need of author field in dto class when creating and updating a post
