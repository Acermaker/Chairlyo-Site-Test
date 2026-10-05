export type BranchStatus = 'active' | 'inactive';

export interface BranchPayload {
  name: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  status: BranchStatus;
  branch_admin: BranchAdminData;
}

export interface BranchAdminData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

export interface BranchUpdatePayload {
  name?: string;
  slug?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: BranchStatus;
}

export interface Branch {
  id: number;
  name: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  status: BranchStatus;
  is_active: boolean;            
  admin: BranchAdminResponse;     
  timezone: string;                
  effective_timezone: string;       
  created_at: string;              
  updated_at: string;               
  created_by: CreatedByUser;        
  updated_by: CreatedByUser | null; 
}


export interface BranchAdminResponse {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface CreatedByUser {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiResponseWrapper<T> {
  success: boolean;
  message: string;
  data: T;
}


export interface BranchListItem {
  id: number;
  name: string;
  slug: string;
  address: string;
  status: BranchStatus;
  is_active: boolean;
  timezone: string | null;
  effective_timezone: string;
  staff_count: number;
  user_count: number;
  admin: BranchAdminResponse;
  created_at: string;
  created_by: CreatedByUser;
  updated_by: CreatedByUser | null;
}