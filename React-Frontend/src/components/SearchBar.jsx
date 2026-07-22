import { useMemo, useState } from 'react';

import skills from './assets/Skill.json';

function normalizeSkillName(value) {
    return value.trim().toLowerCase();
}

export default function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const filteredSkills = useMemo(() => {
        const query = normalizeSkillName(searchText);

        const baseSkills = query
            ? skills.filter((skill) => normalizeSkillName(skill.name).includes(query))
            : skills;

        return baseSkills
            .filter((skill) => !selectedSkills.some(
                (selected) => normalizeSkillName(selected) === normalizeSkillName(skill.name)
            ))
            .slice(0, 30);
    }, [searchText, selectedSkills]);

    const addSkill = (skillName) => {
        const addSkills = skillName.split(',').map((skill) => skill.trim());

        setSelectedSkills((prev) => {
            let i = 0
            while (i < addSkills.length) {
                const skill = addSkills[i]
                const alreadyAdded = prev.some(
                    (exist_skill) => normalizeSkillName(exist_skill) === normalizeSkillName(skill)
                );
                if (alreadyAdded) {
                    addSkills.splice(i, 1)
                } else {
                    i++
                }
            }

            const nextSkills = prev.concat(addSkills);
            return nextSkills;
        });

        setSearchText('');
    };

    const removeSkill = (skillName) => {
        setSelectedSkills((prev) => {
            const nextSkills = prev.filter(
                (skill) => normalizeSkillName(skill) !== normalizeSkillName(skillName)
            );
            return nextSkills;
        });
    };

    const handleSearch = async (e) => {
        const query = selectedSkills.join(', ')
        if (query) {
            setIsLoading(true)
            e.preventDefault();
            await onSearch(query);
            setIsLoading(false)
        }
    };

    return (
        <div className="m-10 flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border-2 border-blue-900/40 bg-white p-4 shadow-2xl">
            <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold tracking-wide text-pink-900">
                    Your skills
                </h3>
                <div className="flex flex-wrap gap-2">
                    {selectedSkills.length === 0 ? (
                        <p className="text-sm text-slate-500">No skills selected yet.</p>
                    ) : (
                        selectedSkills.map((skill) => (
                            <button
                                key={skill}
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="flex items-center cursor-pointer gap-2 rounded-lg border border-pink-900 px-3 py-2 text-sm from-pink-200 to-cyan-50 bg-linear-135"
                            >
                                <span>{skill}</span>
                                <span className="text-xs">×</span>
                            </button>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-2 flex min-h-0 flex-1 flex-col">
                <h3 className="mb-2 text-sm font-semibold tracking-wide text-pink-900">
                    Add skills
                </h3>
                <div className="flex min-h-[120px] flex-1 flex-wrap content-start gap-3 overflow-hidden">
                    {filteredSkills.map((skill) => (
                        <button
                            key={skill.id}
                            type="button"
                            onClick={() => addSkill(skill.name)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-blue-400 bg-linear-135 from-cyan-100 to-pink-50 px-3 py-2 text-sm"
                        >
                            <span>+</span>
                            <span>{skill.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); addSkill(searchText) }} className="mb-4 flex w-full gap-2">
                <input
                    name="query"
                    type="text"
                    placeholder="Search skills..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="h-fit w-full border border-slate-300 bg-white p-2 font-medium text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button
                    type="submit"
                    className="flex flex-row items-center gap-1 rounded-md bg-pink-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-pink-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add
                </button>
            </form>

            <button onClick={handleSearch} className="mt-4 w-full bg-pink-900 hover:bg-pink-800 active:bg-pink-700 p-2 text-white flex flex-row justify-center gap-5">
                {isLoading && <svg className="animate-spin h-5 w-5 stroke-pink-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
                <p>Search</p>
            </button>
        </div>
    );
}
