export interface Update {
    id: string,
    projName: string,
    madeBy: string;
    date: string;
    hours: number;
    description: string;
}

export interface Project {
    id: string;
    projName: string;
    projTicket: string;
    projSprint: number;
    projUpdates: Update[];
    projHistory: Update[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    projects: Project[];
}