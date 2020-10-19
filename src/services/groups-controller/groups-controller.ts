import { Group, FullGroupInfo, GroupPosts, GroupRequestProps, GroupUser } from '../../types/group';
// const local = "http://localhost:3000/";
const web = 'http://91.241.64.178:5561/';

interface FetchData {
  method: string;
}

export default class {
  static urlBase = web;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async fetching(path: string, data?: FetchData): Promise<any> {
    const res: Response = await fetch(`${this.urlBase}${path}`, data);
    if (!res.ok) {
      throw new Error(`Fetching user-controller is status error ${res.status}`);
    }
    return res.json();
  }

  static async apiGroups(page = 1, size = 15): Promise<Group[]> {
    return this.fetching(`api/groups/all?page=${page}&size=${size}`);
  }

  static async apiGroupInfo(id: string, page = 1, size = 15): Promise<GroupPosts[]> {
    return this.fetching(`api/groups/${id}/posts?page=${page}&size=${size}`);
  }

  static async apiSingleGroup(id: string): Promise<FullGroupInfo> {
    return this.fetching(`api/groups/${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async apiLoadUsers({ userId, groupId }: GroupRequestProps): Promise<GroupUser[]> {
    return this.fetching(`api/groups/${groupId}/users`);
  }

  static async apiJoinGroup({ userId, groupId }: GroupRequestProps): Promise<string> {
    const res: Response = await fetch(`${this.urlBase}api/groupsHasUsers/add?groupId=${groupId}&userId=${userId}`, {
      method: 'POST',
    });
    if (!res.ok) {
      throw new Error(`Fetching user-controller is status error ${res.status}`);
    }
    return res.text();
  }

  static async apiLeaveGroup({ userId, groupId }: GroupRequestProps): Promise<string> {
    const res: Response = await fetch(`${this.urlBase}api/groupsHasUsers/delete?groupId=${groupId}&userId=${userId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Fetching user-controller is status error ${res.status}`);
    }
    return res.text();
  }
}
