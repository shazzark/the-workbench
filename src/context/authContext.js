// src/context/authContext.js
import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
  loginWithGoogle: () => {},
  signUpWithEmail: () => {},
  signInWithEmail: () => {},
});
