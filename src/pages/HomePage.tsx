import { useState } from 'react';

import Footer from '../components/Footer/Footer';
import AppBar from '../components/AppBar/AppBar';
import UserAdder from '../components/UserManagers/UserAdder';
import { UserRemover } from '../components/UserManagers/UserRemover';
import DisplayTable from '../components/Tables/DisplayTable';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const { reset } = useUserStore();

  return (
    <>
      <AppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <h1 className="justify-center text-xl font-bold text-red-500">This is the Homepage</h1>
      <div className="flex flex-row">
        <DisplayTable />
        <div className="flex-auto">
          <h1>Test</h1>
        </div>
      </div>
      <UserAdder />
      <UserRemover />
      {/* <button className="btn" onClick={reset}>
        Reset Users
      </button> */}
      <Footer />
    </>
  );
};

export default HomePage;
