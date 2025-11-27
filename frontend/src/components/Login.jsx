import React, { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import './auth/Auth.css'

export default function Login() {
	const navigate = useNavigate()
	const location = useLocation()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleAuthSuccess = useCallback((userEmail) => {
		const emailLower = userEmail.trim().toLowerCase()
		const isAdmin = emailLower.startsWith('admin') || emailLower === 'shabana@petx'
		
		// Check if user is registered (for non-admin users)
		if (!isAdmin) {
			const registeredUsersStr = window.localStorage.getItem('petx:registeredUsers')
			const registeredUsers = registeredUsersStr ? JSON.parse(registeredUsersStr) : []
			
			if (!registeredUsers.includes(emailLower)) {
				setIsSubmitting(false)
				setError('This email is not registered. Please register first.')
				return
			}
		}
		
		try {
			window.localStorage.setItem('petx:role', isAdmin ? 'admin' : 'user')
			window.localStorage.setItem('petx:user', JSON.stringify({ email: userEmail }))
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
	}, [navigate, location.state])

	const onSubmit = useCallback((e) => {
		e.preventDefault()
		setError('')
		setIsSubmitting(true)

		setTimeout(() => {
			// Simple client-side auth for demo (no backend changes)
			const emailLower = email.trim().toLowerCase()
			handleAuthSuccess(email)
		}, 400)
	}, [email, handleAuthSuccess])

	const handleGoogleSuccess = useCallback(async (response) => {
		setError('')
		setIsSubmitting(true)
		
		try {
			// Fetch user info from Google
			const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: {
					Authorization: `Bearer ${response.access_token}`
				}
			})
			
			if (!userInfoResponse.ok) {
				throw new Error('Failed to fetch user info')
			}
			
			const userInfo = await userInfoResponse.json()
			const userEmail = userInfo.email
			const userName = userInfo.name || userInfo.given_name || ''
			
			if (!userEmail) {
				throw new Error('No email found in Google account')
			}
			
			// Auto-register Google OAuth users (since Google has verified their email)
			const emailLower = userEmail.trim().toLowerCase()
			const registeredUsersStr = window.localStorage.getItem('petx:registeredUsers')
			const registeredUsers = registeredUsersStr ? JSON.parse(registeredUsersStr) : []
			
			if (!registeredUsers.includes(emailLower)) {
				// Add Google OAuth user to registered users
				registeredUsers.push(emailLower)
				window.localStorage.setItem('petx:registeredUsers', JSON.stringify(registeredUsers))
			}
			
			// Store user info
			try {
				window.localStorage.setItem('petx:user', JSON.stringify({ email: userEmail, name: userName }))
			} catch {}
			
			handleAuthSuccess(userEmail)
		} catch (err) {
			setIsSubmitting(false)
			setError(err.message || 'Google authentication failed. Please try again.')
		}
	}, [handleAuthSuccess])

	const googleLogin = useGoogleLogin({
		onSuccess: handleGoogleSuccess,
		onError: () => {
			setError('Google authentication failed. Please try again.')
			setIsSubmitting(false)
		}
	})

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
					<div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
						<div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }}></div>
						<span style={{ fontSize: 12, color: '#9ca3af' }}>OR</span>
						<div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }}></div>
					</div>
					<button 
						type="button" 
						className="auth-btn-google" 
						onClick={() => googleLogin()}
						disabled={isSubmitting}
					>
						<svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: 8 }}>
							<path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
							<path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.965-2.184l-2.908-2.258c-.806.54-1.837.86-3.057.86-2.35 0-4.34-1.587-5.053-3.716H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
							<path fill="#FBBC05" d="M3.947 10.702c-.18-.54-.282-1.117-.282-1.702s.102-1.162.282-1.702V4.966H.957C.348 6.175 0 7.55 0 9s.348 2.825.957 4.034l2.99-2.332z"/>
							<path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.966L3.947 7.3C4.66 5.163 6.65 3.58 9 3.58z"/>
						</svg>
						Continue with Google
					</button>
					<div className="auth-link">New here? <button type="button" onClick={() => navigate('/register')}>Create an account</button></div>
				</div>
			</div>
		</form>
	</div>
)
}


