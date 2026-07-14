import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Recommend from './pages/Recommend'
import History from './pages/History'
import Bookmarks from './pages/Bookmarks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Logout from './pages/Logout'

import './css/App.css'

function App() {
	return (
		<BrowserRouter>
			<div className="bg-[url(./background.gif)] bg-fixed bg-no-repeat bg-cover min-h-screen">
				<Navbar />

				<Routes className="route-wrapper">
					<Route className="page" path="/" element={<Home />} />
					<Route className="page" path="/recommend" element={<Recommend />} />
					<Route className="page" path="/history" element={<History />} />
					<Route className="page" path="/bookmarks" element={<Bookmarks />} />

					<Route className="page" path="/login" element={<Login />} />
					<Route className="page" path="/signup" element={<SignUp />} />
					<Route className="page" path="/logout" element={<Logout />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
