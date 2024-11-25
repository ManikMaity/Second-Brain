import { } from 'react';
import './App.css'
import ContentCard, { ContentCardProps } from './components/Cards/ContentCard';
import Sidebar from './components/Sidebar/Sidebar';

function App() {

  const exampleData: ContentCardProps = {
    contentType: "video",
    cardTitle: "Card Title is here is a very long title",
    tags: ["computer", "html", "css", "typescript"],
    createdAt: "2024-11-25T04:32:36.559Z",
  };
  

  return (
    <div className='h-screen w-full bg-gray-100 p-4'>
      {/* <Button text='Add Content' variant='primary' size='md' onClick={() => {alert("Hoi there")}} startIcon={<FaPlus />} endIcon={<IoMdShare />} /> */}
      <Sidebar/>
      <ContentCard {...exampleData}/>
    </div>
  )
}

export default App
