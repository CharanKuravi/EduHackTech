# EduHack Tech 🚀

**Unified Learning & Competition Platform**

EduHack Tech is a comprehensive ecosystem designed to bridge the gap between learning and competing. It offers a "Learn-to-Compete" environment where users can enroll in courses, build teams, and participate in hackathons.

## 🌟 Key Features

- **🎓 Learning Module**: Explore courses, track progress, and access curated content.
- **🏆 Competition Hub**: Join hackathons, form teams, and manage event registrations.
- **🔐 Secure Authentication**: Robust user management with JWT-based authentication.
- **🎨 Modern UI**: Responsive and accessible interface built with React and Tailwind CSS.
- **🌓 Dark/Light Mode**: Seamless theme switching for better user experience.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router DOM

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: JWT (JSON Web Tokens)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or AtlasURI)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/jaswanthkumarreddy999/EduHackTech.git
cd EduHackTech
```

#### 2. Client Setup (Frontend)
Navigate to the client directory, install dependencies, and start the development server.

```bash
cd client
npm install
npm run dev
```
> The frontend will typically run on `http://localhost:5173` (or the port shown in your terminal).

#### 3. Server Setup (Backend)
Open a new terminal, navigate to the server directory, and start the backend.

```bash
cd server
npm install
npm run dev
```
> The backend runs on `http://localhost:5000` (default).

### ⚙️ Configuration (Environment Variables)

Create a `.env` file in the **server** directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📂 Project Structure

```
EduHackTech/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── modules/        # Feature-based modules (Auth, Competition, Learning)
│   │   ├── context/        # Global state (Theme, Auth)
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── server/                 # Backend Express Application
│   ├── config/             # DB configurations
│   ├── modules/            # API Route modules (Controllers, Models, Routes)
│   ├── middlewares/        # Auth and Error handling middlewares
│   └── server.js           # Server entry point
│
└── README.md               # Project Documentation
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by the EduHack Tech Team