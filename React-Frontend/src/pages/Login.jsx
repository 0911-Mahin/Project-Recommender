import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./css/Common.css";

const baseInputStyle =
    "p-2 outline valid:outline-green-400 valid:text-cyan-800 focus:outline-sky-500 focus:invalid:border-pink-500";

export default function Login({
    toastVersion,
    setToastVersion,
    toastContent,
    setToastContent,
}) {
    const [touched, setTouched] = useState({
        username: false,
        password: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToastContent({
                message: "You are already signed in.",
                type: "info",
                fromPage: "Login",
            });
            navigate("/recommend");
        }
    }, [navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        if (!form.checkValidity()) {
            setTouched({ username: true, password: true });
            return;
        }

        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");

        const res = await fetch("http://localhost:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).catch(() => { });

        let message = "Something went wrong. Please try again later.";
        let type = "error";
        if (res && res.status === 200) {
            const tokens = await res.json();
            localStorage.clear();
            localStorage.setItem("token", tokens.access);
            localStorage.setItem("refresh", tokens.refresh);
            localStorage.setItem("timestamp", JSON.stringify(Date.now()));
            window.dispatchEvent(new Event("authchange"));
            setToastContent({
                message: "Login successful!",
                type: "info",
                fromPage: "Login",
            });
            navigate("/recommend");
            return;
        } else if (res && res.status === 401) {
            const err = await res.json();
            message = err.detail;
            type = "error";
        }

        setToastContent({
            message,
            type,
            fromPage: "Login",
        });
        setToastVersion((prev) => prev + 1);

        return;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="page-layout flex justify-center items-center bg-linear-320 from-cyan-50 to-pink-50"
        >
            <form
                onSubmit={handleSubmit}
                autoComplete="on"
                noValidate
                className="gap-4 bg-white p-10 flex flex-col justify-center items-center h-fit border-2 border-pink-900 shadow-2xl"
            >
                <h1 className="text-4xl font-semibold">Login</h1>
                <p className="pb-2 invisible h-0">Log in to see your saved projects and matches.</p>
                <div className="flex flex-col gap-4 w-full">
                    <span className="text-lg mt-1">Username:</span>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            name="username"
                            placeholder="sample_1798"
                            className={`${baseInputStyle} peer/username ${touched.username ? "invalid:border-pink-800 invalid:text-pink-800 focus:invalid:outline-pink-800" : ""}`}
                            required
                            onBlur={() =>
                                setTouched((prev) => ({
                                    ...prev,
                                    username: true,
                                }))
                            }
                            onChange={() =>
                                setTouched((prev) => ({
                                    ...prev,
                                    username: true,
                                }))
                            }
                        />
                        <p
                            className={`text-pink-900 invisible ${touched.username ? "peer-invalid/username:visible" : ""}`}
                        >
                            Please enter a username.
                        </p>
                    </div>
                    <span className="text-lg mt-1">Password:</span>
                    <div className="flex flex-col">
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            className={`${baseInputStyle} peer/password ${touched.password ? "invalid:border-pink-800 invalid:text-pink-800 focus:invalid:outline-pink-800" : ""}`}
                            required
                            onBlur={() =>
                                setTouched((prev) => ({
                                    ...prev,
                                    password: true,
                                }))
                            }
                            onChange={() =>
                                setTouched((prev) => ({
                                    ...prev,
                                    password: true,
                                }))
                            }
                        />
                        <p
                            className={`text-pink-900 invisible ${touched.password ? "peer-invalid/password:visible" : ""}`}
                        >
                            Please enter a password.
                        </p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white bg-pink-900 hover:bg-pink-800 active:bg-pink-700 p-3 w-1/2 font-semibold"
                >
                    Log - In
                </button>
                <p>
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-400 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </motion.div>
    );
}
