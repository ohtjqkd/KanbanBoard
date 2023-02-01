import axios from 'axios'
import React from 'react';
import { api } from '../api';
import ActionTypes from './action.types'

export const fetchWorkspace = async () => {
  const response = await axios.get('http://localhost:3000/workspace/1');
  return {
    type: ActionTypes.Workspace.FETCH_WORKSPACE,
    payload: response.data
  }
}

export const login = async (payload: any) => {
  console.log(payload);
  return {
    type: ActionTypes.Auth.LOG_IN,
    payload: payload
  }
}

export const fetchUser = (payload: any) => {
  console.log(payload);
  return {
    type: ActionTypes.Auth.FETCH,
    payload: payload
  }
}

export const onLoadMain = async (userId: number) => {
  const mainContent = await api.getMainContent(userId);
  return {
    type: ActionTypes.Init.ON_LOAD_MAIN,
    payload: mainContent.data,
  }
}

export const onLoadBoard = async (boardId: number) => {
  const boardContent = await api.getBoardContent(boardId);
  return {
    type: ActionTypes.Init.ON_LOAD_BOARD,
    payload: boardContent.data,
  }
}

export const addWorkspace = (data: any) => {
  return {
    type: ActionTypes.Workspace.ADD_WORKSPACE,
    payload: {
      data,
    }
  }
}

export const addBoard = (workspaceId: number, data: any) => {
  console.log(workspaceId, data);
  return {
    type: ActionTypes.Workspace.ADD_BOARD,
    payload: {
      workspaceId,
      data,
    }
  }
}

export const fetchToDropdownModal = ( { offsetX, offsetY, component }: { offsetX: number, offsetY: number, component: JSX.Element} ) => {
  return {
    type: ActionTypes.Modal.FETCH_TO_DROPDOWN,
    payload: {
      offsetX,
      offsetY,
      component,
    }
  }
}

export const connectSocket = () => {
  return {
    type: ActionTypes.Socket.CONNECT,
    payload: undefined,
  }
}

export const disconnectSocket = () => {
  return {
    type: ActionTypes.Socket.DISCONNECT,
    payload: undefined,
  }
}

export const joinToBoard = (boardId: number) => {
  return {
    type: ActionTypes.Socket.JOIN_BOARD,
    payload: {
      boardId,
    },
  }
}

export const createList = async (boardId: number, title: string, position: number) => {
  const res = await api.createList(boardId, title, position);
  return {
    type: ActionTypes.Board.CREATE_LIST,
    payload: res,
  }
}

export const createCard = async (listId: number, title: string, position: number) => {
  const res = await api.createCard(listId, title, position);
  return {
    type: ActionTypes.Board.CREATE_CARD,
    payload: {
      res,
      listId,
    }
  }
}