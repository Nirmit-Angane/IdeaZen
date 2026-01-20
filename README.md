# 💡 IdeaZen: AI-Powered Project Idea Generator

<img src="image.png" alt="IdeaZen Hero" width="100%" />

> **Stop Wondering. Start Building.**  
> Cure "Tutorial Hell" and developer's block with AI-tailored project ideas that match your skills, interests, and time availability.

---

## 🚀 The Problem

Every developer knows the struggle:
1.  **Tutorial Hell**: You follow endless tutorials but never build anything original.
2.  **Analysis Paralysis**: You want to practice a new tech stack (e.g., React + TypeScript), but you can't think of a project idea that isn't a "To-Do List" or "Weather App".
3.  **Skill Mismatch**: You find an idea, but it's either too simple (boring) or too complex (overwhelming).

## ✨ The Solution

**IdeaZen** uses advanced AI to generate unique, personalized project ideas just for you. It considers your:
*   **Skill Level**: Beginner, Intermediate, or Advanced.
*   **Time Commitment**: How many hours/weeks you have.
*   **Interests**: Specific domains like FinTech, Health, Gaming, e-commerce, etc.
*   **Tech Stack Goals**: Technologies you want to learn or practice.

It doesn't just give you a title; it gives you a **complete roadmap**, **tech stack**, **key features**, and **difficulty reasoning**.

## 🛠️ Key Features

-   **🧠 Skill-Adaptive AI**: The questions and generated projects adapt to your experience level.
-   **🔍 AI Reasoning**: Understand *why* a project was chosen for you.
-   **📚 Complete Roadmaps**: Get a step-by-step breakdown of how to build the project.
-   **⚡ Tech Stack Suggestions**: Modern, relevant technology recommendations.
-   **🎨 Premium UI**: Built with a beautiful, modern design system featuring glassmorphism and smooth animations.

## 💻 Tech Stack

This project is built with a modern frontend stack:

*   **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/) + [Lucide React](https://lucide.dev/) (Icons)
*   **AI Integration**: [Groq API](https://groq.com/) (using Llama 3 models) or Gemini
*   **Language**: TypeScript

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Groq API Key (Free tier available)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ideazen.git
    cd ideazen
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory and add your Groq API key:
    ```env
    VITE_GROQ_API_KEY=gsk_your_actual_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open the app**
    Visit `ideazen.vercel.app` in your browser.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by Nirmit Angane
</p>
