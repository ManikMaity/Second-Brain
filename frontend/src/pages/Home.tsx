import React, { useState } from 'react'
import ContentCard, { ContentCardProps } from '../components/Cards/ContentCard';
import ModelContainer from '../components/Models/ModelContainer';
import AddContentModel from '../components/Models/AddContentModel';
import Sidebar from '../components/Sidebar/Sidebar';
import Button from '../components/Buttons/Button';
import { FaPlus } from 'react-icons/fa6';
import { IoMdShare } from 'react-icons/io';
import SpinnerLoader from '../components/Loaders/SpinnerLoader';
import useUserStore from '../store/useStore';

function Home() {
    const exampleData: ContentCardProps = {
        contentType: "link",
        link: "https://www.chess.com/lessons/how-to-move-the-pieces/the-king-and-the-goal?backRedirect=learn",
        cardTitle: "Card Title is here is a very long title",
        tags: ["computer", "html", "css", "typescript"],
        createdAt: "2024-11-25T04:32:36.559Z",
      };
    
      const exampleData2: ContentCardProps = {
        contentType: "video",
        link: "https://youtu.be/9i_zH049fyc?si=Yp_QA6AbZ8tp8Nw7",
        cardTitle: "Debug react like a pro",
        tags: ["react", "webdev", "css", "typescript"],
        createdAt: "2024-11-25T04:32:36.559Z",
      };
    
      const exampleData3: ContentCardProps = {
        contentType: "tweet",
        link: "https://x.com/cj_zZZz/status/1860732311299408257",
        cardTitle: "Twiter post from @cj_zZZz",
        tags: ["twitter", "html", "css", "typescript"],
        createdAt: "2024-11-25T04:32:36.559Z",
      };
    
      const [sidebarClosed, setSidebarClosed] = useState(false);
      const [openCreateModal, setOpenCreateModal] = useState(false);
      const {user} = useUserStore();
      console.log(user);
    
      function handleModelClose (){
        setOpenCreateModal(false);
      }
    
      return (
        <div className="h-screen w-full bg-gray-100 flex justify-end">
          {openCreateModal && <ModelContainer onClose={handleModelClose} >
            <AddContentModel/>
            </ModelContainer>}
          <Sidebar
            closeSidebar={sidebarClosed}
            setCloseSidebar={setSidebarClosed}
          />
          <div
            className={`h-screen transition-all duration-500 ${
              sidebarClosed ? "w-[100%]" : "w-[80%]"
            } p-6 bg-gray-200`}
          >
            <div className="flex flex-col sm:flex-row justify-between h-[12%] sm:h-[6%] sm:items-center gap-2 mb-6">
              <h1 className="font-bold text-2xl">All Notes</h1>
              <div className="flex gap-2">
                <Button
                  text="Add Content"
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setOpenCreateModal(true);
                  }}
                  startIcon={<FaPlus />}
                />
                <Button
                  text="Share Brain"
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    alert("Hoi there");
                  }}
                  startIcon={<IoMdShare />}
                />
              </div>
            </div>
    
            <div className="w-full h-auto md:h-[92%] overflow-y-scroll gap-2 flex justify-center flex-wrap">
              <ContentCard {...exampleData} />
              <ContentCard {...exampleData2} />
              <ContentCard {...exampleData3} />
              <ContentCard {...exampleData} />
              <ContentCard {...exampleData2} />
              <ContentCard {...exampleData} />
              <ContentCard {...exampleData2} />
              <ContentCard {...exampleData} />
              <ContentCard {...exampleData2} />
              <ContentCard {...exampleData3} />
            </div>
          </div>
        </div>
      );
}

export default Home
