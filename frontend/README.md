# PetX Frontend

A modern React-based web application for uploading pet images and receiving AI predictions from the backend API.

## 📋 Overview

PetX Frontend is a single-page application built with React and Vite that provides an intuitive interface for users to upload pet images and receive predictions. The application features drag-and-drop image upload, real-time status updates, and seamless integration with the backend API.

## 🛠️ Technology Stack

- **React 18.3.1** - UI library
- **Vite 5.4.8** - Build tool and development server
- **Modern CSS** - Responsive design with system color schemes

## ✨ Features

- **Image Upload**: Click to select or drag-and-drop image files
- **Image Preview**: Preview selected images before prediction
- **Endpoint Configuration**: Switch between different API endpoints
- **Backend Warm-up**: Automatically warms up the backend to reduce cold start delays
- **Timeout Handling**: Robust error handling with request timeouts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Automatically adapts to system color scheme preferences
- **Local Storage**: Persists endpoint preferences in browser storage

## 📦 Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js)

## 🚀 Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## 💻 Development

Start the development server:
```bash
npm run dev
```

The development server will start and automatically open your default browser. If it doesn't, visit the URL shown in the terminal (typically `http://localhost:5173`).

The dev server includes:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- Automatic browser opening

## 🏗️ Building for Production

Build the production-ready bundle:
```bash
npm run build
```

The optimized build will be created in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ImageUploader.jsx    # Main image upload component
│   ├── services/
│   │   └── api.js               # API service functions
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Application entry point
│   └── styles.css               # Global styles
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🔧 Configuration

### Google OAuth Setup

To enable Google OAuth authentication, you need to:

1. **Create a Google OAuth Client ID**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - **Important for Branding section**: In the "Branding" section, you cannot use `localhost` in the "Application home page" field. Either leave it empty or use a placeholder domain (e.g., `https://example.com`). This field is only for display on the consent screen.
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - **Add authorized JavaScript origins**: Add `http://localhost:5173` (and `http://127.0.0.1:5173` if needed)
   - **Add authorized redirect URIs**: Add `http://localhost:5173` (and `http://127.0.0.1:5173` if needed)
   - Copy your Client ID

2. **Set the Client ID**:
   - Create a `.env` file in the `frontend` directory
   - Add your Google Client ID:
     ```
     VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
     ```
   - Or replace `YOUR_GOOGLE_CLIENT_ID_HERE` in `src/main.jsx` directly

3. **Restart the development server** after setting the environment variable

### API Endpoints

The application supports two backend endpoints:

- **Default**: `https://minor-project-petx.onrender.com/predictImage`
  - Form field name: `image`
  
- **Alternate**: `https://minor-project-petx.onrender.com/predict`
  - Form field name: `file`

You can switch between endpoints using the dropdown in the UI. Your selection is automatically saved to localStorage.

### Custom Endpoint

You can also enter a custom endpoint URL directly in the endpoint input field. The application will:
- Automatically detect the correct form field name based on the endpoint path
- Save your preference to localStorage for future sessions

## 🎯 Usage

1. **Upload Image**:
   - Click the dropzone area or drag and drop an image file
   - Supported formats: PNG, JPG, JPEG
   - Image preview will appear once selected

2. **Get Prediction**:
   - Click the "Upload & Predict" button
   - The app will first warm up the backend (if needed)
   - Then upload the image and wait for prediction results
   - Results will display in the status area

3. **Clear Selection**:
   - Click "Clear" to remove the selected image and start over

## ⚙️ API Service Features

- **Warm-up Function**: Automatically pings the backend to wake up cold instances
- **Timeout Protection**: 20-second timeout for warm-up, 90-second timeout for predictions
- **Error Handling**: Comprehensive error messages for different failure scenarios
- **CORS Support**: Handles cross-origin requests properly

## 🐛 Troubleshooting

### CORS Issues
If you encounter CORS errors:
- Verify the backend allows requests from your origin
- Check backend CORS configuration includes your frontend URL
- For local development, ensure backend CORS allows `http://localhost:5173`

### Network Errors
- Check your internet connection
- Verify the backend URL is correct and accessible
- Try switching to the alternate endpoint
- Backend may be cold-starting (first request takes longer)

### Build Issues
- Ensure Node.js version is 18 or higher
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check for any port conflicts (default: 5173)

### Timeout Errors
- The backend may be experiencing high load
- Retry the request after a few seconds
- Check backend server status

## 📝 Notes

- No backend changes are required to use this frontend
- Endpoint preferences are stored in browser localStorage
- The application automatically handles image validation
- All API calls include proper timeout and error handling

## 🔗 Related

- Backend API: [Backend README](../README.md)
- Backend Repository: Check the main project README for backend setup instructions
