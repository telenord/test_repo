import { GetAppsRequest, GetAppsResponse } from '../types';

const requestHeaders = {
  'ngrok-skip-browser-warning': '69420',
};

//TODO: add to env
const BASE_URL = '/api/';

const makeUrl = (path: string) => `${BASE_URL}${path}`;

export const getApps = (data: GetAppsRequest) => {
  return fetch(makeUrl('get-apps'), {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }) as unknown as Promise<GetAppsResponse>;
};

export const getAppOverviewUsers = (appId: string) => {
  return fetch(makeUrl(`get-app-overview-users/${appId}`), {
    headers: requestHeaders,
  });
};

export const getAppOverviews = (appId: string) => {
  return fetch(makeUrl(`get-app-overview/${appId}`), {
    headers: requestHeaders,
  });
};
