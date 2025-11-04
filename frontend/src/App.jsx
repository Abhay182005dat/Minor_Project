import React from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ImageUploader from './components/ImageUploader.jsx'
import Login from './components/Login.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'

function RequireAuth({ children, role }) {
	const location = useLocation()
	const storedRole = window.localStorage.getItem('petx:role')
	if (!storedRole) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}
	if (role && storedRole !== role) {
		return <Navigate to={storedRole === 'admin' ? '/admin' : '/upload'} replace />
	}
	return children
}

function HomeRedirect() {
	const storedRole = window.localStorage.getItem('petx:role')
	if (storedRole === 'admin') return <Navigate to="/admin" replace />
	if (storedRole === 'user') return <Navigate to="/upload" replace />
	return <Navigate to="/login" replace />
}

function UploadPage() {
	const navigate = useNavigate()
	return (
		<div className="container">
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
				<h1 style={{ margin: 0 }}>PetX Image Predictor</h1>
				<button
					className="btn"
					onClick={() => {
						try {
							window.localStorage.removeItem('petx:role')
							window.localStorage.removeItem('petx:user')
						} catch {}
						navigate('/login', { replace: true })
					}}
				>
					Logout
				</button>
			</div>
			<p className="muted">Upload an image and get a prediction from the backend.</p>
			<ImageUploader />
			<footer>Backend: <code>https://minor-project-petx.onrender.com</code>. No backend changes required.</footer>
		</div>
	)
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomeRedirect />} />
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


