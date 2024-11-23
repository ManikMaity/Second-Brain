import { } from 'react';
import './App.css'
import Button from './components/Buttons/Button';
import { FaPlus } from "react-icons/fa6";

function App() {

  return (
    <div className='h-screen w-full '>
      <Button text='Add a new' variant='primary' startIcon={<FaPlus />} />
    </div>
  )
}

export default App
