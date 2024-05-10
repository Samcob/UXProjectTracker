import { useState } from 'react';

import Footer from '../components/Footer/Footer';
import AppBar from '../components/AppBar/AppBar';
import { Project } from '@/types/user';

const ProjectPage = (project: Project) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex p-8">
        <h1 className="text-lg font-bold text-red-600">Temp Project Page</h1>
        <br />
        <br />
        <h2> You are viewing the {project.projName} project page!!</h2>
      </div>
      <Footer />
    </>
  );
};

export default ProjectPage;
