"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const FormVerify = () => {
  const [code, setCode] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const imageId = localStorage.getItem("avatarId");

    const img = `https://robohash.org/${imageId}.png`;

    const res = await fetch("http://localhost:4000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, email, name, img }),
    });

    const data = await res.json();
    if (res.ok) {
      setCookie("user", data.token, {
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      alert("Авторизация прошла успешно!");
      window.location.href = "/chat";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="bg-image min-h-screen  flex items-center justify-center px-4">
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%] md:w-2/3 lg:w-2/5">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm mx-auto flex flex-col justify-center items-center gap-5"
          >
            <h2 className="text-2xl font-semibold text-[#0088cc] text-center">
              Введите код
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Мы отправили 6-значный код на вашу почту
            </p>
            {email ? (
              <p className="text-center text-[#4a4e50] font-medium break-all">
                {email}
              </p>
            ) : (
              <p className="text-center text-red-500 font-medium">
                Email не найден
              </p>
            )}
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Введите код"
              className="w-full text-center text-2xl tracking-widest bg-[#f9f9f9] rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#0088cc] transition-all shadow-inner"
              required
            />
            <button
              type="submit"
              className="mt-4 w-full bg-[#0088cc] text-white text-lg font-medium py-2 rounded-xl hover:bg-[#007ab8] transition-all"
            >
              Подтвердить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormVerify;
