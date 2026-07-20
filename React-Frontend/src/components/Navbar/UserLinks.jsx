import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'motion/react';
import { Link } from "react-router-dom";

const navLinkBaseClass = "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-pink-50 hover:text-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-400";

export default function UserLinks() {
    const [dropDownState, setDropDownState] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setDropDownState((prev) => !prev)}
                className="mx-2 inline-flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200"
                aria-expanded={dropDownState}
                aria-haspopup="menu"
            >
                <span className="flex h-8 items-center justify-center rounded-full bg-pink-200 px-2 text-sm font-bold text-pink-900">
                    Menu
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`h-4 w-4 transition-transform duration-200 ${dropDownState ? "rotate-180" : ""}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            <AnimatePresence>
                {dropDownState && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -12, scaleY: 0.95 }}
                        animate={{ opacity: 1, height: "auto", y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, height: 0, y: -12, scaleY: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ transformOrigin: "top" }}
                        className="absolute right-0 top-12 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                    >
                        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Account
                        </div>

                        <Link to="/history" className={`${navLinkBaseClass} mt-1`}>
                            <span>History</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </Link>

                        <Link to="/bookmarks" className={`${navLinkBaseClass} mt-1`}>
                            <span>Bookmarks</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                        </Link>

                        <div className="my-2 border-t border-slate-200" />

                        <Link to="/logout" className={`${navLinkBaseClass} text-red-600 hover:bg-red-50 hover:text-red-700`}>
                            <span>Logout</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
