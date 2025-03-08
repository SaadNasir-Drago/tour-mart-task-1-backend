## Setup Instructions

### Backend Setup

1. Open a terminal and clone the repo to your machine:


```shellscript
git clone <URL>
```


2. Install required dependencies:


```shellscript
npm install
```

3. Copy the backend files from the code project above into your backend directory.
4. Create a `.env` file in the backend directory based on the `.env.example` file:


```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=blog
JWT_SECRET=your_jwt_secret_key
PORT=3001
```

5. Set up PostgreSQL:

1. Install PostgreSQL if you haven't already
2. Create a new database named 'blog'
3. Make sure the database credentials in your .env file match your PostgreSQL setup



6. Start the backend server:


```shellscript
npm run start:dev
```

## Accessing the Application

- Backend API: [http://localhost:3001](http://localhost:3001)
- Swagger Documentation: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- Frontend: [http://localhost:3000](http://localhost:3000)


## Features

### Backend

- User authentication with JWT
- CRUD operations for blog posts
- Authorization checks for post editing/deletion
- API documentation with Swagger


### Frontend

- User registration and login
- Blog post listing and search
- Rich text editing with React Quill
- Form validation with react-hook-form and yup
- Responsive design with Tailwind CSS
- User profile page


## Project Structure

```plaintext
blog-platform/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── posts/          # Posts module
│   │   ├── users/          # Users module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── contexts/       # Context providers
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── App.tsx
    │   └── index.tsx
    ├── .env
    └── package.json
```