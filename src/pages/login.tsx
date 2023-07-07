import React, { useContext, useState } from "react";
import Masthead from "@/components/masthead";
import { AuthContext } from "@/components/auth-context";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event: any) => {
    event.preventDefault();

    if (email === "admin@mundodosbichos.com" && password === "admin") {
      setErrorMessage("");
      setIsAuthenticated(true);
    } else if (email !== "admin@mundodosbichos.com") {
      setErrorMessage("Email incorreto.");
    } else {
      setErrorMessage("Senha incorreta.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isAuthenticated) {
    return (
      <div>
        <Masthead />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-1">
          Mundo dos Bichos
        </h2>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <div className="relative">
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none transition ease-in-out duration-300"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </button>
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring transition-colors"
              type="submit"
            >
              Entrar
            </button>
            <a
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              href="/"
            >
              Esqueceu a Senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
