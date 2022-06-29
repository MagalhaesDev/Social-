import { createContext, ReactNode, useContext, useState } from "react";
import { isUuid } from "uuidv4";
import { api } from "../services/api";

interface TransactionsProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UserInput = Omit<User, "id">;

interface UsersContextData {
  users: User[];
  createUser: (userInput: UserInput) => Promise<void>;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: TransactionsProviderProps) {
  const [users, setUsers] = useState<User[]>(() => {
    const storageUser = localStorage.getItem("@Social+:user");

    if (storageUser) {
      return JSON.parse(storageUser);
    }

    return [];
  });

  async function createUser(userInput: UserInput) {
    const response = await api.post("users", {
      ...userInput,
      id: isUuid,
    });

    const { user } = response.data;
    const updateUser = [...users, user];
    setUsers(updateUser);
    localStorage.setItem("@Social+:user", JSON.stringify(updateUser));
  }

  return (
    <UsersContext.Provider value={{ users, createUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);

  return context;
}
