import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

type AppContextInterface = {
  currentUser: User | null;
  spinner: boolean;
  setSpinner: (arg0: boolean) => void;
};

function dummySpinner() {
  return;
}

export const AuthContext = createContext<AppContextInterface>({
  currentUser: null,
  spinner: false,
  setSpinner: dummySpinner,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, SetCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      SetCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  //context for loading spinner
  const [spinner, setSpinner] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ currentUser, setSpinner, spinner }}>
      {children}
    </AuthContext.Provider>
  );
};
