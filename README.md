This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First after npm install you have to generate the prisma data base in sqlite for the authentication users. This is why the env file is included in the 
proyect since is for a tecnical interview and later it could be use for learning purposes.

The mySQL databse squema is as follow:
The name of the database is rick_and_morty_db and you have to create a table name characters:
CREATE TABLE characters (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    status VARCHAR(255),

);

```bash
npm install 
# after
npx prisma generate.
```
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


To seed database with five characters from Rick and Morty (the Smith family) go to the rest api http://localhost:3000/api/seed.


