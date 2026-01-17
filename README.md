<div align="left">

# 📝 Notamage v1.0.0

[![LIVE](https://img.shields.io/badge/LIVE-notamage.onrender.com-green?style=for-the-badge&logo=render)](https://notamage.onrender.com)

![Status](https://img.shields.io/badge/Status-Maintained-yellowgreen?style=for-the-badge)

</div>

---

## 🎉 What's New?
- First stable version released!

---
## 💡 About

**Notamage** is a personal project focused on **integrating an AI agent within a full-stack web application** and building a production-ready AI system. This project demonstrates orchestrating agentic AI workflows where the agent autonomously calls backend tools (CRUD operations on notes/categories) based on user conversations.

The project also implements a complete **CI/CD pipeline** with automated testing on pull requests and auto-deployment to Render upon passing tests.

---
## 🧰 Tech Stack

### Frontend
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI"/>
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest"/>
</p>

### AI Agent
The backend connects to a separate **FastAPI server** hosting the AI agent that processes user messages and orchestrates tool calls.

🔗 [**Notamage Agent Repository**](https://github.com/v7wed/NotaMage-Agent)


---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/v7wed/Notamage.git

# Configure your .env in the Backend folder with required keys
# (refer to Backend/.env.example)

# Make sure you have the agent FastAPI server running at your specified AGENT_SERVICE_URL

# Build the project
npm run build

# Start the server
npm run start
```

### Testing

```bash
# Run backend tests
cd Backend
npm test
```

---

## 👨‍💻 About the Developer

Built by **Ahmed Mohammed**, an AI Engineer graduate passionate about creating intelligent applications that solve real problems.

Have suggestions or want to discuss my work? Feel free to reach out!

<a href="https://www.linkedin.com/in/v7wed/">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://github.com/v7wed">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>

---

## 📄 License

This project is open-sourced under the **MIT License**. Feel free to use it for your own projects or further development. A mention of this repo would be greatly appreciated if you find it helpful!
