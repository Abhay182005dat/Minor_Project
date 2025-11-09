import React, { useEffect, useState } from 'react'

export default function HistorySidebar() {
	const [items, setItems] = useState([])
	const refresh = () => {
		try {
			const raw = window.localStorage.getItem('petx:predictions')
			setItems(raw ? JSON.parse(raw) : [])
		} catch {
			setItems([])
		}
	}
	useEffect(() => {
		refresh()
		const onStorage = () => refresh()
		window.addEventListener('storage', onStorage)
		return () => window.removeEventListener('storage', onStorage)
	}, [])

	const onClear = () => {
		try {
			window.localStorage.removeItem('petx:predictions')
			refresh()
		} catch {}
	}

	return (
		<aside style={{ width: 260, borderRight: '1px solid color-mix(in oklab, CanvasText 12%, transparent)', padding: 12, height: '100%', overflowY: 'auto' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
				<strong>History</strong>
				<button className="btn" onClick={onClear}>Clear</button>
			</div>
			<div style={{ display: 'grid', gap: 8 }}>
				{items.length === 0 ? (
					<div className="muted">No predictions yet</div>
				) : (
					items.map((it) => (
						<div key={it._id} className="card" style={{ padding: 12, background: 'rgba(255, 255, 255, .04)' }}>
							<div style={{ fontWeight: 700 }}>{it.prediction ?? '—'}</div>
							<div className="muted" style={{ fontSize: 12 }}>{new Date(it.timestamp).toLocaleString()}</div>
							{it.confidence != null ? <div style={{ fontSize: 12 }}>Confidence: {it.confidence}</div> : null}
						</div>
					))
				)}
			</div>
		</aside>
	)
}


