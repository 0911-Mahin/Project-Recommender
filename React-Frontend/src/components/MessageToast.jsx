import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

const colorBGMappings = {
    success: 'bg-green-600',
    info: 'bg-sky-500',
    error: 'bg-pink-900',
}

const colorTextMappings = {
    success: 'text-green-600',
    info: 'text-sky-500',
    error: 'text-pink-900',
}

export default function MessageToast({ message = "", type = "", fromPage = "", toastVersion = 0, setToastContent }) {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!message) return
        setVisible(true)

        const afterDelay = () => {
            setVisible(false)
            if (typeof setToastContent === 'function') {
                setToastContent({ message: "", type: "", fromPage: "" })
            }
        }

        const timer = setTimeout(afterDelay, 7000)
        return () => clearTimeout(timer)
    }, [message, type, fromPage, toastVersion, navigate, setToastContent])

    return (
        <AnimatePresence mode='popLayout'>
            {(visible && message) ? <motion.div
                initial={{ y: "200%" }}
                animate={{ y: 0 }}
                exit={{ y: "200%" }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="fixed inset-x-0 bottom-6 z-[9999] flex justify-center pointer-events-none">
                <div
                    className="pointer-events-auto bg-white max-w-sm mx-2 shadow-xl">
                    <div className="bg-white flex flex-row gap-4 m-3">
                        <p className={"font-bold " + colorTextMappings[type]}>{fromPage}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                        <p>{message}</p>
                    </div>
                    <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 7, ease: 'easeInOut' }}
                        className={"h-1 " + colorBGMappings[type]} />
                </div>
            </motion.div> : null}
        </AnimatePresence>
    )
}
