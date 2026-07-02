# NextHire 🚀

NextHire is an AI-powered interview preparation platform designed to help job seekers build winning strategy plans tailored to specific target job descriptions and their profiles. By analyzing a target job description and either a parsed PDF resume or a quick text profile description, the app leverages advanced AI to generate structured, personalized preparation reports—including technical questions, behavioral questions, and a structured day-by-day study roadmap.

---

## ✨ Features

- **Custom Strategy Generation**: Paste a target job description and let AI analyze the key requirements.
- **Resume Upload & Parsing**: Upload your resume in PDF format; the backend automatically extracts and parses the text.
- **Quick Self-Description**: Don't have a resume handy? Provide a quick text description of your skills, background, and experience.
- **Match Score Analysis**: Get an instant overview of how well your profile aligns with the target job.
- **Structured Preparation Roadmap**: View a day-by-day prep plan structured to target your skill gaps.
- **Technical & Behavioral Questions**: Study curated interview questions with accordion-style toggles to view answers and advice.
- **Resume Generation / Export**: Download structured resume PDFs generated server-side.
- **User Authentication**: Secure user login and registration flows.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Routing**: React Router 7
- **Styling**: Sass / SCSS
- **API Client**: Axios

### Backend
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: `@google/genai` (Google Gemini SDK)
- **File Parsing**: `pdf-parse` (for extracting PDF text), `multer` (for handling multi-part form data uploads)
- **PDF Generation**: `puppeteer`
- **Validation**: Zod (for validation schemas and structured JSON outputs)

---

## 🚀 Getting Started

Follow these steps to set up and run CareerForge AI locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas connection string)
- [Gemini API Key](https://aistudio.google.com/) (For AI generation features)

---

### 📦 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "CareerForge AI"
   ```

2. **Configure Backend Environment Variables:**
   Navigate to the `Backend` directory, create a `.env` file, and populate the following keys:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/careerforge
   JWT_SECRET=your_jwt_secret_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   FRONTEND_URL=http://localhost:5173
   ```

3. **Install Backend Dependencies & Run:**
   ```bash
   cd Backend
   npm install
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

4. **Install Frontend Dependencies & Run:**
   Open a new terminal window, navigate to the `Frontend` directory, and run:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
   The frontend application will be served at `http://localhost:5173`.

---

## 📁 Directory Structure

```text
CareerForge AI/
├── Backend/
│   ├── src/
│   │   ├── controllers/      # Route controllers (Auth, Interview)
│   │   ├── models/           # Mongoose schemas (User, Report)
│   │   ├── routes/           # Express API endpoints
│   │   ├── services/         # Business logic & AI generation (Gemini)
│   │   └── middlewares/      # Auth & file uploads
│   ├── server.js             # Main server entrypoint
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/         # Authentication logic, pages (Login, Register), components
    │   │   └── interview/    # Interview preparation pages (Home, Interview), hooks, styles
    │   ├── App.jsx           # Main React component
    │   ├── main.jsx          # React app entry point
    │   └── index.css         # Global design styles
    ├── vite.config.js
    └── package.json
```

---

## 🔒 License

This project is licensed under the MIT License.
