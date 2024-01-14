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
  loading: boolean;
  setUser: Dispatch<SetStateAction<UserProps>>;
};

const userContext = createContext<UserContextProps>({} as UserContextProps);

export const useUser = () => useContext(userContext);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({} as UserProps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // request user using cookie and set the user
    setLoading(true);
    fetch(`${USER_URL}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token as string
      }
    })
      .then(res => res.json())
      .then(d => {
        if (!d.error) setUser(d.user);
        setLoading(false);
        console.log(d?.user);
      })
      .catch(e => {
        setLoading(false);
        console.log(e)
      })
  }, [])

  return (
    <>
      <userContext.Provider value={{ user, loading, setUser }}>
        {children}
      </userContext.Provider>
    </>
  );
}
