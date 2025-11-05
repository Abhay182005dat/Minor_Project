import React, { useCallback, useMemo, useRef, useState } from 'react'
import { predictWithFormData, warmUp } from '../services/api.js'
import { savePredictionToLocalHistory } from '../utils/history.js'
import './Uploader.css'

const DEFAULT_ENDPOINT = 'https://minor-project-petx.onrender.com/predictImage'
const ALT_ENDPOINT = 'https://minor-project-petx.onrender.com/predict'

export default function ImageUploader() {
	const [endpoint, setEndpoint] = useState(
		window.localStorage.getItem('petx:endpoint') || DEFAULT_ENDPOINT
	)
	const [status, setStatus] = useState('Waiting for action…')
	const [isLoading, setIsLoading] = useState(false)
	const [previewUrl, setPreviewUrl] = useState('')
	const fileInputRef = useRef(null)

	const fieldName = useMemo(() => (endpoint.endsWith('/predictImage') ? 'image' : 'file'), [endpoint])

	const onChooseClick = useCallback(() => {
		console.log(fileInputRef.current);
		fileInputRef.current?.click()
	}, [])

	const onFilesSelected = useCallback((files) => {
		if (!files || !files.length) return  
		const file = files[0]
		console.log(file);
		if (!file.type.startsWith('image/')) {
			setStatus('Please choose an image file.')
			return
		}
		const url = URL.createObjectURL(file)
		console.log(url);
		setPreviewUrl(url)
		setStatus('Ready to upload.')
	}, [])

	const onDrop = useCallback((e) => {
		e.preventDefault()
		const dt = e.dataTransfer
		if (dt && dt.files) {
			if (fileInputRef.current) fileInputRef.current.files = dt.files
			onFilesSelected(dt.files)
		}
	}, [onFilesSelected])

	const onDragOver = useCallback((e) => { e.preventDefault() }, [])

	const onClear = useCallback(() => {
		if (fileInputRef.current) fileInputRef.current.value = ''  // do not use fileInputRef.current=='null';
		setPreviewUrl('')
		setStatus('Cleared. Choose another image.')
	}, [])

	const onPredict = useCallback(async () => {
		const input = fileInputRef.current
		if (!input || !input.files || !input.files.length) {
			setStatus('Please select an image first.')
			return
		}
		const file = input.files[0]   //Takes first selected file
		const formData = new FormData()   //Creates a new FormData object to store the file
		console.log(fieldName);
		console.log(file);
		formData.append(fieldName, file)
		setIsLoading(true)
		setStatus('Warming backend and predicting...')
		try {
			
			await warmUp(endpoint)
			setStatus('Uploading and predicting...')
			const result = await predictWithFormData(endpoint, formData)
			const parts = []
			if (result && Object.prototype.hasOwnProperty.call(result, 'prediction')) parts.push(`Prediction: ${result.prediction}`)
			if (result && Object.prototype.hasOwnProperty.call(result, 'confidence')) parts.push(`Confidence: ${result.confidence}`)
			setStatus(parts.length ? parts.join('\n') : JSON.stringify(result, null, 2))  //result = { error: "Invalid file" }

			// Save to local history for admin dashboard
			if (result && result.prediction != null) {
				try {
					savePredictionToLocalHistory({
						prediction: result.prediction,
						confidence: result.confidence,
						metadata: { filename: file.name, type: file.type }
					})
				} catch {}
			}
		} catch (err) {
			setStatus(`Error: ${err.message || 'Something went wrong'}`)
		} finally {
			setIsLoading(false)
		}
	}, [fieldName, endpoint])

    return (
        <div className="uploader-card">
            <div className="uploader-header">
                <div>
                    <div className="uploader-title">Upload an image</div>
                    <div className="uploader-subtitle">PNG or JPG, up to 10MB</div>
                </div>
                <div className="uploader-endpoint">
                    <label htmlFor="endpointInput" className="uploader-endpoint-label">Endpoint</label>
                    <input
                        id="endpointInput"
                        className="uploader-input"
                        list="endpointOptions"
                        value={endpoint}
                        onChange={(e) => {
                            setEndpoint(e.target.value)
                            try { window.localStorage.setItem('petx:endpoint', e.target.value) } catch {}
                        }}
                        title="Enter full URL to your API endpoint"
                    />
                    <datalist id="endpointOptions">
                        <option value={DEFAULT_ENDPOINT}>/predictImage (field: image)</option>
                        <option value={ALT_ENDPOINT}>/predict (field: file)</option>
                    </datalist>
                </div>
            </div>

            <div
                id="dropzone"
                className={`uploader-dropzone${isLoading ? ' is-loading' : ''}`}
                onClick={onChooseClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
                role="button"
                title="Click to select or drag and drop"
            >
                {previewUrl ? (
                    <img id="previewImg" alt="preview" src={previewUrl} className="uploader-preview" />
                ) : (
                    <div className="uploader-dropzone-text">
                        <strong>Click to choose</strong> or drag & drop an image here
                        <div className="uploader-hint">PNG, JPG, JPEG</div>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => onFilesSelected(e.target.files)}
                />
            </div>

            <div className="uploader-actions">
                <button id="predictBtn" className="uploader-btn primary" onClick={onPredict} disabled={isLoading}>
                    {isLoading ? 'Predicting…' : 'Upload & Predict'}
                </button>
                <button id="clearBtn" className="uploader-btn" type="button" onClick={onClear} disabled={isLoading}>Clear</button>
            </div>

            <pre className="uploader-status" id="status">{status}</pre>
        </div>
    )
}


// When a user selects a file, the browser stores a "placeholder path" string in input.value, like:
// "C:\fakepath\my-image.jpg"
// The real path is hidden for security.

// Setting it to an empty string ('') tells the browser to forget the selected file. 
// It’s like clearing the selection, so the user can choose a file again.

// fileInputRef.current gives access to the real DOM node, allowing you to check which files are selected.