import {
    createContext,
    useContext,
    PropsWithChildren,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
  } from "react";
import { ADMIN_API_URL } from "../assets/config";
  
  type AdminProps = {
    name: string;
    email: string;
    role: string;
  };
  
  type AdminContextProps = {
    admin: AdminProps;
    loading: boolean;
    setAdmin: Dispatch<SetStateAction<AdminProps>>;
  };
  
  const adminContext = createContext<AdminContextProps>({} as AdminContextProps);
  
  export const useAdmin = () => useContext(adminContext);
  
  export default function AdminProvider({ children }: PropsWithChildren) {
    const [admin, setAdmin] = useState({} as AdminProps);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // request admin using cookie and set the admin
      setLoading(true);
      const token = localStorage.getItem("access_token");
      fetch(`${ADMIN_API_URL}`, { method: "GET", headers: {
        "Authorization": "Bearer " + token as string
      } })
        .then(res => res.json())
        .then(d => {
          if (!d.error) setAdmin(d.data);
          setLoading(false);
          console.log(d?.data);
        })
        .catch(e => {
          setLoading(false);
          console.log(e)
        })
    }, [])
  
    return (
      <>
        <adminContext.Provider value={{admin, setAdmin, loading}}>
          {children}
        </adminContext.Provider>
      </>
    )
  }
  