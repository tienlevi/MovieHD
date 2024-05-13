import { useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function useAuthStageChange() {
  const [user, setUser] = useState<any>({});

  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });

  return { user, setUser };
}

export default useAuthStageChange;
