import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/AuhSlice';

type LoginFormProps = {
    onSignup: () => void;
}

const LoginForm = ({onSignup}: LoginFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});


  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const signupOptions = [
    {id:1,option:'google',link:''},
    {id:2, option:'apple', link:''}
  ]

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]:value}))

    // clear error while typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleLogin = (e:React.FormEvent) =>{
    e.preventDefault();
    const validationError = validate();
    if(Object.keys(validationError).length > 0){
        setErrors(validationError);
        return;
    }
    dispatch(setUser({
        id:'',
        username:'',
        displayName:'',
        avatar:'',

    }))
   navigate('/');
    setFormData({
        email:'',
        password:''
    })
  }

  return (
    <div className="p-4 w-1/2 mx-10 rounded-2xl bg-gray-100">
      <h2 className="text-3xl">Login</h2>
      <p className="text-xs text-gray-700 mt-2">To Your Account</p>
      <form action="" className="space-y-5 mt-10" onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-800 ml-1">
            Email
          </label>
          <input
            type="text"
            name='email'
            value={formData.email}
            onChange={handleOnChange}
            className="p-3 border bg-white rounded-xl outline-0 w-full"
            placeholder="johnsnow@mail.com"
          />
           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-800 ml-1">
            Password
          </label>
          <div className="flex bg-white justify-between items-center outline-0 rounded-xl border">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleOnChange}
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
             {errors.email && <p className="text-red-500 text-sm">{errors.password}</p>}
          <p className="text-blue-600 self-end text-sm cursor-pointer mt-2">
            Forgot Password?
          </p>
        </div>

        {/* Button */}
        <button type='submit' className="bg-blue-700 text-white p-3 cursor-pointer w-full rounded-xl">
          Login
        </button>
      </form>
      <p className="text-gray-600 text-md w-full text-center my-6">
        Don't have an account?
        <span className="ml-2 cursor-pointer text-blue-500"
        onClick={onSignup}
        >Signin</span>
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

export default LoginForm;
