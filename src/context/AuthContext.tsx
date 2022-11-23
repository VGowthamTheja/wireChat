import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

type AppContextInterface = {
  currentUser: User | null;
};

export const AuthContext = createContext<AppContextInterface>({
  currentUser: null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //context for loading
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, SetCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      SetCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
