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
  addUpdate: (updates: Update[]) => void;
  resetUserList: () => void;
  // removeProject: (projName: string) => void;
  // removeUpdate: (id: string) => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        userList: [],
        addUser: (user: User) => {
          set(
            produce((draft: UserStore) => {
              draft.userList.push(user);
            })
          );
        },
        getUser: (id: string) => {
          const { userList } = get();
          return userList.find((user) => user.id === id);
        },
        updateUser: (user: User) => {
          set(
            produce((draft: UserStore) => {
              const userToUpdate = draft.userList.find((u) => u.id === user.id);
              if (userToUpdate) {
                Object.assign(userToUpdate, user);
              }
            })
          );
        },
        removeUser: (id: string) => {
          set(
            produce((draft: UserStore) => {
              const index = draft.userList.findIndex((user) => user.id === id);
              if (index !== -1) {
                draft.userList.splice(index, 1);
              }
            })
          );
        },
        isEmpty: () => {
          const { userList } = get();
          return userList.length === 0;
        },
        //try to match by id instad of name to prevent errors when two names are the same
        addProject: (user, project) => {
          set(
            produce((draft: UserStore) => {
              const userToUpdate = draft.userList.find((u) => u.id === user.id);
              if (userToUpdate) {
                userToUpdate.projects.push(project);
              }
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
        addUpdate: (updates) => {
          set(
            produce((draft: UserStore) => {
              updates.map((update) => {
                const uIndex = draft.userList.findIndex((u) => u.name === update.madeBy);
                const projectToUpdate = draft.userList[uIndex].projects.find(
                  (p) => p.projName === update.projName
                );
                console.log(draft.userList[uIndex].projects);
                if (projectToUpdate) {
                  projectToUpdate.projUpdates.push(update);
                }
              });
            })
          );
        },
        resetUserList: () => {
          set({ userList: [] });
        },
      })),
      {
        name: 'user-list',
      }
    )
  )
);
