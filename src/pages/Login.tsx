import React, { useState } from "react";

type Login = {
  email: string;
  password: string;
};

const PasswordIcon = {
  show: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  ),
  hide: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  ),
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-indigo-100 h-svh flex items-center justify-center">
      <form
        action=""
        className="flex flex-col p-8 border-2 border-indigo-600 rounded-md shadow-md bg-indigo-50"
      >
        <h1 className="text-2xl text-center font-primaryFont text-indigo-600 mb-8">
          Welcome to StoryBuddy 👋
        </h1>
        <label
          htmlFor="email"
          className="text-md pb-2 font-secondaryFont font-semibold"
        >
          Email
        </label>
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your email..."
          className="rounded-full text-lg font-primaryFont p-3 indent-1 placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-full"
        />
        <label
          htmlFor="password"
          className="text-md pt-2 mt-4 font-secondaryFont font-semibold"
        >
          Password
        </label>
        <div className="relative w-full">
          <div
            className="absolute inset-y-0 right-0 top-2  flex items-center px-2"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            <label
              className="hover:bg-gray-400 px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer rounded-full"
              htmlFor="toggle"
            >
              {showPassword ? PasswordIcon["hide"] : PasswordIcon["show"]}
            </label>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name=""
            id=""
            placeholder="Enter your password..."
            className="rounded-full mt-2 p-3 indent-1 placeholder-slate-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none text-lg font-primaryFont w-full "
          />
        </div>
        <div className="flex mt-8">
          <button className="w-full text-xl hover:text-indigo-500 transition-all duration-300">
            Register
          </button>
          <button className="rounded-full text-xl border-slate-600 border-2 p-3 hover:bg-indigo-500 text-slate-900 w-full mb-1 disabled:pointer-events-none  hover:text-white transition-all duration-300">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
