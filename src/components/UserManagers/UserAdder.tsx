import { nanoid } from 'nanoid';
import { useUserStore } from '../../store';
import { useState } from 'react';
import { z } from 'zod';
import { Project } from '../../types/user';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AdduserDialogProps {
  onClose: () => void;
}

const ProjectSchema = z.object({
  projName: z.string().min(1),
  projTicket: z.string().min(1),
});

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: 'Invalid email address' }),
  projects: z.array(ProjectSchema),
});

export const UserAdder = (props: AdduserDialogProps) => {
  const { addUser } = useUserStore();

  const [projects, setProjects] = useState<Array<Project>>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // //Debugging to view userList
  // useEffect(() => {
  //   console.log(userList);
  // }, [userList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //filter out empty projects
    const filteredProjects = projects.filter(
      (project) => project.projName.trim() !== '' && project.projTicket.trim() !== ''
    );

    //create a new user
    const newUser = {
      id: nanoid(),
      name,
      email,
      projects: filteredProjects,
    };

    const result = UserSchema.safeParse(newUser);

    if (result.success) {
      addUser(newUser);
    } else {
      //continue form validation here
      console.error(result.error.errors);
      alert('invalid form data');
    }

    //Clear the form
    setName('');
    setEmail('');
    setProjects([]);
    props.onClose();
  };

  // ASK CHRIS TO EXPLAIN THIS MORE
  // allows us to update a specific field in a project without having to
  // write a separate function for eeach field, it allows up to update the
  // project name, ticket num, or any other field in the future via array syntax

  // Not adding project if ticket field is blank
  const handleProjectChange = <K extends keyof Project>(
    index: number,
    field: K,
    value: Project[K]
  ) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    if (projects.length < 3) {
      const newProject = {
        id: nanoid(),
        projName: '',
        projTicket: '',
        projSprint: 0,
        projUpdates: [],
        projHistory: [],
      };
      setProjects([...projects, newProject]);
    }
  };

  const handleRemoveProject = (index: number) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  return (
    <>
      <button
        className="btn bg-dha-blue text-white hover:bg-dha-dark-blue-950"
        onClick={() => (document.getElementById('addUserModal') as HTMLDialogElement).showModal()}
      >
        Add User
      </button>
      <dialog id="addUserModal" className="modal">
        <div className="modal-box w-7/12 max-w-7xl p-8">
          <h1 className="text-xl font-semibold">Add a New User</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-8 ml-4 flex items-center space-x-6">
              <label htmlFor="userNameInput" className="form-controll w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">First and Last Name</span>
                </div>
                <input
                  id="userNameInput"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label htmlFor="userEmailInput" className="form-controll w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-lg">Email Address</span>
                </div>
                <input
                  id="userEmailInput"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>

            {/* User Projects */}
            <div className="mt-4">
              <div className="text-lg font-bold">User Projects</div>
              {projects.map((project, index) => (
                <>
                  {index != 0 && <hr className="border-1 border-gray-400" />}
                  <div key={index} className="flex items-end space-x-6 pb-4">
                    <label className="form-controll ml-4 w-full max-w-xs">
                      <div className="label">
                        <span className="label-text text-lg">Project Name</span>
                      </div>
                      <input
                        type="text"
                        value={project.projName}
                        placeholder="Project Name"
                        onChange={(e) => handleProjectChange(index, 'projName', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                    <label className="form-controll w-full max-w-xs">
                      <div className="label">
                        <span className="label-text text-lg">Ticket Number</span>
                      </div>
                      <input
                        type="text"
                        value={project.projTicket}
                        placeholder="Ticket #"
                        onChange={(e) => handleProjectChange(index, 'projTicket', e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(index)}
                      className="btn ml-4 border-2 border-red-500 bg-transparent px-4 py-2.5 text-lg text-red-600 hover:border-transparent hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                  {/* {index >= 1 && index !== projects.length && (
                    <hr className="border-1 border-gray-400" />
                  )} */}
                </>
              ))}
            </div>

            <button
              type="button"
              className="hover:bg-gray-150 btn mt-4 border-transparent bg-transparent text-lg text-dha-blue hover:border-transparent"
              onClick={handleAddProject}
            >
              + Add Project
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
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-7 top-7 text-lg">
                <XMarkIcon aria-label="close menu" className="size-5 text-black" />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UserAdder;
