export interface Project {

    id: string;

    name: string;

    description: string;

    created_at: string;

    updated_at: string;

    papers?: number;

    drafts?: number;

    status?: string;

    progress?: number;
}

export interface CreateProjectInput {

    name: string;

    description: string;
}