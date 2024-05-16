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
      {console.log(project)}
      <div className="flex p-8">
        <h1 className="text-lg font-bold text-red-600">{project.projName}</h1>
        <br />
        <br />
        <h2> You are viewing the {project.projName} project page!!</h2>
      </div>
      <Footer />
    </>
  );
};

export default ProjectPage;
