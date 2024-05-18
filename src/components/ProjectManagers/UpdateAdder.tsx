import { useState, useEffect } from 'react';
import { useUserStore } from '../../store';
import { /*Project, User,*/ Update } from '../../types/user';
import { nanoid } from 'nanoid';

const UpdateAdder = () => {
  // const defaultUser = {
  //   id: nanoid(),
  //   name: '',
  //   email: '',
  //   projects: [],
  // };

  // const defaultProject = {
  //   id: nanoid(),
  //   projName: '',
  //   projTicket: '',
  //   projSprint: 0,
  //   projUpdates: [],
  //   projHistory: [],
  // };

  const defaultUpdate = {
    id: nanoid(),
    projName: '',
    madeBy: '',
    date: '',
    hours: 0,
    description: '',
  };

  const { userList, /*getProject,*/ addUpdate } = useUserStore();
  // const [selectedUser, setSelectedUser] = useState<User>(defaultUser);
  // const [selectedProject, setSelectedProject] = useState<Project>(defaultProject);
  const [updates, setUpdates] = useState<Array<Update>>([defaultUpdate]);
  //debugging const below
  const [tempUserList, setTempUserList] = useState(userList);

  useEffect(() => {
    console.log(tempUserList);
  }, [tempUserList]);
  //TODO: try to find a way to reference the user.id instead of user.name
  // const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (e.target.value != '') {
  //     const user = userList.find((user) => user.name === e.target.value);
  //     if (user != undefined) {
  //       setSelectedUser(user);
  //     } else {
  //       alert('Invalid user');
  //     }
  //   } else {
  //     alert('Invalid user.');
  //   }
  // };

  //TODO: try to find a way to reference the project.id instead of project.name
  //TODO: Do I need to grab the ACTUAL User and project objects, or should I
  //just pass strings and handle the grabbing in store?
  // const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (e.target.value != '') {
  //     const project = getProject(e.target.value);
  //     if (project != undefined) {
  //       setSelectedProject(project);
  //     } else {
  //       alert('Invalid project');
  //     }
  //   } else {
  //     alert('Invalid project.');
  //   }
  // };

  const handleUpdateChange = <K extends keyof Update>(
    index: number,
    field: K,
    value: Update[K]
  ) => {
    const newUpdates = updates;
    newUpdates[index][field] = value;
    setUpdates(newUpdates);
  };

  const handleAddUpdate = () => {
    // if (updates.length < 3) {
    const newUpdate = {
      id: nanoid(),
      projName: '',
      madeBy: '',
      date: '',
      hours: 0,
      description: '',
    };
    setUpdates([...updates, newUpdate]);
    // }
  };

  const handleRemoveUpdate = (index: number) => {
    const newUpdates = [...updates];
    newUpdates.splice(index, 1);
    setUpdates(newUpdates);
  };
  //running but not adding to updates list
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updates.map((update) => {
      const userIndex = userList.findIndex((user) => user.name === update.madeBy);
      const projIndex = userList[userIndex].projects.findIndex(
        (project) => project.projName === update.projName
      );
      const newUserList = [...tempUserList];
      [...newUserList[userIndex].projects[projIndex].projUpdates, [updates]];
      setTempUserList(newUserList);
    });
    // addUpdate(updates);
  };

  return (
    <div className="card mt-8 w-full bg-white shadow-xl outline outline-1 outline-slate-300">
      <div className="card-body">
        <h2 className="card-title">Daily Project Updates</h2>
        <form onSubmit={handleSubmit}>
          <table className="table table-lg">
            <thead>
              <tr>
                <th className="">Project</th>
                <th className="">Name</th>
                <th className="">Date</th>
                <th className="">Hours</th>
                <th className="">Details</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((update, index) => (
                <tr className="">
                  <th className="align-top">
                    <select
                      id="userSelect"
                      onChange={(e) => handleUpdateChange(index, 'projName', e.target.value)}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled selected>
                        Project:
                      </option>
                      {userList.map((user) =>
                        user.projects.map((project) => <option>{project.projName}</option>)
                      )}
                    </select>
                  </th>
                  <td className="align-top">
                    <select
                      id="userSelect"
                      onChange={(e) => handleUpdateChange(index, 'madeBy', e.target.value)}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled selected>
                        Name:
                      </option>
                      {userList.map((user) => (
                        <option>{user.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="align-top">
                    {/* TODO: Adding value={update.date} disallows input field changing when typing */}
                    <input
                      type="text"
                      // value={update.date}
                      placeholder="MM/DD/YYYY"
                      onChange={(e) => handleUpdateChange(index, 'date', e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td className="align-top">
                    <input
                      type="number"
                      // value={update.hours}
                      placeholder="Hours"
                      onChange={(e) => handleUpdateChange(index, 'hours', +e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td className="align-top">
                    <textarea
                      id="text"
                      rows={2}
                      placeholder="Description"
                      onChange={(e) => handleUpdateChange(index, 'description', e.target.value)}
                      className="textarea textarea-bordered w-full max-w-xs"
                    />
                  </td>
                  <td className="align-middle">
                    <button
                      type="button"
                      onClick={() => handleRemoveUpdate(index)}
                      className="btn ml-4 border-2 border-red-500 bg-transparent px-4 py-2.5 text-lg text-red-600 hover:border-transparent hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              ;
            </tbody>
          </table>
          <button
            type="button"
            className="hover:bg-gray-150 btn mt-4 border-transparent bg-transparent text-lg text-dha-blue hover:border-transparent"
            onClick={handleAddUpdate}
          >
            + Add Update
          </button>
          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn bg-dha-blue px-4 py-2.5 text-lg text-white hover:bg-dha-dark-blue-950"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};

export default UpdateAdder;
