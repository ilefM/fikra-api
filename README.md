<h1 align="center">Fikra API</h1>

<p align="center">API of the social network Fikra

<h3>Tech stack</h3>

- Nestjs
- Typescript
- Postgres
- Railway

<h3>Features</h3>

<h4>Post:</h4>

- CRUD operations
- object post `{author: string, content: string}`
- No need of author field in dto class when creating and updating a post
- For now the author field is hardcoded to `binary_dev`
- TODO : fetching the userId from the user connected to get the author of the post
