import { useState } from 'react'
import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

import Card from '../components/Card'

import './css/Common.css'

export default function Recommend({ toastVersion, setToastVersion, toastContent, setToastContent }) {
    const location = useLocation()
    const [recommendedProjects, setRecommendedProjects] = useState(location.state ? location.state.projects : [])

    const fetchProjects = async (query) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = localStorage.getItem('token')
        if (token) {
            myHeaders.append("Authorization", "Bearer " + token);
        }

        const raw = JSON.stringify({
            "skills": query
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const res = await fetch("http://localhost:8000/recommend/", requestOptions).catch(() => { })

        let message = "Something went wrong. Please try again later."
        if (res?.status == 200) {
            const data = await res.json()
            setRecommendedProjects(data)
            return
        } else if (res?.status == 429) {
            const data = await res.json()
            const sec = data.detail.match(/(\d+)/)[0];

            const hours = Math.floor(sec / 3600);
            const minutes = Math.floor((sec % 3600) / 60);
            const seconds = sec % 60;
            const hDisplay = String(hours).padStart(2, '0');
            const mDisplay = String(minutes).padStart(2, '0');
            const sDisplay = String(seconds).padStart(2, '0');

            message = `Dialy Limit Reached. Reset in \n${hDisplay} hours ${mDisplay} minutes ${sDisplay} seconds`
        }

        setToastContent({
            message,
            type: 'error',
            fromPage: 'Recommend'
        })
        return
    }

    const favoriteProj = async (id, state) => {
        const token = localStorage.getItem("token")
        if (token) {
            const url = state ? "http://localhost:8000/account/add_favorite/" : "http://localhost:8000/account/remove_favorite/"
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            const raw = JSON.stringify({
                "project_id": id
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
            };

            const res = await fetch(url, requestOptions)

            if (!(res?.status === 201 || res?.status === 200)) {
                setToastContent({
                    message: "Something went wrong. Please try again later.",
                    type: 'error',
                    fromPage: 'Recommend'
                })
                throw new Error("");
            }
        }
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
