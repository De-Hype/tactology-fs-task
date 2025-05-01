
# Tactology FS Task

This project is a fullstack application consisting of a **Next.js frontend** and a **NestJS backend**. Both reside in their respective `frontend` and `backend` directories.

---

## 🌐 Live Links

- **Frontend:** [tactology-fs-task.vercel.app](https://tactology-fs-task.vercel.app)
- **Backend GraphQL Playground:** [https://tactology-fs-task.onrender.com/graphql](https://tactology-fs-task.onrender.com/graphql)

---

## 📁 Folder Structure

```bash
.
├── frontend/     # Next.js Frontend
└── backend/      # NestJS Backend with Docker and PostgreSQL
```

---

## 🚀 Getting Started Locally

### ⚙️ Prerequisites

- **Node.js** (v16 or higher)
- **npm**
- **Docker** and **Docker Compose**

---

## 🖥️ Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

This will start the frontend at [http://localhost:3000](http://localhost:3000) (except you have something else runing there)

---

## 🛠️ Backend Setup (NestJS + Docker + PostgreSQL)

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Setup PostgreSQL Database Using Docker

Make sure Docker is installed and running. Then run:

```bash
docker-compose up -d
```

This will:
- Start a **PostgreSQL** instance on port `5433`
- Start **Adminer** at [http://localhost:8080](http://localhost:8080) for DB visualization

### 3. Create a `.env` file in the `backend` directory

```env
PORT=5300
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=yourpassword123@
DB_DATABASE=tactology_assessment_task

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1d

# Remote DB (will override local DB if present)
DATABASE_URL=postgresql://tactology_user:AOo2ls9opLSTws2mFL9ugiCxP4Vhq4YA@dpg-d09a56re5dus739c66sg-a.oregon-postgres.render.com/tactology_assessment_task
```

> 🔐 **Note**: If `DATABASE_URL` is defined, the app will connect to the **remote PostgreSQL** instance hosted on **Render**, bypassing your local Docker database.

### 4. Install Dependencies and Start Backend Server

```bash
npm install
npm run start:dev
```

This starts the backend on [http://localhost:5300/graphql](http://localhost:5300/graphql)

---

## 🧪 Running Backend Unit Tests

From the `backend` directory:

```bash
npm run test:watch
```

This will run the unit tests in watch mode.

---

## 📦 Docker Services Info

- **PostgreSQL**: localhost:5433  
- **Adminer**: [http://localhost:8080](http://localhost:8080)

---

## 📌 Notes

- Docker services are defined inside `backend/docker-compose.yml`.
- Ensure ports `5433` and `8080` are available on your machine before starting Docker.
- Frontend and backend both use `npm install` for dependencies.
