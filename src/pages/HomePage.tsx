import { useState } from 'react';

import Footer from '../components/Footer/Footer';
import AppBar from '../components/AppBar/AppBar';
// import UserAdder from '../components/UserManagers/UserAdder';
import DisplayTable from '../components/Tables/DisplayTable';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const { reset } = useUserStore();

  return (
    <>
      <AppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="p-8">
        <div className="flex flex-row">
          <DisplayTable />
          <div className="flex flex-auto outline outline-2">
            <h1>Other random component</h1>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
