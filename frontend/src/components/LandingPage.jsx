import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
// Import your image from the assets folder
// Place your image in: frontend/src/assets/images/hero-image.jpg
// Or update the import path below to match your image filename
// Supported formats: .jpg, .jpeg, .png, .gif, .webp, .svg
import heroImage from '../assets/images/hero-image.png'

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
						<h1 className="hero-heading">AI Image Identifier</h1>
						<p className="hero-copy">Detecting Fake Images Using Deep Learning</p>
						<div className="hero-ctas">
							<button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
							<button className="btn-secondary" onClick={() => navigate('/login')}>Try Demo</button>
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
							<img src={heroImage} alt="AI Image Identifier" className="hero-image" />
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

