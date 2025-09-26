import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store";

interface PrivateRoutesProps {
children:ReactNode
}

const PrivateRoutes = ({children}: PrivateRoutesProps) =>{
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

    if(!isAuthenticated) {
      return  <Navigate to={'/auth'} replace/>
    }

    return <>{children}</>
}

export default PrivateRoutes;