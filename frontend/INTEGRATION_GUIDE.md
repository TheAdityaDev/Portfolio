# Backend-Frontend Integration Guide

## ✅ What's Been Integrated

### 1. **API Configuration**
- Created `.env` file with `VITE_API_BASE_URL=http://localhost:5000/api`
- Created centralized API service (`src/services/api.js`) for all backend calls
- Using environment variables for easy configuration

### 2. **Projects Integration** 
- **Backend Endpoint**: `GET /api/projects`
- **Frontend**: `portfolio-gallery/index.jsx` fetches projects from backend
- **Display**: Projects are filtered by category and displayed in the gallery
- All project data from MongoDB is now shown on the frontend

### 3. **Contact Form Integration**
- **Backend Endpoint**: `POST /api/contact`
- **Frontend**: `contact-footer/components/ContactForm.jsx` submits to backend
- **Data**: Contact submissions are saved to MongoDB with timestamps
- **Feedback**: Success message shown on successful submission

### 4. **API Service Module** (`src/services/api.js`)
Provides clean methods for frontend calls:
```javascript
projectsAPI.getAll()        // GET /api/projects
contactAPI.submit(data)     // POST /api/contact
skillsAPI.getAll()          // GET /api/skills (ready for future)
```

---

## 🚀 How to Run

### **Terminal 1: Start Backend Server**
```bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
```

### **Terminal 2: Start Frontend Dev Server**
```bash
npm install
npm run dev
# Frontend runs on http://localhost:5173 (typically)
```

---

## 🔗 API Endpoints Available

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project

### Contact
- `POST /api/contact` - Submit contact form

---

## 📱 Pages Using Backend Data

| Page | Endpoint | Data |
|------|----------|------|
| Portfolio Gallery | `/api/projects` | Projects with details, images, technologies |
| Contact Form | `/api/contact` | Contact submissions |
| About/Skills | None yet | Hardcoded skills (ready for API integration) |

---

## 🔄 How Data Flows

```
Frontend Component
    ↓
API Service (src/services/api.js)
    ↓
Axios HTTP Request
    ↓
Backend Express Server (port 5000)
    ↓
MongoDB Database
    ↓
Response back to Frontend
    ↓
Component Updates UI
```

---

## 🛠️ Future Enhancements

1. **Skills API** - Move hardcoded skills to backend
   ```bash
   # Add endpoint: GET /api/skills
   # Update src/pages/about-skills-showcase/components/SkillsVisualization.jsx
   ```

2. **Error Handling** - Add better error messages and retry logic

3. **Loading States** - Add loading skeletons while fetching data

4. **Caching** - Implement data caching to reduce API calls

5. **Authentication** - Add user authentication for admin features

---

## ✨ Verified Integration Points

✅ Backend running on port 5000 with MongoDB  
✅ CORS enabled for frontend requests  
✅ API service configured with base URL  
✅ Portfolio gallery fetching projects  
✅ Contact form submitting data  
✅ Environment variables set up  
