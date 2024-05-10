import { createContext, useState } from "react";
import { User } from "../models/models";

type StoreContextType = {
  user: User | null;
  authToken: string | null;
  setUser: (user: User) => void;
  setAuthToken: (authToken: string | null) => void;
};
export const UserStoreContext = createContext<StoreContextType>({
  user: null,
  authToken: null,
  setUser: () => {},
  setAuthToken: () => null,
});

export const UserStoreProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  return (
    <UserStoreContext.Provider
      value={{ user, authToken, setUser, setAuthToken }}
    >
      {children}
    </UserStoreContext.Provider>
  );
};