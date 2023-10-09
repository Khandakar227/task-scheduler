import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { USER_URL } from "../assets/config";

type UserProps = {
  username: string;
  email: string;
  profileUrl: string;
};

type UserContextProps = {
  user: UserProps;
  setUser: Dispatch<SetStateAction<UserProps>>;
};

const userContext = createContext<UserContextProps>({} as UserContextProps);

export const useUser = () => useContext(userContext);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({} as UserProps);

  useEffect(() => {
    // request user using cookie and set the user
    fetch(`${USER_URL}`, { method: "GET", credentials: "include" })
      .then(res => res.json())
      .then(d => {
        if (d.error) return;
        setUser(d.user)
      })
      .catch(e => console.log(e))
    
  }, [])

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        {children}
      </userContext.Provider>
    </>
  );
}
