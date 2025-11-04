export function savePredictionToLocalHistory(entry) {
	try {
		const raw = window.localStorage.getItem('petx:predictions')
		const list = raw ? JSON.parse(raw) : []
		const newEntry = {
			_id: Date.now().toString(36),
			prediction: entry.prediction,
			confidence: entry.confidence,
			timestamp: new Date().toISOString(),
			metadata: entry.metadata || {}
		}
		const updated = [newEntry, ...list].slice(0, 200)
		window.localStorage.setItem('petx:predictions', JSON.stringify(updated))
		window.dispatchEvent(new Event('storage'))
	} catch {}
}


