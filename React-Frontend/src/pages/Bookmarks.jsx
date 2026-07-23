import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

import Card from '../components/Card'

import './css/Common.css'
import { fetchFavorites, addOrRemoveFavorite } from '../assets/api'

export default function Bookmarks({ toastVersion, setToastVersion, toastContent, setToastContent }) {
    const [favorites, setFavorites] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/login')
                setToastContent({
                    message: 'You need to be log in to access this page.',
                    type: 'error',
                    fromPage: 'Bookmarks'
                })
                return
            }

            const data = await fetchFavorites(token)

            if (data) {
                setFavorites(data)
                setIsFetching(false)
                return
            }
            setToastContent({
                message: "Something went wrong. Please try again later.",
                type: 'error',
                fromPage: 'Bookmarks'
            })
        })()
    }, [])

    const favoriteProj = async (id, state) => {
        const token = localStorage.getItem("token")
        if (token) {
            const done = await addOrRemoveFavorite(id, state, token)

            if (!done) {
                setToastContent({
                    message: "Something went wrong. Please try again later.",
                    type: 'error',
                    fromPage: 'Bookmarks'
                })
                throw new Error("");
            }
            return
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="page-layout"
        >
            {isFetching ? (
                <div className='flex flex-col gap-5 h-full col-span-2 flex items-center justify-center'>
                    <svg className="animate-spin h-5 w-5 stroke-pink-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className='font-stretch-ultra-expanded tracking-widest text-xl'>Loading, Please Wait.</p>
                </div>
            ) : (
                (favorites?.length > 0 &&
                    <div className="m-10 col-span-2">
                        {favorites.map((proj) => <Card key={proj.id} data={proj} favorite={favoriteProj} />)}
                    </div>
                )
            )
            }
            {(!isFetching && favorites?.length === 0) ? (
                <div className='flex flex-col gap-5 w-full h-full justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 stroke-pink-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    <p className='font-stretch-ultra-expanded tracking-widest text-xl'>You do not bookmarked any projects.</p>
                </div>) : <></>}
        </motion.div>
    )
}
