import { ApiClient } from '../client';
import { BranchPayload, BranchUpdatePayload, Branch, ApiResponseWrapper, PaginatedResponse, BranchListItem } from '../types/branch.types';
export class BranchService {
  constructor(private apiClient: ApiClient) {}

  async createBranch(payload: BranchPayload): Promise<Branch> {
    const response = await this.apiClient.post('branch/branches/', payload);
    if (!response.ok()) {
      throw new Error(`Failed to create branch: ${response.status()} ${await response.text()}`);
    }
    const body: ApiResponseWrapper<Branch> = await response.json();
    return body.data;
  }

  async updateBranch(slug: string, payload: BranchUpdatePayload): Promise<Branch> {
    const response = await this.apiClient.patch(`branch/branches/${slug}/`, payload);
    if (!response.ok()) {
      throw new Error(`Failed to update branch: ${response.status()} ${await response.text()}`);
    }
    const body: ApiResponseWrapper<Branch> = await response.json();
    return body.data;
  }

  async deleteBranch(slug: string): Promise<void> {
    const response = await this.apiClient.delete(`branch/branches/${slug}/`, {});
    if (!response.ok()) {
      throw new Error(`Failed to delete branch: ${response.status()} ${await response.text()}`);
    }
  }

  async getBranch(slug: string): Promise<Branch> {
    const response = await this.apiClient.get(`branch/branches/${slug}/`);
    const body: ApiResponseWrapper<Branch> = await response.json();
    return body.data;
  }

  async getBranchRaw(slug: string) {
    return this.apiClient.get(`branch/branches/${slug}/`);
  }

async listBranches(): Promise<BranchListItem[]> {
  const response = await this.apiClient.get('branch/branches/');
  const body: PaginatedResponse<BranchListItem> = await response.json();
  return body.results;
}
  async createBranchRaw(payload: BranchPayload) {
    return this.apiClient.post('branch/branches/', payload);
  }

async listBranchesRaw() {
  return this.apiClient.get('branch/branches/');
}


}

