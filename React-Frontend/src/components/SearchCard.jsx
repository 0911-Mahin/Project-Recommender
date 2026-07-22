import { useNavigate } from "react-router-dom"

export default function SearchCard({ data }) {
    const navigate = useNavigate()

    const onSelect = (e) => {
        navigate('/recommend', { state: { query: data.query, projects: data.projects } })
    }

    return (
        <div className="grid grid-cols-5 bg-white border-b-2 border-pink-900 p-7 items-center">
            <p className="text-sm text-gray-500">{data.timestamp}</p>
            <p className="text-lg truncate overflow-hidden col-span-3">{data.query}</p>
            <div className="flex justify-between items-center">
                <p>{data.projects.length}</p>
                <div onClick={onSelect} className="hover:bg-gray-300 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
