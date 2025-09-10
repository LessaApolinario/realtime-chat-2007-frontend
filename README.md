# 💬 Realtime Chat App

A **Next.js** project that implements a real-time chat application. It allows multiple users to chat in rooms with instant updates using **WebSockets** via **Socket.IO**.

---

## 🚀 Getting Started

Before running the app, create a `.env` file in the root of the project and configure the following environment variables:

```env
# PostgreSQL
POSTGRESQL_USERNAME="your_postgres_user"
POSTGRESQL_PASSWORD="your_postgres_password"
POSTGRESQL_DATABASE="your_database_name"
DB_HOST_PORT="your_db_host:port"
POSTGRESQL_VOLUME_DIR="/pg/data"

# Prisma
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"

# NextAuth
NEXTAUTH_SECRET="YOUR_SECRET"

# WebSocket
NEXT_PUBLIC_REALTIME_CHAT_WEB_SOCKET_URL="http://localhost:2374"
```

Install project dependencies:

```bash
yarn
```

Start the PostgreSQL database using Docker Compose:

```bash
docker compose up -d
```

Run database migrations:

```bash
yarn prisma migrate dev
```

Start the Next.js development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Features

* Real-time chat with multiple users
* Rooms support
* User authentication and registration
* Instant message updates via WebSockets
* Built with Next.js, Node.js, Socket.IO, and Prisma

---

## 📸 Screenshots

### Home page

![Home page screenshot](./src/assets/screenshots/image.png)

### Login page

![Login page screenshot](./src/assets/screenshots/image-1.png)

### Register page

![Register page screenshot](./src/assets/screenshots/image-2.png)

### Dashboard page

![Dashboard page screenshot](./src/assets/screenshots/image-3.png)

### Chat room page

![Chat room page screenshot](./src/assets/screenshots/image-4.png)

![Chat room message typing screenshot](./src/assets/screenshots/image-5.png)

![Chat room messages screenshot](./src/assets/screenshots/image-6.png)

---

## 🛠 Technologies Used

* **Frontend:** [Next.js](https://nextjs.org/docs), [React](https://reactjs.org/docs/getting-started.html)
* **Backend:** [Node.js](https://nodejs.org/en/docs/), [Socket.IO](https://socket.io/docs/v4/)
* **Database:** [PostgreSQL](https://www.postgresql.org/docs/), [Prisma](https://www.prisma.io/docs/)
* **Others:** [Docker Compose](https://docs.docker.com/compose/)

---

## 🔮 Roadmap / Next Steps

* [ ] Real-time notifications
* [ ] Image uploads in chat
* [ ] Production deployment – still figuring out the best approach
