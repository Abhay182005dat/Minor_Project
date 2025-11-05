import React from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ImageUploader from './components/ImageUploader.jsx'
import Login from './components/Login.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import LandingPage from './components/LandingPage.jsx'
import Register from './components/Register.jsx'
import HistorySidebar from './components/HistorySidebar.jsx'
import './components/UploadLayout.css'

function RequireAuth({ children, role }) {
	const location = useLocation()
	const storedRole = window.localStorage.getItem('petx:role')
	const isRegistered = window.localStorage.getItem('petx:registered') === 'true'
	if (!storedRole) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}
	if (role && storedRole !== role) {
		return <Navigate to={storedRole === 'admin' ? '/admin' : '/upload'} replace />
	}
	if (role === 'user' && !isRegistered) {
		return <Navigate to="/register" state={{ from: location }} replace />
	}
	return children
}

function HomeRedirect() {
	const storedRole = window.localStorage.getItem('petx:role')
	if (storedRole === 'admin') return <Navigate to="/admin" replace />
	if (storedRole === 'user') return <Navigate to="/upload" replace />
	return <LandingPage />
}

function UploadPage() {
	const navigate = useNavigate()
	return (
		<div className="upload-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 0, minHeight: '100vh' }}>
			<HistorySidebar />
			<div className="container upload-container" style={{ position: 'relative' }}>
				<div className="upload-header" style={{ gap: 12, justifyContent: 'center' }}>
					<h1 style={{ margin: 0, textAlign: 'center' }}>PetX Image Predictor</h1>
					<button
						className="btn"
						onClick={() => {
							try {
								window.localStorage.removeItem('petx:role')
								window.localStorage.removeItem('petx:user')
							} catch {}
							navigate('/login', { replace: true })
						}}
						style={{ position: 'absolute', top: 0, right: 0 }}
					>
						Logout
					</button>
				</div>
				<p className="muted">Upload an image and get a prediction from the backend.</p>
				<ImageUploader />
				<footer>Backend: <code>https://minor-project-petx.onrender.com</code>. No backend changes required.</footer>
			</div>
		</div>
	)
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomeRedirect />} />
			<Route path="/landing" element={<LandingPage />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/upload"
				element={(
					<RequireAuth role="user">
						<UploadPage />
					</RequireAuth>
				)}
			/>
			<Route
				path="/admin"
				element={(
					<RequireAuth role="admin">
						<AdminDashboard />
					</RequireAuth>
				)}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}


