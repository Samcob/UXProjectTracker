import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User } from '../src/types/user';

type UserStore = {
  userList: User[];
  addUser: (user: User) => void;
  getUser: (id: string) => User | undefined;
  updateUser: (user: User) => void;
  removeUser: (id: string) => void;
  isEmpty: () => boolean;
  reset: () => void;
  // addProject: (name: string, projects: []) => void;
  // removeProject: (projName: string) => void;
  // addUpdates: (updates: []) => void;
  // removeUpdate: (id: string) => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    // persist(
    immer((set, get) => ({
      userList: [],
      addUser: (user: User) => {
        set((state) => ({
          userList: [...state.userList, user],
        }));
      },
      getUser: (id: string) => {
        const { userList } = get();
        return userList.find((user) => user.id === id);
      },
      updateUser: (user: User) => {
        set((state) => ({
          users: state.userList.map((u) => (u.id === user.id ? user : u)),
        }));
      },
      removeUser: (id: string) => {
        set((state) => ({
          userList: state.userList.filter((user) => user.id !== id),
        }));
      },
      isEmpty: () => {
        const { userList } = get();
        if (userList.length > 0) {
          return false;
        } else {
          return true;
        }
      },
      reset: () => {
        set(() => ({
          userList: [],
        }));
      },
    })),
    {
      name: 'user-list',
    }
    // )
  )

  // addNewProject: (name: string, projects: Projects[]) => {
  //   const findUser = userList.find(function(User: {
  //     name: string,
  //     projects: Projects[],
  //     updates: Updates[]
  //   }): array | undefined{
  //     if (User.name === {name} [
  //               set((state) => ({userList[].projects: [...state.userList[name].projects, {projects]]}));
  //     ])
  //   })
  // },
  // addProject: (name: string, projects: Projects[]) => {
  //   set((state) => ({userList[].projects: [...state.userList[name].projects, {projects]]}));
  // },

  // addProject: (projects: []) => {

  // },
  // addUpdates: (updates: []) => {

  // },
  // removeProject: (projName: string) => {

  // },
  // removeUpdate: (id: string) => {

  // },
);
