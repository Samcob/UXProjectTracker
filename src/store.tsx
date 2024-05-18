import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User, Project, Update } from '../src/types/user';
import { produce } from 'immer';

type UserStore = {
  userList: User[];
  addUser: (user: User) => void;
  getUser: (name: string) => User | undefined;
  updateUser: (user: User) => void;
  removeUser: (id: string) => void;
  isEmpty: () => boolean;
  addProject: (user: User, project: Project) => void;
  getProject: (projName: string) => void;
  // removeProject: (projName: string) => void;
  addUpdate: (updates: Update[]) => void;
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
      //try to match by id instad of name to prevent errors when two names are the same
      addProject: (user, project) => {
        const { userList } = get();
        const userIndex = userList.findIndex((relUser) => relUser.id === user.id);
        set(
          produce((state: UserStore) => {
            state.userList[userIndex].projects.push(project);
          })
        );
      },
      getProject: (projName) => {
        const { userList } = get();
        const foundProject = userList.find((user) =>
          user.projects.find((relProject) => relProject.projName === projName)
        );
        return foundProject;
      },
      addUpdate: (updates) => {},
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

  // removeProject: (projName: string) => {

  // },
  // removeUpdate: (id: string) => {

  // },
);
