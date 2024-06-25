import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function useAuth() {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return { user, setUser };
}

export default useAuth;
