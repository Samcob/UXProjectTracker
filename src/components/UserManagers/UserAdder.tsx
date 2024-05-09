import { nanoid } from 'nanoid';
import { useUserStore } from '../../store';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Project } from '../../types/user';

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
  const { userList, addUser } = useUserStore();

  const [projects, setProjects] = useState<Array<Project>>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  //Debugging to view userList
  useEffect(() => {
    console.log(userList);
  }, [userList]);

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
      const newProject = { id: nanoid(), projName: '', projTicket: '', projUpdates: [] };
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
        className="btn"
        onClick={() => (document.getElementById('addUserModal') as HTMLDialogElement).showModal()}
      >
        Add User
      </button>
      <dialog id="addUserModal" className="modal">
        <div className="w-11/1212 maw-w-5xl modal-box">
          <h1>Add a New User</h1>
          <form onSubmit={handleSubmit} className="pb-8 pt-8">
            <label htmlFor="userNameInput" className="form-controll w-full max-w-xs">
              <div className="label">
                <span className="label-text">First and Last Name</span>
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
              <input
                id="userEmailInput"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <br />
            <br />

            {/* User Projects */}
            <div className="space-y-4">
              <div className="p-1 font-bold">User Projects</div>
              {projects.map((project, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="input-group">
                    <label className="form-controll w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Project Name</span>
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
                        <span className="label-text">Ticket Number</span>
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
                      className="rounded-md bg-red-500 p-2 text-white hover:bg-red-700"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="btn" onClick={handleAddProject}>
              Add Project
            </button>
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

export default UserAdder;
