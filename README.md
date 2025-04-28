# <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/rocket.svg" /> OpenMat

> A Q&A/forum-style app where users can ask questions, provide answers and upvote/downvote answer content.

---

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/plug.svg" /> Deployment
[Demo](https://openmat.onrender.com/)

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/folder.svg" /> Project Structure

```txt
OpenMat/
├── client/       # Frontend (React + Vite)
├── server/       # Backend (Node + ExpressJS)
└── README.md
```

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/layers.svg" /> Tech Stack

client => TypeScript, React + Vite, TailwindCSS, Heroicons  
server => TypeScript, Node + ExpressJS  
database => MongoDB + Mongoose ORM

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/cog.svg" /> Environment Variables

client  
`VITE_API_URL=http://localhost:yourPort`

server  
`PORT="http://localhost:portNumber"`  
`DB_USER="yourMongoDBusername"`  
`DB_PASS="yourMongoDBpassword"`  
`DB_PATH="yourMongoDBurl"`  
`JWT_SECRET="yourJWTSecret"`  
`OLLAMA_VM_HOST="localhost"`  
`OLLAMA_VM_PORT="portNumber"`

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/laptop.svg" /> Local

To run the project locally:

1. Clone the repository by navigating to a desired directory in your terminal and running

`git clone https://github.com/Phil-G-94/TaskTracker.git`

2. Install the required packages for both `client/` and `server/`. From the root directory, run:

`cd client/ ; npm install`

`cd /server ; npm install`

3. Open up a terminal for each directory and run:

`npm run dev` to start the project in development mode, or

`npm run start` to run the app in production.

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/creative-commons.svg" /> License

© Phil Georgiou 2025. This work is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/user-pen.svg" /> Author

Phil Georgiou

## <img src="https://gist.githubusercontent.com/Phil-G-94/b0921d2344ee81afb6b7a4c8881f3803/raw/d59ec2cc780d776a946c11afbd94eee3ffbcc0cb/book-pen.svg" /> Notes
