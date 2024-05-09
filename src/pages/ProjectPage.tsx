import { useState } from 'react';

import Footer from '../components/Footer/Footer';
import AppBar from '../components/AppBar/AppBar';

const ProjectPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <h1 className="text-lg font-bold text-red-600">Temp Project Page</h1>
      <Footer />
    </>
  );
};

export default ProjectPage;
