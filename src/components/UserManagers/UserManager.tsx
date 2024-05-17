import UserAdder from './UserAdder';
import UserRemover from './UserRemover';

const UserManager = () => {
  return (
    <>
      <button
        className="btn bg-dha-blue text-white hover:bg-dha-dark-blue-950"
        onClick={() =>
          (document.getElementById('userManagerModal') as HTMLDialogElement).showModal()
        }
      >
        Manage Users
      </button>
      <dialog id="userManagerModal" className="modal">
        <div className="w-11/1212 maw-w-5xl modal-box">
          <p>Manage your current user list.</p>
          <div className="flex flex-row">
            <UserAdder />
            <UserRemover />
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UserManager;
