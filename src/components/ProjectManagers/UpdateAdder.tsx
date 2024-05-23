import { useState /*useEffect*/ } from 'react';
import { useUserStore } from '../../store';
import { /*Project, User,*/ Update } from '../../types/user';
import { nanoid } from 'nanoid';

const UpdateAdder = () => {
  const defaultUpdate = {
    id: nanoid(),
    projName: '',
    madeBy: '',
    date: '',
    hours: 0,
    sprint: 0,
    sprintTicket: '',
    description: '',
  };

  const { userList, addUpdate } = useUserStore();
  const [updates, setUpdates] = useState<Array<Update>>([defaultUpdate]);

  // Debugging to view userList
  // useEffect(() => {
  //   console.log(updates);
  // }, [updates]);

  const handleUpdateChange = <K extends keyof Update>(
    index: number,
    field: K,
    value: Update[K]
  ) => {
    const newUpdates = [...updates];
    newUpdates[index][field] = value;
    setUpdates(newUpdates);
    // setUpdates((prevUpdates) => ({ ...prevUpdates, [prevUpdates[index][field]]: value }));
  };

  const handleAddUpdate = () => {
    // const index = updates.length - 1;
    const newUpdate = {
      id: nanoid(),
      projName: '',
      madeBy: '',
      date: '',
      hours: 0,
      sprint: 0,
      sprintTicket: '',
      description: '',
    };
    //TODO: preserved date and madeBy fields from previous entry. Can't work without value={} props on inputs and selects
    // if (index > 0) {
    //   newUpdate.date = updates[index].date;
    //   newUpdate.madeBy = updates[index].madeBy;
    // }
    setUpdates([...updates, newUpdate]);
  };

  const handleRemoveUpdate = (index: number) => {
    const newUpdates = [...updates];
    newUpdates.splice(index, 1);
    setUpdates(newUpdates);
  };

  //need to keep value if refreshed but not reselected from dropdown
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updates) {
      addUpdate(updates);
      setUpdates([defaultUpdate]);
    } else {
      alert('Invalid update request.');
    }
  };

  return (
    <div className="card mt-8 w-full bg-white shadow-xl outline outline-1 outline-slate-300">
      <div className="card-body">
        <h2 className="card-title text-2xl">Daily Project Updates</h2>
        <form onSubmit={handleSubmit}>
          <table className="table table-lg">
            <thead>
              <tr>
                <th className="text-xl">Project</th>
                <th className="text-xl">Name</th>
                <th className="text-xl">Date</th>
                <th className="text-xl">Hours</th>
                <th className="text-xl">Details</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((update, index) => (
                <tr key={update.id} className="">
                  <th className="align-top">
                    <select
                      id="projSelect"
                      value={update.projName}
                      onChange={(e) => handleUpdateChange(index, 'projName', e.target.value)}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled value="">
                        Project:
                      </option>
                      {userList.map((user) =>
                        user.projects.map((project) => (
                          <option key={project.id} value={project.projName}>
                            {project.projName}
                          </option>
                        ))
                      )}
                    </select>
                  </th>
                  <td className="align-top">
                    <select
                      id="userSelect"
                      onChange={(e) => handleUpdateChange(index, 'madeBy', e.target.value)}
                      value={update.madeBy}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option disabled value="">
                        Name:
                      </option>
                      {userList.map((user) => (
                        <option key={user.id} value={user.name}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="align-top">
                    <input
                      type="text"
                      placeholder="MM/DD/YYYY"
                      value={update.date}
                      onChange={(e) => handleUpdateChange(index, 'date', e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td className="align-top">
                    <input
                      type="number"
                      value={update.hours}
                      placeholder="Hours"
                      onChange={(e) => handleUpdateChange(index, 'hours', +e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td className="align-top">
                    <textarea
                      id="text"
                      rows={2}
                      value={update.description}
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
