import React, { useState } from "react";

interface DefaultState {
  token: null | string;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const DEFAULT_STATE: DefaultState = {
  token: null,
  setToken: () => {},
};

export const AuthContext = React.createContext(DEFAULT_STATE);

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<null | string>(null);

  const value = {
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
