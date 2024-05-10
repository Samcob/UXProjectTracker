import { useState } from 'react';

import AppBar from '../components/AppBar/AppBar';
import Footer from '../components/Footer/Footer';
// import { User } from '@/types/user';

const UserAdder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex p-8">
        <h1 className="text-lg font-bold text-red-600">Temp User Page</h1>
        <br />
        <br />
        {/* <h2>You are currently viewing {user.name}'s user page!</h2> */}
        <h2>You made it to the Temp User Page!</h2>
      </div>
      <Footer />
    </>
  );
};

export default UserAdder;
