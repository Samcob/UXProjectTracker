export interface Updates {
    name: string;
    date: string;
    hours: number;
    updates: string;
}

export interface Project {
    id: string;
    projName: string;
    projTicket: string;
    projSprint: number;
    projUpdates: Updates[];
    projHistory: Updates[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    projects: Project[];
}