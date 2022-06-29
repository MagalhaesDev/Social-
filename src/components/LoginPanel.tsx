import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import socialImg from "../assets/social.jpg";
import { useUsers } from "../hooks/useUsers";
import { CreateAccount } from "./CreateAccount";

export function LoginPanel() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { users } = useUsers();

  const [msgEmailError, setMsgEmailError] = useState(true);
  const [msgPasswordError, setMsgPasswordError] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!loading && localStorage.getItem("token") !== null) {
      navigate("/home");
    }
  }, [loading, navigate]);

  function handleViewPassword() {
    viewPassword ? setViewPassword(false) : setViewPassword(true);
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function autenticationUser(event: FormEvent) {
    event.preventDefault();

    const emailExists = users.find((user) => user.email === email);
    const passwordExists = users.find((user) => user.password === password);

    if (emailExists) {
      setMsgEmailError(true);
    } else {
      setMsgEmailError(false);
    }

    if (passwordExists) {
      setMsgPasswordError(true);
    } else {
      setMsgPasswordError(false);
    }

    if (emailExists && passwordExists) {
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem("token", "token");
        setLoading(false);
      }, 2000);
    }
  }

  return (
    <div className="flex ">
      <div className=" h-screen">
        <img
          className="h-screen "
          src={socialImg}
          alt="Imagem escrito Social"
        />
      </div>
      <header className="flex-1 flex flex-col items-center py-12 px-10 gap-12">
        <h1 className="text-4xl text-violet-800">Social +</h1>
        <form
          onSubmit={autenticationUser}
          className="flex flex-col mt-12 gap-1"
        >
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            name="email"
            id="email"
            className=" px-3 py-1 rounded-md form-input border-violet-900 focus:border-violet-900"
          />
          <span
            className={
              msgEmailError
                ? "text-xs mb-3 text-red-700 hidden"
                : "text-xs mb-3 text-red-700"
            }
          >
            Email incorreto
          </span>
          <label htmlFor="password">Senha</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={viewPassword ? "text" : "password"}
            name="password"
            id="password"
            className=" px-3 py-1 rounded-md form-input border-violet-900 focus:border-violet-900"
          />
          <span
            className={
              msgPasswordError
                ? "text-xs mb-3 text-red-700 hidden"
                : "text-xs mb-3 text-red-700"
            }
          >
            Senha incorreta
          </span>

          <label
            htmlFor="pass-view "
            className=" flex items-center text-violet-900 "
          >
            <input
              type="checkbox"
              name="pass-view"
              onClick={handleViewPassword}
              id="pass-view"
              className="mr-2 form-checkbox border-violet-800 rounded-xl checked:bg-violet-900 outline-violet-900"
            />
            Mostrar senha
          </label>

          <button
            type="submit"
            className="form-submit bg-violet-800 text-stone-100 p-2 mt-3 hover:bg-violet-900 md:transition-all"
          >
            Login
          </button>
          <a
            className="underline text-center cursor-pointer hover:text-gray-500 transition"
            onClick={() => handleOpenModal()}
          >
            Criar uma nova conta
          </a>
        </form>
      </header>
      <CreateAccount isOpen={isOpen} handleCloseModal={handleCloseModal} />
    </div>
  );
}
