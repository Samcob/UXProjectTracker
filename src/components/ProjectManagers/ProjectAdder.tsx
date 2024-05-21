import { useState } from 'react';
import { useUserStore } from '../../store';
import { Project } from '../../types/user';
import { nanoid } from 'nanoid';

const ProjectAdder = () => {
  //TODO: Ask Chris why this was changed to a function.
  const defaultProject = () => ({
    id: nanoid(),
    projName: '',
    projTicket: '',
    projSprint: 0,
    projUpdates: [],
    projHistory: [],
  });

  // const defaultUser = {
  //   id: '',
  //   name: '',
  //   email: '',
  //   projects: [],
  // };

  const { userList, addProject } = useUserStore();
  const [selectedUser, setSelectedUser] = useState('');
  const [project, setProject] = useState<Project>(defaultProject());

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = userList.find((user) => user.id === selectedUser);
    if (user != undefined) {
      addProject(user, project);
      setProject(defaultProject());
      setSelectedUser('');
    } else {
      alert('Unable to find selected User.');
    }
    // setProject(defaultProject);
  };

  const handleChange = <K extends keyof Project>(field: K, value: Project[K]) => {
    setProject((prevProject) => ({ ...prevProject, [field]: value }));
  };

  //TODO: try to find a way to reference the user.id instead of user.name
  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
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
              value={selectedUser}
              onChange={handleUserSelect}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="">
                Assign this project to:
              </option>
              {userList.map((user, index) => (
                <option key={index} value={user.id}>
                  {user.name}
                </option>
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
