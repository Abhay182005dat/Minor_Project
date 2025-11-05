import React, { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './auth/Auth.css'

export default function Login() {
	const navigate = useNavigate()
	const location = useLocation()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onSubmit = useCallback((e) => {
		e.preventDefault()
		setError('')
		setIsSubmitting(true)

		setTimeout(() => {
			// Simple client-side auth for demo (no backend changes)
			const isAdmin = email.trim().toLowerCase().startsWith('admin') || email.trim().toLowerCase() === 'shabana@petx'
			const isUser = !isAdmin
			const isRegistered = window.localStorage.getItem('petx:registered') === 'true'
			if (!isAdmin && !isRegistered) {
				setIsSubmitting(false)
				setError('Please register before signing in.')
				return
			}
			try {
				window.localStorage.setItem('petx:role', isAdmin ? 'admin' : 'user')
				window.localStorage.setItem('petx:user', JSON.stringify({ email }))
			} catch {}

			const from = location.state?.from?.pathname
			if (from) {
				navigate(from, { replace: true })
			} 
			else if (isAdmin) {
				navigate('/admin', { replace: true })
			} 
			else {
				navigate('/upload', { replace: true })
			}
		}, 400)
	}, [email, password, navigate, location.state])

return (
	<div className="auth-page">
		<form className="auth-card" onSubmit={onSubmit}>
			<h2 className="auth-title">Sign in</h2>
			<div style={{ display: 'grid', gap: 12 }}>
				<input className="auth-input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
				<input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				{error ? <div style={{ color: '#fca5a5', fontSize: 13 }}>{error}</div> : null}
				<div className="auth-actions">
					<button className="auth-btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
					<div className="auth-link">New here? <button type="button" onClick={() => navigate('/register')}>Create an account</button></div>
				</div>
			</div>
		</form>
		{/* Google OAuth removed */}
	</div>
)
}


