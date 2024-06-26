import { useState } from 'react';

// import Footer from '../components/Footer/Footer';
import AppBar from '../components/AppBar/AppBar';
import ProjectAdder from '../components/ProjectManagers/ProjectAdder';
import DisplayTable from '../components/Tables/DisplayTable';
import UpdateAdder from '../components/ProjectManagers/UpdateAdder';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="p-8">
        <div className="flex flex-row">
          <DisplayTable />
          <div className="flex flex-auto outline outline-2">
            <h1>Other random component</h1>
            <ProjectAdder />
          </div>
        </div>
        <div className="flex">
          <UpdateAdder />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default HomePage;
