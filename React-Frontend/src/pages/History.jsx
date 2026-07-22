import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

import SearchCard from '../components/SearchCard'

import './css/Common.css'

export default function History({ toastVersion, setToastVersion, toastContent, setToastContent }) {
    const [searches, setSearches] = useState([])
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
                    fromPage: 'History'
                })
                return
            }

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            const res = await fetch("http://localhost:8000/account/searches/", requestOptions)

            if (res?.status === 200) {
                const data = await res.json()
                setSearches(data)
                setIsFetching(false)
                return
            }
            setToastContent({
                message: "Something went wrong. Please try again later.",
                type: 'error',
                fromPage: 'History'
            })
        })()
    }, [])

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
                (searches?.length > 0 &&
                    <div className="m-10 col-span-2 shadow-2xl">
                        <div className="grid grid-cols-5 font-medium text-pink-950 bg-white border-b-2 border-blue-400 p-7">
                            <p className="text-xl">Search Date</p>
                            <p className="text-lg col-span-3">Search Query</p>
                            <p>Projects Length</p>
                        </div>
                        {searches.map((search) => <SearchCard key={search.timestamp} data={search} />)}
                    </div>
                )
            )
            }
            {(!isFetching && searches?.length === 0) ? (
                <div className='flex flex-col gap-5 w-full h-full justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 stroke-pink-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    <p className='font-stretch-ultra-expanded tracking-widest text-xl'>You have not searched for any projects yet.</p>
                </div>) : <></>}
        </motion.div>
    )
}
