# 🚀 Vue Nuxt 3 + Pinia + Tailwind TODO App

A modern, beautiful TODO application built with **Vue.js 3**, **Nuxt 3**, **Pinia** for state management, and **Tailwind CSS** for stunning UI design.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.x-yellow?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎯 **User Experience**: Beautiful, modern UI with smooth animations
- 🔐 **User Persistence**: Name saved with Pinia and localStorage
- 📝 **Full CRUD**: Create, Read, Update, Delete TODO items
- 🔍 **Smart Search**: Real-time search by title with debounced input
- 📄 **Pagination**: Efficient pagination with configurable items per page
- 🎨 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🌐 **API Integration**: Configurable API base URL via environment variables

## 🛠️ Tech Stack

- **Frontend**: Vue.js 3 + Nuxt 3
- **State Management**: Pinia
- **Styling**: Tailwind CSS 3.x
- **TypeScript**: Full type safety
- **API**: RESTful with OData v4 support

## 📋 Prerequisites

Before running this frontend application, you need to set up the backend API:

### Backend API Setup

1. **Clone the backend repository:**
   ```bash
   git clone https://github.com/andredrumond1995/nestjs-mongoose-clean-arch
   cd nestjs-mongoose-clean-arch
   ```

2. **Start the API with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Verify the API is running:**
   - Health check: `http://localhost:3000/health`
   - API endpoint: `http://localhost:3000/v1/todos`

## 🚀 Frontend Setup

1. **Clone this repository:**
   ```bash
   git clone <your-repo-url>
   cd vue-nuxt3-pinia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```bash
   NUXT_API_BASE_URL=http://localhost:3000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3001`

## 🎯 Usage

1. **Enter your name** on the welcome page
2. **View your TODOs** with pagination and search
3. **Create new TODOs** with title, description, due date, and priority
4. **Edit existing TODOs** with full form support
5. **Search TODOs** by title in real-time

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NUXT_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |

## 📁 Project Structure

```
vue-nuxt3-pinia/
├── assets/
│   └── css/
│       └── tailwind.css          # Tailwind CSS directives
├── pages/
│   ├── index.vue                 # Welcome page
│   └── todos/
│       ├── index.vue             # TODO list with pagination
│       ├── new.vue               # Create new TODO
│       └── [id].vue              # Edit TODO
├── stores/
│   └── user.ts                   # Pinia store for user data
├── nuxt.config.ts                # Nuxt configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── .env                          # Environment variables
```

## 🔍 API Integration

This frontend integrates with the [NestJS Mongoose Clean Architecture API](https://github.com/andredrumond1995/nestjs-mongoose-clean-arch) which provides:

- **OData v4 Support**: Advanced filtering and pagination
- **MongoDB Integration**: Robust data persistence
- **Clean Architecture**: Scalable and maintainable codebase
- **RESTful Endpoints**: Standard HTTP methods

## 📱 Screenshots

### 🏠 Welcome Page
![Welcome Page](/public/images/welcome-screenshot.jpeg)

*Beautiful welcome page with tech stack showcase and developer contacts*

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**André Drumond**

- 🌐 **GitHub**: [@andredrumond1995](https://github.com/andredrumond1995)
- 💼 **LinkedIn**: [andre-drumond](https://www.linkedin.com/in/andre-drumond/)
- 📺 **YouTube**: [@drumonddev](https://www.youtube.com/@drumonddev)

---

⭐ **Star this repository if you found it helpful!**
