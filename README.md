# 🌟 QuickGPT

QuickGPT is a lightweight browser-based **ChatGPT widget** built on a **client-server architecture**.  
It brings the power of AI directly into your browser with a **floating, draggable, resizable widget** and **right-click context menu integration** for instant productivity.

---

## 📑 Table of Contents
- [✨ Overview](#-overview)
- [🚀 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [⚙️ Installation & Setup](#️-installation--setup)
- [💡 Usage](#-usage)
- [🛠️ Configuration](#️-configuration)
- [📜 License](#-license)

---

## ✨ Overview

QuickGPT enhances your browsing experience by letting you:
- Summarize long articles instantly  
- Reword or simplify text on the fly  
- Chat with an AI assistant directly in your browser  

With QuickGPT, you don’t need to switch tabs or apps — **your AI is always within reach**.  

---

## 🚀 Features

- ✅ Floating, draggable, and resizable chat widget  
- ✅ Right-click context menu actions (Summarize, Explain, Translate, Reword)  
- ✅ Clean and modern UI (light/dark theme support if enabled)  
- ✅ Easy API key setup for OpenAI integration  
- ✅ Clear Chat & Copy-to-Clipboard support  
- ✅ Model selection (GPT-3.5, GPT-4, or custom if enabled)  
- ✅ Modular client-server design for easier scaling and maintenance  

---

## 🏗️ Architecture

QuickGPT follows a **split architecture**:

- **Client** (browser extension):  
  - Built with HTML/CSS/JavaScript  
  - Provides the widget UI and context-menu integration  

- **Server** (Node.js + Express):  
  - Handles OpenAI API requests  
  - Manages environment variables and API key securely  
  - Returns responses to the client  

---

## ⚙️ Installation & Setup

### 🔑 Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)  
- A valid **OpenAI API Key**  

### 🖥️ Client Setup
```bash
cd client
npm install
```

### 🖥️ Server Setup
```bash
cd server
npm install
```
### Create your API key
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000

---

## ▶️ Running Locally

### Start the server:
```bash
cd server
npm run start
```

### MIT License  
© 2025 devmanushh
