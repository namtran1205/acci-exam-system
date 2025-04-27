# Acme Exam System

### For the process of registering for examinations at a center

---

## Description

This project aims to implement a partial version of the system, where it's expected to perform in a scenario of an exam-hosting center. Materials for the course of _Information System Analysis and Design_.

The specifications were included in a few processes, with some in the form of UML diagrams. And finally, the UI design was designed by me in Figma, doubling as an opportunity to learn Prototyping and Components in the program.

Group Members:

- Nguyễn Phúc An ([@nguyennguyennam](https://github.com/nguyennguyennam))
- Nguyễn Hà Nam Trân
- Me ([@hikawi](https://github.com/hikawi))

## Code of Conduct

When contributing (basically my groupmates), please follow some simple rules:

- Use conventions for casings and namings, appropriate for the language, here being mainly TypeScript.
  - For example, use `camelCase` for functions and variables names.
  - Use `PascalCase` for classes, interfaces or types.
  - Use `SCREAMING_SNAKE_CASE` for unchanging global constants (magic numbers), etc.
  - Use a formatter and a linter, here we're using prettier before or as you commit.
  - Anything like `getLogin_controller` is generally frowned upon.
- Document mostly why, and how you are defining functionalities and classes. Preferably in English.
- Keep functions short, if too long, you may split into smaller functions or have commented separators.
- Make meaningful, preferably short and to-the-point commits, but I don't really enforce this as I also fall victim to this.
- Using AI is fine but please quality-check the generated code.

## Tech Stack

- Frontend:
  - Technologies: Vite 5.0, Vue 3, Tailwind 4.0, NodeJS 23
  - Language: TypeScript
  - Deployment: Vercel
- Backend:
  - Technologies: ExpressJS with DrizzleORM
  - Language: TypeScript
  - Deployment: Custom VPS
- Database:
  - Technologies: PostgreSQL 17.3

### Setting up

A `.env` file would be needed and a version of Postgres installed if you want to run the backend server locally. On postgres, please create a database for this project, (personally I named it `acci`) and fill in necessary environmental variables.

If you want to run migrations on the database, (applying changes, pushing database):

```bash
npm run drizzle-kit generate
npm run drizzle-kit migrate

# or

npm run drizzle-kit push
```
