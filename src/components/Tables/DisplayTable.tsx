import { useUserStore } from '../../store';
import { NavLink } from 'react-router-dom';

const DisplayTable = () => {
  const { userList } = useUserStore();
  return (
    <div className="overflow-x-auto">
      <table className="table table-md border-black outline-2">
        <thead>
          <tr>
            <th className="">Name</th>
            <th>Current Projects</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <th className="align-top text-lg">{user.name}</th>
              <td className="">
                {user.projects.map((project, index) => [
                  <NavLink
                    key={index}
                    to={'/ProjectPage'}
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
    </div>
  );
};

export default DisplayTable;
