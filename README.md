# 💬 Realtime Chat App

A **Next.js** project that implements a real-time chat application.  
It allows multiple users to chat in rooms with instant updates using **WebSockets** via **Socket.IO**.

---

## 🚀 How to Run

Follow these steps in your terminal:

- `yarn` – Install project dependencies  
- `docker compose up -d` – Start the PostgreSQL database  
- `yarn prisma migrate dev` – Run database migrations  
- `yarn dev` – Start the Next.js development server  

After running the above commands, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Features

- Real-time chat with multiple users  
- Rooms support  
- User authentication and registration  
- Instant message updates via WebSockets  
- Built with Next.js, Node.js, Socket.IO, and Prisma  

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

- **Frontend:** [Next.js](https://nextjs.org/docs), [React](https://reactjs.org/docs/getting-started.html)  
- **Backend:** [Node.js](https://nodejs.org/en/docs/), [Socket.IO](https://socket.io/docs/v4/)  
- **Database:** [PostgreSQL](https://www.postgresql.org/docs/), [Prisma](https://www.prisma.io/docs/)  
- **Others:** [Docker Compose](https://docs.docker.com/compose/)

---

## 🔮 Roadmap / Next Steps

- [ ] Real-time notifications  
- [ ] Image uploads in chat  
- [ ] Production deployment – still figuring out the best approach  
