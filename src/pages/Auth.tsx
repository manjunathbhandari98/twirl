import { DotIcon } from "lucide-react";
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

const Dot = () => {
  return (
    <span className="inline-block mx-2">
      <DotIcon size={40} className="text-green-500 animate-pulse" />
    </span>
  );
};

const Auth = () =>{
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () =>{
        setIsLogin(prev => !prev)
    }

    return(
        <div
        className="flex gap-5 items-center h-screen"
        >
            {/* Left side Logo and Tagline */}
            <div className="w-1/2 p-3 flex flex-col justify-center items-center">
                    <img src="/twirl-logo.png" alt="logo" className="" />
                     <div className="flex items-center font-bold text-xl md:text-2xl text-gray-900">
      <span className="mr-2">Twirl it</span>
      <Dot />
      <span className="mx-2">See it</span>
      <Dot />
      <span className="ml-2">Live it</span>
      <Dot />
    </div>
            </div>
            
                 {/* Login/Signup Form */}
            {isLogin ? (
                
              <LoginForm onSignup = {toggleForm}/>
            ) : (
                <SignupForm onLogin = {toggleForm}/>
            )}
            </div>
           
    )
}

export default Auth