import React, { useEffect, useRef } from 'react'

export default function GoogleAuthButton({ mode = 'login' }) {
	const divRef = useRef(null)
	useEffect(() => {
		const clientId = import.meta?.env?.VITE_GOOGLE_CLIENT_ID
		if (!clientId || !window.google || !window.google.accounts || !divRef.current) return
		const handle = (response) => {
			try {
				window.localStorage.setItem('petx:registered', 'true')
				window.localStorage.setItem('petx:role', 'user')
				window.localStorage.setItem('petx:user', JSON.stringify({ provider: 'google' }))
			} catch {}
			const target = mode === 'register' ? '/login' : '/upload'
			window.location.replace(target)
		}
		window.google.accounts.id.initialize({ client_id: clientId, callback: handle })
		window.google.accounts.id.renderButton(divRef.current, { theme: 'outline', size: 'large', width: 320 })
	}, [mode])
	return (
		<div>
			{import.meta?.env?.VITE_GOOGLE_CLIENT_ID ? (
				<div ref={divRef} />
			) : (
				<div className="muted">Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in.</div>
			)}
		</div>
	)
}


