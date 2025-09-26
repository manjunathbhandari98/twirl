import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type SignupFormProps = {
    onLogin: () => void;
}

const SignupForm = ({onLogin}:SignupFormProps) =>{
   const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const signupOptions = [
    {id:1,option:'google',link:''},
    {id:2, option:'apple', link:''}
  ]

  return (
    <div className="p-4 w-1/2 mx-10 my-10 py-10 h-full overflow-y-auto scrollbar-hide rounded-2xl bg-gray-100">
      <h2 className="text-3xl">Signup</h2>
      <form action="" className="space-y-5 mt-10">

        {/* Display Name */}
<div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-800 ml-1">
            Name
          </label>
          <input
          id="name"
          name="name"
            type="text"
            className="p-3 border bg-white rounded-xl outline-0 w-full"
            placeholder="John Snow"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-800 ml-1">
            Email
          </label>
          <input
          id="email"
          name="email"
            type="text"
            className="p-3 border bg-white rounded-xl outline-0 w-full"
            placeholder="johnsnow@mail.com"
          />
        </div>

        {/* password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-800 ml-1">
            Password
          </label>
          <div className="flex bg-white justify-between items-center outline-0 rounded-xl border">
            <input
              type={passwordVisible ? 'text' : 'password'}
              className="p-3 outline-0 w-full"
              placeholder="******"
            />
            <div
              onClick={togglePasswordVisibility}
              className="px-3 text-gray-700"
            >
              {!passwordVisible ? <EyeOff /> : <Eye />}
            </div>
          </div>
        </div>

        {/* confirm Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-800 ml-1">
            Confirm Password
          </label>
          <div className="flex bg-white justify-between items-center outline-0 rounded-xl border">
            <input
              type={passwordVisible ? 'text' : 'password'}
              className="p-3 outline-0 w-full"
              placeholder="******"
            />
            <div
              onClick={togglePasswordVisibility}
              className="px-3 text-gray-700"
            >
              {!passwordVisible ? <EyeOff /> : <Eye />}
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="bg-blue-700 text-white p-3 cursor-pointer w-full rounded-xl">
          Signup
        </button>
      </form>
      <p className="text-gray-600 text-md w-full text-center my-6">
        Already have an account?
        <span
        onClick={onLogin}
        className="ml-2 cursor-pointer text-blue-500">Login</span>
      </p>

      {/*  or with border */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="text-gray-500 font-medium whitespace-nowrap">
          Or with
        </span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google and apple Signup buttons */}
      <div className="grid sm:grid-cols-2 gap-2">
        {signupOptions.map((option) =>(
            <div key={option.id} className="flex p-2 cursor-pointer text-center gap-2 border rounded-2xl bg-white items-center justify-center">
                <img src={`${option.option}.png`} alt={option.option} className='w-7 h-7' />
                <h2>Signup with {option.option}</h2>
            </div>
        ))}
      </div>
    </div>
  );
};


export default SignupForm;