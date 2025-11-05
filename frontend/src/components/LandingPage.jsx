import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
	const navigate = useNavigate()
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
		const handleMouseMove = (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	const features = [
		{
			icon: '🔍',
			title: 'AI-Powered Detection',
			description: 'Advanced machine learning models for accurate pet identification'
		},
		{
			icon: '⚡',
			title: 'Lightning Fast',
			description: 'Get instant predictions in seconds with optimized processing'
		},
		{
			icon: '📊',
			title: 'Analytics Dashboard',
			description: 'Track usage patterns and insights with admin dashboard'
		},
		{
			icon: '🔒',
			title: 'Secure & Private',
			description: 'Your data is protected with industry-standard security'
		}
	]

	const stats = [
		{ number: '99%', label: 'Accuracy' },
		{ number: '<1s', label: 'Response Time' },
		{ number: '10K+', label: 'Predictions' },
		{ number: '24/7', label: 'Available' }
	]

	return (
		<div className="landing-page">
			{/* Top Navigation */}
			<header className="navbar">
				<div className="nav-left" onClick={() => navigate('/')}>PetX</div>
				<div className="nav-right">
					<button className="btn-nav" onClick={() => navigate('/login')}>Log in</button>
					<button className="btn-nav primary" onClick={() => navigate('/register')}>Sign up</button>
				</div>
			</header>

			{/* Hero Section */}
			<section className={`hero-section ${isVisible ? 'visible' : ''}`}>
				<div className="hero-content">
					<div className="badge"><span className="badge-text">✨ Powered by AI</span></div>
					
					<h1 className="hero-title">
						<span className="gradient-text">Landing Page Demo</span>
					</h1>
					
					<p className="hero-subtitle">
						Inspirational designs, illustrations, and graphic elements from the world's best designers.
						<span className="highlight"> Explore PetX capabilities</span>
					</p>

					<div className="hero-buttons">
						<button 
							className="btn-primary pulse-btn"
							onClick={() => navigate('/login')}
						>
							<span>Get Started</span>
							<span className="btn-arrow">→</span>
						</button>
						<button 
							className="btn-secondary"
							onClick={() => navigate('/register')}
						>
							Create Account
						</button>
						<button 
							className="btn-secondary"
							onClick={() => navigate('/upload')}
						>
							Try Demo
						</button>
					</div>

					{/* Stats */}
					<div className="stats-grid">
						{stats.map((stat, idx) => (
							<div key={idx} className="stat-card" style={{ animationDelay: `${idx * 0.1}s` }}>
								<div className="stat-number">{stat.number}</div>
								<div className="stat-label">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="features-section">
				<div className="section-header">
					<h2 className="section-title">
						<span className="gradient-text">Why Choose</span> PetX?
					</h2>
					<p className="section-description">
						Experience the future of pet identification technology
					</p>
				</div>

				<div className="features-grid">
					{features.map((feature, idx) => (
						<div 
							key={idx} 
							className="feature-card"
							style={{ animationDelay: `${idx * 0.15}s` }}
						>
							<div className="feature-icon">{feature.icon}</div>
							<h3 className="feature-title">{feature.title}</h3>
							<p className="feature-description">{feature.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="cta-section">
				<div className="cta-content">
					<h2 className="cta-title">
						Ready to <span className="gradient-text">transform</span> your pet identification?
					</h2>
					<p className="cta-description">
						Join thousands of users who trust PetX for accurate, fast, and reliable predictions
					</p>
					<button 
						className="btn-primary large pulse-btn"
						onClick={() => navigate('/login')}
					>
						<span>Start Your Journey</span>
						<span className="btn-arrow">→</span>
					</button>
				</div>
			</section>

			{/* Footer */}
			<footer className="landing-footer">
				<div className="footer-content">
					<p>© 2024 PetX. Built with ❤️ and AI</p>
					<div className="footer-links">
						<a href="#" onClick={(e) => { e.preventDefault(); navigate('/login') }}>Login</a>
						<span>•</span>
						<a href="#" onClick={(e) => { e.preventDefault(); navigate('/upload') }}>Upload</a>
					</div>
				</div>
			</footer>
		</div>
	)
}

