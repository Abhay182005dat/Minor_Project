import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './auth/Auth.css'

export default function Register() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')

	const onSubmit = useCallback((e) => {
		e.preventDefault()
		setError('')
		setIsSubmitting(true)
		setTimeout(() => {
			try {
				window.localStorage.setItem('petx:registered', 'true')
				window.localStorage.setItem('petx:user', JSON.stringify({ email, name }))
			} catch {}
			navigate('/login', { replace: true })
		}, 400)
	}, [email, name, navigate])

return (
	<div className="auth-page">
		<form className="auth-card" onSubmit={onSubmit}>
			<h2 className="auth-title">Create account</h2>
			<div style={{ display: 'grid', gap: 12 }}>
				<input className="auth-input" type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
				<input className="auth-input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
				<input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				{error ? <div style={{ color: '#fca5a5', fontSize: 13 }}>{error}</div> : null}
				<div className="auth-actions">
					<button className="auth-btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating account…' : 'Create account'}</button>
					<div className="auth-link">Already have an account? <button type="button" onClick={() => navigate('/login')}>Sign in</button></div>
				</div>
			</div>
		</form>
		{/* Google OAuth removed */}
	</div>
)
}


