import { useEffect, useState } from 'react';
import { useUserStore } from '../../store';
import { Project, User } from '../../types/user';
import { nanoid } from 'nanoid';

const ProjectAdder = () => {
  const defaultProject = {
    id: nanoid(),
    projName: '',
    projTicket: '',
    projSprint: 0,
    projUpdates: [],
    projHistory: [],
  };

  const defaultUser = {
    id: '',
    name: '',
    email: '',
    projects: [],
  };

  const { userList, addProject } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<User>(defaultUser);
  const [project, setProject] = useState<Project>(defaultProject);

  //debugging tool checking to see if various steps are being met
  useEffect(() => {
    const user = userList.find((user) => user.name === selectedUser.name);
    console.log(user);
    console.log(userList);
  }, [selectedUser, userList]);

  const handleSubmit = () => {
    if (selectedUser != undefined) {
      addProject(selectedUser, project);
    } else {
      alert('Unable to find selected User.');
    }
    setProject(defaultProject);
  };

  const handleChange = <K extends keyof Project>(field: K, value: Project[K]) => {
    const newProject = project;
    newProject[field] = value;
    setProject(newProject);
  };

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value != '') {
      const user = userList.find((user) => user.name === e.target.value);
      if (user != undefined) {
        setSelectedUser(user);
      } else {
        alert('Invalid user');
      }
    } else {
      alert('Invalid user.');
    }
  };

  return (
    <>
      <button
        className="btn bg-dha-blue text-white hover:bg-dha-dark-blue-950"
        onClick={() =>
          (document.getElementById('addProjectModal') as HTMLDialogElement).showModal()
        }
      >
        Add New Project
      </button>
      <dialog id="addProjectModal" className="modal">
        <div className="modal-box w-7/12 max-w-7xl p-8">
          <form onSubmit={handleSubmit} className="pb-8 pt-8">
            <label htmlFor="projectNameInput" className="form-controll w-full max-w-xs">
              <div className="label">
                <span className="label-text">Project Name</span>
              </div>
              <input
                id="projectName"
                type="text"
                onChange={(e) => handleChange('projName', e.target.value)}
                placeholder="Project Name"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label htmlFor="projectTicketInput" className="form-controll w-full max-w-xs">
              <div className="label">
                <span className="label-text">Ticket Number</span>
              </div>
              <input
                id="ticketNumber"
                type="text"
                onChange={(e) => handleChange('projTicket', e.target.value)}
                placeholder="Ticket Number"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <select
              id="userSelect"
              onChange={handleUserSelect}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Assign this project to:
              </option>
              {userList.map((user) => (
                <option>{user.name}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProjectAdder;
