import { motion } from "motion/react";

import Typer from "../components/Typer";
import "./css/Common.css";

export default function Home({
    toastVersion,
    setToastVersion,
    toastContent,
    setToastContent,
}) {
    const skills = [
        { label: "React", className: "left-0 top-0 rotate-[-8deg]" },
        { label: "Lua", className: "right-4 top-12 rotate-[6deg]" },
        { label: "Python", className: "left-16 top-32 rotate-[-4deg]" },
        { label: "C/C++", className: "right-12 top-40 rotate-[8deg]" },
        { label: "UI/UX", className: "left-8 bottom-10 rotate-[5deg]" },
        { label: "APIs", className: "right-0 bottom-0 rotate-[-3deg]" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="page-layout"
        >
            <div className="flex h-[calc(100vh-59px)] ml-50 mr-50 items-center">
                <div className="flex flex-col gap-5 w-5/7">
                    <h1 className="font-semibold text-7xl">Projects that</h1>
                    <Typer />
                    <p className="tracking-wide italic font-mono">
                        Tell us your skills, and choose from project ideas
                        tailored to you.
                    </p>
                    <p className="font-stretch-extra-expanded tracking-widest w-6/7">
                        Stuck? Have the skills but no projects to show them off.
                        Tired of scrolling through endless lists of projects?
                        Don&#x27;t worry &mdash; list your skills and we'll find
                        projects that suit you, so you can focus on implementing
                        rather than coming up with the idea
                    </p>
                </div>
                <div className="relative flex-1 hidden xl:flex items-center justify-center min-h-[420px]">
                    <div className="relative w-full max-w-[480px] h-[360px]">
                        {skills.map((skill) => (
                            <div
                                key={skill.label}
                                className={`absolute ${skill.className} bg-gray-200 text-red-700 px-4 py-2 text-lg font-semibold shadow-sm border border-gray-300`}
                            >
                                {skill.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center ml-30 mr-30 mb-30">
                <h2
                    className="text-5xl/20 font-bold m-5 w-1/2 text-pink-950"
                    style={{ fontFamily: "JetBrains Mono" }}
                >
                    Three steps to your next portfolio project
                </h2>
                <div className="bg-gray-200 p-10 gap-10">
                    <div className="border-b-2 border-gray-400 mb-5 pb-5 gap-4">
                        <code className="text-pink-950">01</code>
                        <h3 className="text-2xl font-semibold">
                            Select your stack
                        </h3>
                        <p>
                            Pick the languages, frameworks, and tools you
                            already know — or ones you want to learn.
                        </p>
                    </div>
                    <div className="border-b-2 border-gray-400 mb-5 pb-5 gap-4">
                        <code className="text-pink-950">02</code>
                        <h3 className="text-2xl font-semibold">
                            Get tailored ideas
                        </h3>
                        <p>
                            We surface projects that fit your skill set, with
                            enough stretch to make them worth building.
                        </p>
                    </div>
                    <div className="gap-4">
                        <code className="text-pink-950">03</code>
                        <h3 className="text-2xl font-semibold">
                            Start Building
                        </h3>
                        <p>
                            Each idea comes with scope guidance and talking
                            points so you can confidently discuss it in any
                            interview.
                        </p>
                    </div>
                </div>
            </div>
            <div className="ml-30 mr-30 mb-30">
                <div className="grid grid-cols-4 p-10 bg-pink-950 opacity-95 text-white">
                    <div className="border-r-2 border-gray-400 mb-5 pb-5 gap-5 pl-7 pr-7">
                        <h3 className="text-2xl font-semibold">
                            Tailored to you
                        </h3>
                        <p>
                            Enter or pick your skills and get project ideas that
                            actually match what you know.
                        </p>
                    </div>
                    <div className="border-r-2 border-gray-400 mb-5 pb-5 gap-5 pl-7 pr-7">
                        <h3 className="text-2xl font-semibold">Clear scope</h3>
                        <p>
                            Every idea comes with a difficulty, description, and
                            the exact skills you'll practice.
                        </p>
                    </div>
                    <div className="border-r-2 border-gray-400 mb-5 pb-5 gap-5 pl-7 pr-7">
                        <h3 className="text-2xl font-semibold">
                            Search history
                        </h3>
                        <p>
                            Revisit every skill combination you've searched so
                            you never lose a good lead.
                        </p>
                    </div>
                    <div className="gap-5 pl-7 pr-7">
                        <h3 className="text-2xl font-semibold">
                            Save favorites
                        </h3>
                        <p>
                            Bookmark the projects you love and keep your
                            shortlist ready to build.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
