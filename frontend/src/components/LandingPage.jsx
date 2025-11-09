import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
	const navigate = useNavigate()
	const [isVisible, setIsVisible] = useState(false)
	useEffect(() => { setIsVisible(true) }, [])

	const stats = [
		{ number: '22.5k', label: 'Images Scanned' },
		{ number: '98.9%', label: 'Accuracy' },
		{ number: '<1s', label: 'Avg Response' }
	]

	return (
		<div className="landing-page minimal">
			<header className="navbar simple">
				<div className="nav-left">PetX</div>
				<div className="nav-right">
					<button className="btn-nav" onClick={() => navigate('/login')}>Log in</button>
					<button className="btn-nav primary" onClick={() => navigate('/register')}>Get Started</button>
				</div>
			</header>

			<section className={`hero hero-simple ${isVisible ? 'visible' : ''}`}>
				<div className="hero-grid">
					<div className="hero-left">
						<h1 className="hero-heading">AI pet identifier</h1>
						<p className="hero-copy">Discover accurate and fast pet identification powered by modern AI. Built for reliability and privacy.</p>
						<div className="hero-ctas">
							<button className="btn-primary" onClick={() => navigate('/login')}>Get Started</button>
							<button className="btn-secondary" onClick={() => navigate('/upload')}>Try Demo</button>
						</div>
						<div className="hero-stats">
							{stats.map((s, i) => (
								<div key={i} className="stat-item">
									<div className="stat-num">{s.number}</div>
									<div className="stat-label">{s.label}</div>
								</div>
							))}
						</div>
					</div>
					<div className="hero-right">
						<div className="device-frame">
							<div className="device-glow" />
							<div className="face-placeholder" />
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

