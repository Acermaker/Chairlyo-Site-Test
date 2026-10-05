import { APIRequestContext, APIResponse } from '@playwright/test';

const BASE_URL = 'https://qa03.base.chairlyo.com/api';

export class ApiClient {
  private authToken: string | null = null;

  constructor(private readonly context: APIRequestContext) {}

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private get authHeaders(): Record<string, string> {
    return this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {};
  }

  get(path: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.context.get(`${BASE_URL}/${path}`, { headers: this.authHeaders, params });
  }

  post(path: string, data: unknown): Promise<APIResponse> {
    return this.context.post(`${BASE_URL}/${path}`, { headers: this.authHeaders, data });
  }

  put(path: string, data: unknown): Promise<APIResponse> {
    return this.context.put(`${BASE_URL}/${path}`, { headers: this.authHeaders, data });
  }

  patch(path: string, data: unknown): Promise<APIResponse> {
    return this.context.patch(`${BASE_URL}/${path}`, { headers: this.authHeaders, data });
  }

  delete(path: string, data: unknown): Promise<APIResponse> {
    return this.context.delete(`${BASE_URL}/${path}`, { headers: this.authHeaders, data });
  }
}