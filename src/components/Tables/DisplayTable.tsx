import { useUserStore } from '../../store';
import { NavLink } from 'react-router-dom';

import UserAdder from '../UserManagers/UserAdder';
import UserRemover from '../UserManagers/UserRemover';

const DisplayTable = () => {
  const { userList, isEmpty } = useUserStore();

  return (
    <div className="card mr-8 w-5/12 bg-white shadow-xl outline outline-1 outline-slate-300">
      <div className="card-body">
        <h2 className="card-title">Active Projects</h2>
        {isEmpty() === false ? (
          <table className="table table-lg">
            <thead>
              <tr>
                <th className="">Name</th>
                <th className="">Current Projects</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index}>
                  <th className="align-center text-lg">{user.name}</th>
                  <td className="">
                    {user.projects.map((project, index) => [
                      <NavLink
                        key={index}
                        to={'/ProjectPage/'}
                        state={{ project: project }}
                        className="text-blue-500 hover:border-b-secondary-accent-font-color hover:font-extrabold"
                      >
                        {
                          <div className="flex-auto pb-1 pt-1">
                            <h2 className="">{project.projName}</h2>
                            <em className="">{[' Ticket #: ', project.projTicket]}</em>
                          </div>
                        }
                      </NavLink>,
                    ])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <em className="p-4 text-gray-500">It looks like you haven't added any users!</em>
        )}
        <div className="card-actions justify-end">
          <UserRemover />
          <UserAdder />
        </div>
      </div>
    </div>
  );
};

export default DisplayTable;
