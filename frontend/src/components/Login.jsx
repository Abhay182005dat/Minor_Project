import React, { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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
			const isAdmin = email.trim().toLowerCase().startsWith('admin') || email.trim().toLowerCase() === 'admin@petx'
			const isUser = !isAdmin
			try {
				window.localStorage.setItem('petx:role', isAdmin ? 'admin' : 'user')
				window.localStorage.setItem('petx:user', JSON.stringify({ email }))
			} catch {}

			const from = location.state?.from?.pathname
			if (from) {
				navigate(from, { replace: true })
			} else if (isAdmin) {
				navigate('/admin', { replace: true })
			} else {
				navigate('/upload', { replace: true })
			}
		}, 400)
	}, [email, password, navigate, location.state])

	return (
		<div className="container" style={{ maxWidth: 420 }}>
			<h1>Sign in</h1>
			<p className="muted">Sign in as admin to view dashboard or as user to upload.</p>
			<form className="card" onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
				<label>
					<div>Email</div>
					<input
						type="email"
						className="btn"
						placeholder="Boss please Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={{ width: '100%' }}
						required
					/>
				</label>
				<label>
					<div>Password</div>
					<input
						type="password"
						className="btn"
						placeholder="Enter any password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						style={{ width: '100%' }}
						required
					/>
				</label>
				{error ? <div style={{ color: '#ef4444' }}>{error}</div> : null}
				<button className="btn primary" type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Signing in…' : 'Sign in'}
				</button>
			</form>
		</div>
	)
}


