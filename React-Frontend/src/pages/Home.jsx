import { motion } from "motion/react"
import { Link } from 'react-router-dom';

import './css/Common.css'

export default function Home({ toastVersion, setToastVersion, toastContent, setToastContent }) {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="page-layout"
        >
            <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center text-white gap-5 bg-sky-300/30 p-15 rounded-sm backdrop-contrast-50">
                    <h1 className="font-semibold text-[2.7rem]">Projects that matter</h1>
                    <p className="tracking-wide italic font-mono">Tell us your skills, and choose from project ideas tailored to you.</p>
                    <Link type="button" to="/recommend" className="bg-purple-600 rounded-sm p-3 active:bg-purple-800" viewTransition>Get Started</Link>
                </div>
            </div>
        </motion.div>
    )
}
