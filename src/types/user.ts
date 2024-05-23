export interface Update {
    id: string,
    projName: string;
    madeBy: string;
    date: string;
    hours: number;
    sprint: number;
    sprintTicket: string;
    description: string;
}

export interface Project {
    id: string;
    projName: string;
    projTicket: string;
    projHours: number;
    currentSprint: number;
    projUpdates: Update[];
    projHistory: Update[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    projects: Project[];
}