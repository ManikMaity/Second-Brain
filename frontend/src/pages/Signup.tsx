import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Buttons/Button';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { signupService } from '../services/signupService';
import { getErrorMessage } from '../utils/utils';

const Signup = () => {

  
    
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const mutation = useMutation(signupService, {
      onSuccess : (data) => {
        console.log(data);
        toast.success(data?.message || "Successful")
        setUsername("");
        setEmail("");
        setPassword("");
      },
      onError :  (error) => {
        console.log(error);
        toast.error(getErrorMessage(error));
      }
    })


    const handleSignup = () : void => {
      mutation.mutate({
        username,
        email,
        password
      })
    }


  return (
    <div className="flex justify-center bg-gray-100 h-screen p-4">
      <div className="w-full max-w-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Signup</h2>

        <form className="space-y-4">

            {/* Username Input */}
          <div className="w-full">
            <label className="mb-2">
              <span className="label-text ">Name</span>
            </label>
            <Input value={username} onChange={handleUsernameChange} placeholder='Enter your name.'/>
          </div>

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

         <Button variant='primary' onClick={handleSignup} loading={mutation.isLoading} text="Signup" customStyle={{width: '100%'}}/>
        </form>

         {/* Divider */}
         <div className="text-gray-600 text-center my-2">OR</div>

        {/* Sign Up Link */}
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary hover:underline">Signin</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
