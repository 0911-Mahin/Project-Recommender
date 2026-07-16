import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';

import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar'
import MessageToast from './components/MessageToast';

import './css/App.css'

function App() {
	const [toastVersion, setToastVersion] = useState(0)
	const [toastContent, setToastContent] = useState({
		message: "",
		type: "",
		fromPage: "",
	})
	const toastData = { toastVersion, setToastVersion, toastContent, setToastContent }

	const expiration_time = 4 * 60 * 1000
	const [expired, setExpired] = useState(false);

	const refresh_tokens = async () => {
		const refresh = localStorage.getItem('refresh')
		const res = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh })
		}).catch(() => { })

		if (res && res.status === 200) {
			const token = await res.json()
			localStorage.token = token.access
			localStorage.timestamp = Date.now()
		} else {
			localStorage.clear()
			window.dispatchEvent(new Event('authchange'))
			setExpired(true)
		}
	}

	const check_tokens = () => {
		const timestamp = localStorage.getItem('timestamp')
		if (timestamp && Date.now() - timestamp > expiration_time) {
			refresh_tokens();
		}
	}

	return (
		<BrowserRouter>
			<MessageToast {...toastContent} toastVersion={toastVersion} setToastContent={setToastContent} />
			<div className="bg-[url(./background.gif)] bg-fixed bg-no-repeat bg-cover min-h-screen" onClick={check_tokens} onKeyDown={check_tokens}>
				<Navbar />

				<AnimatedRoutes {...toastData} expired={expired} />
			</div>
		</BrowserRouter>
	)
}

export default App
