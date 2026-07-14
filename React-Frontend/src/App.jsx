import React from 'react'
import { BrowserRouter } from 'react-router-dom';

import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar'

import './css/App.css'

function App() {
	return (
		<BrowserRouter>
			<div className="bg-[url(./background.gif)] bg-fixed bg-no-repeat bg-cover min-h-screen">
				<Navbar />

				<AnimatedRoutes />
			</div>
		</BrowserRouter>
	)
}

export default App
