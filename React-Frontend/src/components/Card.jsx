import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

const bgColors = {
    'beginner': 'bg-green-400/30',
    'intermediate': 'bg-blue-400/30',
    'advanced': 'bg-pink-900/30',
    'expert': 'bg-pink-950/30'
}
const textColors = {
    'beginner': 'text-green-800',
    'intermediate': 'text-blue-800',
    'advanced': 'text-pink-900',
    'expert': 'text-pink-950'
}

export default function ({ data, favorite }) {
    const [dropState, setDropState] = useState(false)
    const [isFavorited, setIsFavorited] = useState(data.is_favorited)

    const whenFavoritted = async (e) => {
        e.stopPropagation()
        await favorite(data.id, !isFavorited)
        setIsFavorited((prev) => !prev)
    }

    return (
        <div className="p-8 bg-white shadow-lg border-b-2 border-pink-950 mx-1">
            <div onClick={(e) => data.description ? setDropState((prev) => !prev) : null} className={`mb-2 ${data.description ? 'cursor-pointer' : ''} flex flex-row items-center gap-5`}>
                <div className={`transition-transform duration-300 ${dropState ? "-rotate-180" : ""} ${data.description ? '' : 'invisible'} hover:bg-gray-300 rounded-full p-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='size-6'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <div className="flex gap-2 place-content-between">
                        <h1 className="text-xl font-medium">{capatalize(data.title)}</h1>
                        <code className={`h-fit w-fit p-1 pb-0 text-xs ${bgColors[data.difficulty.toLowerCase()]} ${textColors[data.difficulty.toLowerCase()]}`}>{capatalize(data.difficulty)}</code>
                    </div>
                    <div className="flex gap-2 place-content-between items-center">
                        <div className="flex flex-wrap gap-4 h-fit">
                            {data.skills_required.map((skill) => <code key={skill} className={`text-xs p-2 pb-1 ${bgColors[data.difficulty.toLowerCase()]}`}>{skill}</code>)}
                        </div>
                        <svg onClick={whenFavoritted} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 stroke-pink-900 ${isFavorited ? 'fill-blue-400' : 'hover:fill-blue-200'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <AnimatePresence initial={false}>
                {dropState && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden "
                    >
                        <p className="pt-5 px-5">{data.description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function capatalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}
