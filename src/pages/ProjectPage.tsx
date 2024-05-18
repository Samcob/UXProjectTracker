import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import AppBar from '../components/AppBar/AppBar';
// import { Project } from '@/types/user';

// interface IProjectPageProps {
//   project: Project;
// }

const ProjectPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { project } = location.state;

  return (
    <>
      <AppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="inset-y-0  w-full flex-1">
        <div className="flex h-full justify-center overflow-y-auto py-5">
          <div className="flex-row">
            <h1 className="text-xl font-bold text-black">{project.projName}</h1>
            <h2> You are viewing the {project.projName} project page!!</h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectPage;
