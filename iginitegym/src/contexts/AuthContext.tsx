import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "1",
          name: "diego da silva borges",
          email: "borges10002@gmail.com",
          avatar: "https://github.com/Borges10002.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
