import axios from 'axios';
import { idText } from 'typescript';
import { MemberLogin } from '../interface';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL!;

const apiConfig = {
  withCredentials: true,
}
export const api = {
  auth: {
    isMember: (idBoard: number, userId: string) => {
      return axios.get(BACKEND_URL + `auth/board${idBoard}/user/${userId}`);
    }
  },
  login: (server: string, authToken: string) => {
    return axios.post(BACKEND_URL + 'auth/' + server, {
        authToken: authToken
      }, 
      { 
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      });
  },
  memberLogin: (memberLogin: MemberLogin) => {
    return axios.post(BACKEND_URL + 'auth/member', {
        memberLogin
      }, 
      { 
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      });
  },
  getMainContent: (userId: number) => {
    return axios.get(BACKEND_URL + 'member/maincontent/'+ userId, {
      withCredentials: true,
    });
  },
  getBoardContent: (boardId: number) => {
    return axios.get(BACKEND_URL + 'board/' + boardId, apiConfig);
  },
  createList: (boardId: number, title: string, position: number) => {
    return axios.post(BACKEND_URL + 'list', {
      boardId: boardId,
      title,
      position,
    }, apiConfig);
  },
  createCard: (listId: number, title: string, position: number) => {
    return axios.post(BACKEND_URL + 'card', {
      listId: listId,
      title,
      position,
    }, apiConfig);

  },
  crud: {
    workspace: {
      create: (userId: number, title: string) => {
        return axios.post(BACKEND_URL + 'workspace', {
          ownerId: userId,
          title,
        }, apiConfig)
      },
      update: (...prams: string[]) => {
        return axios.patch(BACKEND_URL + 'workspace', {}, apiConfig);
      },
      delete: (prams: {id: -1}) => {
        return axios.delete(BACKEND_URL + 'workspace' + prams.id, apiConfig);
      }
    },
    board: {
      create: (wsId: number, title: string) => {
        return axios.post(BACKEND_URL + 'board', {
          workspaceId: wsId,
          title: title,
        }, apiConfig)
      },
      update: (id: number, title: string) => {
        return axios.patch(BACKEND_URL + 'board', {
          id,
          title,
        }, apiConfig);
      },
    },
    list: {
      create: (boardId: number, title: string, position: number) => {
        return axios.post(BACKEND_URL + 'list', {
          boardId: boardId,
          title,
          position,
        }, apiConfig);
      },
      update: (id: number, title: string) => {
        return axios.patch(BACKEND_URL + 'list', {
          id,
          title,
        }, apiConfig)
      }
    }
  },
  test: {
    addUserToWs: (wsId: number, userId:number) => {
      return axios.post(BACKEND_URL + 'member', {
        userId: userId,
        workspaceId: wsId,
      }, apiConfig)
    }
  }
}