import Modal from "react-modal";

import imgProfile from "../assets/people.jpeg";
import { Eye, X } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useUsers } from "../hooks/useUsers";

interface CreateAccount {
  isOpen: boolean;
  handleCloseModal: () => void;
}

export function CreateAccount({ isOpen, handleCloseModal }: CreateAccount) {
  const { createUser, users } = useUsers();

  const [viewPassword, setViewPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleViewPassword() {
    viewPassword ? setViewPassword(false) : setViewPassword(true);
  }

  async function handleCreateNewUser(event: FormEvent) {
    event.preventDefault();

    const emailExists = users.find((user) => user.email === email);

    if (emailExists) {
      alert("Email ja em uso");
      return;
    }

    await createUser({
      name,
      email,
      password,
    });

    setName("");
    setEmail("");
    setPassword("");

    handleCloseModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <div className="top-0 absolute flex items-center justify-center h-screen bg-[#080808e1] w-full ">
        <form
          onSubmit={handleCreateNewUser}
          className="flex flex-col gap-1  w-[23rem] bg-indigo-900 p-7 rounded-md relative"
        >
          <X
            size={24}
            weight="bold"
            className=" text-gray-100 absolute top-4 right-3 cursor-pointer hover:text-gray-300 transition"
            onClick={() => handleCloseModal()}
          />
          <div className="flex flex-col items-center text-gray-50">
            Escolha uma foto de perfil:
            <label
              htmlFor="photo"
              tabIndex={1}
              className="mt-2 text-[.6rem] bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-800 py-9 px-1 rounded-md border-dashed border-2 border-indigo-600 focus:backdrop:outline-dashed focus:outline-2 focus:outline-violet-900 focus:outline-offset-2 cursor-pointer transition"
            >
              <span>Selecionar imagem</span>
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/"
              className="hidden"
            />
          </div>
          <label className="text-gray-50" htmlFor="name">
            Nome completo:
          </label>
          <input
            tabIndex={2}
            required
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            id="name"
            className="mb-3 px-3 py-2 rounded-md form-input border-violet-900 focus:border-violet-900"
          />
          <label className="text-gray-50" htmlFor="email">
            Email:
          </label>
          <input
            tabIndex={3}
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="email"
            className="mb-3 px-3 py-2 rounded-md form-input border-violet-900 focus:border-violet-900"
          />
          <label className="text-gray-50" htmlFor="password ">
            Senha:
          </label>
          <div className=" relative">
            <input
              tabIndex={4}
              required
              type={viewPassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              name="password"
              id="password"
              className="w-full mb-3 px-3 py-2 rounded-md form-input border-violet-900 focus:border-violet-900"
            />
            <Eye
              tabIndex={5}
              size={16}
              onClick={handleViewPassword}
              weight="bold"
              className="absolute top-3 right-3 text-violet-800 cursor-pointer hover:text-violet-400 transition"
            />
          </div>
          <button
            tabIndex={6}
            className="p-3 rounded-md bg-violet-500 hover:bg-violet-700 transition mt-4 text-gray-50"
          >
            Finalizar
          </button>
        </form>
      </div>
    </Modal>
  );
}
