import { useUserStore } from '../../store';
import { useState, ChangeEvent } from 'react';

export const UserRemover = () => {
  const { removeUser } = useUserStore();
  const [user, setUser] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (user !== '') {
      removeUser(user);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() =>
          (document.getElementById('removeUserModal') as HTMLDialogElement).showModal()
        }
      >
        Remove User
      </button>
      <dialog id="removeUserModal" className="modal">
        <div className="w-11/1212 maw-w-5xl modal-box">
          <h1>Remove a User</h1>
          <form onSubmit={handleSubmit} className="pb-8 pt-8">
            <label htmlFor="userNameInput" className="form-controll w-full max-w-xs">
              <div className="label">
                <span className="label-text">First and Last Name</span>
              </div>
              <input
                id="userNameInput"
                type="text"
                onChange={handleChange}
                placeholder="Full Name"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
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
