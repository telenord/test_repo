export interface GetAppsRequest {
  pageNumber: number;
  pageSize: number;
}

export interface AppOverview {
  appId: string;
  appName: string;
  appSources: string[];
  category: string;
}

export interface GetAppsResponse {
  appRows: AppOverview[];
  totalCount: number;
}

export interface AppsErrorDetail {
  '@type': string;
  additionalProp1: Record<string, unknown>;
  additionalProp2: Record<string, unknown>;
  additionalProp3: Record<string, unknown>;
}

export interface GetAppsErrorResponse {
  code: number;
  details: AppsErrorDetail[];
  message: string;
}

export type User = string;
export type RowModalUser = { name: string; id: string };

export interface GetAppOverviewUsersResponse {
  appUsers: User[];
}

export interface GetAppOverviewUsersResponse {
  appOverview: AppOverview;
}
