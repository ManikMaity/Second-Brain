import React, { useState } from 'react'
import Input from '../components/Input/Input';
import Button from '../components/Buttons/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/utils';
import { signinService } from '../services/signinService';
import useUserStore, { UserType } from '../store/useStore';

function Signin() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigator = useNavigate();
    const { setUser } = useUserStore();


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const mutation = useMutation(signinService, {
      onSuccess : (data) => {
        console.log(data);
        toast.success(data?.message || "Successful")
        const storeData : UserType = {
          token : data.data.token,
          username: data.data.user.username,
          email : data.data.user.email,
          _id : data.data.user._id
        }
        localStorage.setItem("secondBrainToken", data.data.token);
        setUser(storeData); 
        setEmail("");
        setPassword("")
        navigator("/");
      },
      onError :  (error) => {
        console.log(error);
        toast.error(getErrorMessage(error));
      }
    })


    const handleSignin = () : void => {
      mutation.mutate({
        email,
        password
      })
    }


  return (
    <div className="flex justify-center bg-gray-100 h-screen p-4">
      <div className="w-full max-w-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Signup</h2>

        <form className="space-y-4">


          {/* Email Input */}
          <div className="w-full">
            <label className="mb-2">
              <span className="label-text ">Email</span>
            </label>
            <Input value={email} onChange={handleEmailChange} placeholder='Enter your email'/>
          </div>

          {/* Password Input */}
          <div className="w-full">
            <label className="mb-2">
              <span className="label-text">Password</span>
            </label>
            <Input value={password} onChange={handlePasswordChange} inputType='password'  placeholder='Enter your password'/>
          </div>

         <Button variant='primary' onClick={handleSignin} loading={mutation.isLoading} text="Signup" customStyle={{width: '100%'}}/>
        </form>

         {/* Divider */}
         <div className="text-gray-600 text-center my-2">OR</div>

        {/* Sign Up Link */}
        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
