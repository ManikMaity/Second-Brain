import React, { useState } from 'react'
import Input from '../components/Input/Input';
import Button from '../components/Buttons/Button';
import { Link } from 'react-router-dom';

function Signin() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
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

         <Button variant='primary' text="Signup" customStyle={{width: '100%'}}/>
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
