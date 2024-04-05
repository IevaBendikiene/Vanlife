import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!AuthContext) {
    throw Error("useAuthContext has to be inside AutContextProvider");
  }
  return context;
};
