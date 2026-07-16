import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

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

	return (
		<BrowserRouter>
			<MessageToast {...toastContent} toastVersion={toastVersion} setToastContent={setToastContent} />
			<div className="bg-[url(./background.gif)] bg-fixed bg-no-repeat bg-cover min-h-screen">
				<Navbar />

				<AnimatedRoutes {...toastData} />
			</div>
		</BrowserRouter>
	)
}

export default App
