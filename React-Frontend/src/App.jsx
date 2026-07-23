import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';

import { refreshTokens } from './assets/api';
import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar/Navbar'
import MessageToast from './components/MessageToast';

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

	const check_tokens = async () => {
		const timestamp = localStorage.getItem('timestamp')
		if (timestamp && Date.now() - timestamp > expiration_time) {
			const token = await refreshTokens()
			if (token) {
				localStorage.token = token
				localStorage.timestamp = Date.now()
			} else {
				localStorage.clear()
				window.dispatchEvent(new Event('authchange'))
				setExpired(true)
			}
		}
	}

	return (
		<BrowserRouter>
			<MessageToast {...toastContent} toastVersion={toastVersion} setToastContent={setToastContent} />
			<div className="bg-gray-50 min-h-screen" onClick={check_tokens} onKeyDown={check_tokens}>
				<Navbar />

				<AnimatedRoutes {...toastData} expired={expired} />
			</div>
		</BrowserRouter>
	)
}

export default App
