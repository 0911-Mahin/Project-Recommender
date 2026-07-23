import { useState } from 'react'
import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

import Card from '../components/Card'

import './css/Common.css'
import { addOrRemoveFavorite, recommendProjects } from '../assets/api'

export default function Recommend({ toastVersion, setToastVersion, toastContent, setToastContent }) {
    const location = useLocation()
    const [recommendedProjects, setRecommendedProjects] = useState(location.state ? location.state.projects : [])

    const fetchProjects = async (query) => {
        const data = await recommendProjects(query)
        if (typeof data == 'string') {
            setToastContent({
                message: data,
                type: 'error',
                fromPage: 'Recommend'
            })
        } else {
            setRecommendedProjects(data)
        }
    }

    const favoriteProj = async (id, state) => {
        const token = localStorage.getItem("token")
        if (token) {
            const done = await addOrRemoveFavorite(id, state, token)

            if (!done) {
                setToastContent({
                    message: "Something went wrong. Please try again later.",
                    type: 'error',
                    fromPage: 'Recommend'
                })
                throw new Error("");
            }
            return
        }
        setToastContent({
            message: "Login to bookmark projetcs",
            type: 'error',
            fromPage: 'Recommend'
        })
        throw new Error("");
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="page-layout grid grid-cols-3"
        >
            <SearchBar onSearch={fetchProjects} />
            {recommendedProjects.length > 0 ? (
                <div className="m-10 col-span-2">
                    {recommendedProjects.map((proj) => <Card key={proj.id} data={proj} favorite={favoriteProj} />)}
                </div>
            ) : (
                <div className='flex flex-col gap-5 col-span-2 flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-pink-900 size-20" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <p className='font-stretch-ultra-expanded tracking-widest text-xl'>Enter your skills to start searching</p>
                </div>
            )
            }
        </motion.div>
    )
}
