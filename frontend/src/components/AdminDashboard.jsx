import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function loadHistory() {
	try {
		const raw = window.localStorage.getItem('petx:predictions')
		const parsed = raw ? JSON.parse(raw) : []
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

export default function AdminDashboard() {
	const navigate = useNavigate()
	const [history, setHistory] = useState(loadHistory())

	useEffect(() => {
		const onStorage = () => setHistory(loadHistory())
		window.addEventListener('storage', onStorage)
		return () => window.removeEventListener('storage', onStorage)
	}, [])

	const stats = useMemo(() => {
		const total = history.length
		const byType = history.reduce((acc, h) => {
			const key = h.prediction || 'Unknown'
			acc[key] = (acc[key] || 0) + 1
			return acc
		}, {})
		const avg = total > 0 ? history.reduce((s, h) => s + (h.confidence || 0), 0) / total : 0
		const last7 = [...history]
			.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
			.slice(-7)
		return { total, byType, avg }
	}, [history])

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<h1>Admin Dashboard</h1>
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

			<div className="stats-grid">
				<div className="stat-card">
					<div className="stat-card-icon">📊</div>
					<div className="stat-card-content">
						<div className="stat-card-label">Total Predictions</div>
						<div className="stat-card-value">{stats.total}</div>
					</div>
				</div>
				<div className="stat-card">
					<div className="stat-card-icon">🎯</div>
					<div className="stat-card-content">
						<div className="stat-card-label">Average Confidence</div>
						<div className="stat-card-value">{(stats.avg * 100).toFixed(1)}%</div>
					</div>
				</div>
				{Object.entries(stats.byType).map(([k, v]) => (
					<div key={k} className="stat-card">
						<div className="stat-card-icon">{k === 'Fake' ? '🚫' : '✅'}</div>
						<div className="stat-card-content">
							<div className="stat-card-label">{k} Detections</div>
							<div className="stat-card-value">{v}</div>
						</div>
					</div>
				))}
			</div>

			<div className="chart-card">
				<h2>Predictions by Type</h2>
				<div className="chart-container">
					{Object.keys(stats.byType).length === 0 ? (
						<div className="chart-empty">No data</div>
					) : (
						Object.entries(stats.byType).map(([type, count]) => (
							<div key={type} className="chart-bar-item">
								<div className="chart-bar-label">
									<span className="chart-type-name">{type}</span>
									<span className="chart-count">{count}</span>
								</div>
								<div className="chart-bar-wrapper">
									<div className="chart-bar" style={{ width: `${(count / Math.max(...Object.values(stats.byType))) * 100}%`, backgroundColor: type === 'Fake' ? '#ef4444' : '#10b981' }} />
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}


