import React, {useContext, useEffect, useState} from "react";
import Masthead from "@/components/masthead";
import {AuthContext} from "@/components/auth-context";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/all";


export const Auth = () => {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [error, setError] = useState<string>();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleAuth = (event: any) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    };

    const validateEmail = (email: string) => {
        if (email === "") return;
        if (!email.includes("@")) {
            return "O email inserido não tem @.";
        }
        if (!email.includes(".com")) {
            return "O email inserido não tem .com!";
        }
        return null;
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const emailError = validateEmail(formData.email);
        if (emailError) {
            setError(emailError);
            return;
        }
        if (formData.email === "" && formData.password === "") return;

        // if (formData.email === "admin@mundodosbichos.com" && formData.password === "admin123") {
        if (formData.email === "a@a.com" && formData.password === "admin123") {
            setIsAuthenticated(true);
            setError("")
        } else if (formData.email !== "test@test.com") {
            setError("O email está incorreto!");
        } else {
            setError("A senha está incorreta!");
        }
    };

    useEffect(() => {
        console.log("ALOUUU")
    })

    if (isAuthenticated) {
        return (
            <div>
                <Masthead/>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mt-4">Página de Login</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <label htmlFor="email" className="block mb-2">
                    Email
                    <input
                        type="email"
                        id="email"
                        placeholder="Insira seu Email"
                        value={formData.email}
                        onChange={handleAuth}
                        className="block w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    />
                </label>
                <div className="flex">
                    <label htmlFor="password" className="block mb-2 flex-grow">
                        Palavra-chave
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Insira sua senha"
                            value={formData.password}
                            onChange={handleAuth}
                            className="block w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        />
                    </label>
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="ml-2 mt-6"
                    >
                        {showPassword ? <AiFillEye size={20}/> : <AiFillEyeInvisible size={20}/>}
                    </button>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Login
                    </button>
                </div>
            </form>
            {error && <span className="text-red-500 mt-2">{error}</span>}
        </div>
    );
};

export default Auth;
