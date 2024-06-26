# Todo app - Vulse Challenge

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/alex-melia/todo-vulse.git
```

2. **Install the dependencies**

```bash
cd frontend
```

```bash
npm install
```

```bash
cd backend
```

```bash
npm install
```

3. **Set up environment variables**

```bash
cd frontend
```

```bash
cp .env.example .env.local
```

Define the base URL for the API

```bash
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

```bash
cd backend
```

```bash
cp .env.example .env
```

Specify the port number for the application and database configuration variables

```bash
PORT = "app_port"
DATABASE_PORT = "database_port"`
DATABASE_NAME = "database_name"`
DATABASE_USER = "database_user"`
DATABASE_PASSWORD = "database_password"`
DATABASE_URL = "mysql://root:root@localhost:3306/database_name?connection_limit=5"

JWT_SECRET = "your_jwt_secret"
```

4. **Set up the database**

Run the command to migrate the database

```bash
npx prisma migrate dev --name init
```

5. **Generate Prisma Client**

```bash
npx prisma generate
```

## Running the App

1. **Starting client and server**

Both frontend and backend are started with the same command

```bash
npm run dev
```

The frontend should be running on port 3000 (Next.js default) and the backend on your specified port

## API Endpoints

### Auth

- **POST /api/auth/signup**: Sign up
- **POST /api/auth/login**: Log in

### Lists

- **GET /api/lists**: Get all lists
- **GET /api/lists/:userId**: Get all lists by user
- **POST /api/lists**: Create a list
- **DELETE /api/lists/:listId**: Delete a list

### Items

- **POST /api/items**: Create an item
- **PATCH /api/items/:itemId/complete**: Mark an item as complete
- **PATCH /api/items/:itemId/incomplete**: Mark an item as incomplete
- **DELETE /api/items/:itemId**: Delete an item

## Environment Variables

### Frontend

- **`NEXT_PUBLIC_API_URL`**: Base URL for the backend API

### Backend

- **`PORT`**: Port number the app runs on
- **`DATABASE_PORT`**: Port number the database runs on
- **`DATABASE_NAME`**: Name of the database
- **`DATABASE_USER`**: Name of the database user
- **`DATABASE_PASSWORD`**: The password for the user
- **`DATABASE_URL`**: The url connection string for the database
