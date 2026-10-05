export interface AuthenticatedUser {}

export interface BranchSummary {
    id: number;
    name: string;
    slug: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    user: AuthenticatedUser;
    branch: string | null;
    branches: BranchSummary[];
    role_info: Record<string, unknown>;
    organization: Record<string, unknown>;
}