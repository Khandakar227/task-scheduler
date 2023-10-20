import { PropsWithChildren, useEffect } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";

interface RouteGuardProps extends PropsWithChildren {
    for?: 'admin' | null;
}

export default function AuthGuard(props: RouteGuardProps) {
    const { loading, admin } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if(props.for == 'admin') {
            if(!admin?.name) navigate("/");
        } else {
            if(admin?.name) navigate("/");
        }
    }, [admin, loading, props.for])

    if(loading) return (<><p className="text-center p-4">Loading...</p></>)
    
    return (
    <>
        {props.children}
    </>
  )
}
