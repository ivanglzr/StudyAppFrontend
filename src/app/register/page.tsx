"use client";

import { clearAccessToken, getAccessToken } from "@/services/cookies";
import { register } from "@/services/auth/auth.service";
import { useState } from "react";
import { IRegister } from "@/interfaces/auth.interfaces";

export default function Home() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
      fullname: formData.get("fullname"),
    };

    if (!loginData.email || !loginData.password || !loginData.fullname) {
      setError("There is missing data");
      return;
    }

    const newMessage = await register(loginData as IRegister);

    setMessage(newMessage ?? "");
  };

  const handleClick = async () => {
    const newAccessToken = await getAccessToken();

    console.log(newAccessToken);

    setAccessToken(newAccessToken);
  };

  return (
    <>
      <span>Message: {message}</span> <br />
      <form className="m-16" onSubmit={handleLogin}>
        <div className="form-group flex flex-col">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="border-2 border-black"
          />
        </div>
        <div className="form-group flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-2 border-black"
          />
        </div>

        <div className="form-group form-group flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 border-black"
          />
        </div>
        {error && <span className="text-red-800">{error}</span>}
        <button className="block" type="submit">
          Log In
        </button>
      </form>
      <button className="block" onClick={clearAccessToken}>
        Log out
      </button>
      <button onClick={handleClick}>Get Token</button>
      {accessToken}
    </>
  );
}
