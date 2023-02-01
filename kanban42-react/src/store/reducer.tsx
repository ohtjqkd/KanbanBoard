import { io, Socket } from 'socket.io-client'
import { combineReducers } from 'redux'
import Cookies from 'universal-cookie'
import ActionTypes from './action.types'

type AuthState = {
  userId: number | undefined
  isLoggedIn: boolean
}

const INITIAL_AUTH_STATE: AuthState= {
  userId: undefined,
  isLoggedIn: false,
}

type MainState = {
  yourWorkspace: Array<any> | undefined
  guestWorkspace: Array<any> | undefined
}

const INITIAL_MAIN_STATE: MainState = {
  yourWorkspace: undefined,
  guestWorkspace: undefined,
}

type ModalState = {
  workspaceModal: object & ({ open: boolean })
  boardModal: object & ({ open: boolean, wsId: number, offsetX: number | undefined, offsetY: number }),
  dropModal: object & ({ open: boolean, component: React.Component | undefined, offsetX: number | undefined, offsetY: number }),
}

const INITIAL_MODAL_STATE: ModalState = {
  workspaceModal: { open: false },
  boardModal: { open: false, wsId: 0, offsetX: undefined, offsetY: 10 },
  dropModal: { open: false, component: undefined, offsetX: undefined, offsetY: 50 },
}

type BoardState = {
  currentBoard: any | undefined
}

const INITIAL_BOARD_STATE: BoardState = {
  currentBoard: undefined,
}

type WorkspaceState = {
  workspaceId?: number
  workspaceObj?: any
}

const workspaceState = {
}

type SocketState = {
  socket: Socket | undefined
}

const INITIAL_SOCKET_STATE = {
  socket: undefined
}

const authReducer = (state: AuthState = INITIAL_AUTH_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.Auth.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.id,
      }
    case ActionTypes.Auth.FETCH:
      // console.log('is logged in', action.payload.isLoggedIn);
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
      }
    case ActionTypes.Auth.LOG_OUT:
      const cookie = new Cookies();
      cookie.remove('access_token', {domain: 'localhost'});
      cookie.remove('refresh_token', {domain: 'localhost'});
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
      }
    case ActionTypes.Auth.RESET:
      return INITIAL_AUTH_STATE
    default:
      return state
  }
}

const mainReducer = (state: MainState = INITIAL_MAIN_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.Init.ON_LOAD_MAIN:
      console.log(state, action.payload);
      if (state === action.payload) return { ...state };
      return {
        ...state,
        yourWorkspace: action.payload.yourWorkspace,
        guestWorkspace: action.payload.guestWorkspace,
      }
    case ActionTypes.Workspace.RESET:
      return INITIAL_MAIN_STATE
    case ActionTypes.Workspace.ADD_BOARD:
      state.yourWorkspace?.find((ele) => {
        if (ele.id === +action.payload.workspaceId) {
          ele.board.push(action.payload.data);
          return ele;
        }
      })
      return {
        ...state,
      }
    case ActionTypes.Workspace.ADD_WORKSPACE:
      console.log(state);
      state.yourWorkspace?.push(action.payload.data);
      console.log(state);
      return {
        ...state
      }
    default:
      return state
  }
}

const boardReducer = (state: BoardState = INITIAL_BOARD_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.Init.ON_LOAD_BOARD:
      if (state.currentBoard === action.payload) {
        console.log('here');
        return {
          ...state,
        };
      }
      return {
        ...state,
        currentBoard: action.payload,
      }
    case ActionTypes.Board.CREATE_LIST:
      state.currentBoard.list.push(action.payload.data);
      return {
        ...state,
      }
    case ActionTypes.Board.CREATE_CARD:
      const target = state.currentBoard.list.filter((ele: any) => ele.id === action.payload.listId)[0];
      target.card.push(action.payload.res.data);
      return {
        ...state,
      }
    case ActionTypes.Board.RESET:
      return INITIAL_BOARD_STATE
    default:
      return state
  }
}

const modalReducer = (state: ModalState = INITIAL_MODAL_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.Modal.WORKSPACE_TOGGLE:
      console.log(state);
      return {
        ...state,
        workspaceModal: {
          open: !state.workspaceModal.open,
        },
      }
    case ActionTypes.Modal.BOARD_TOGGLE:
      return {
        ...state,
        boardModal: {
          open: !state.boardModal.open,
          wsId: action.payload.wsId,
          offsetX: action.payload.offsetX,
          offsetY: state.boardModal.offsetY,
        }
      }
    case ActionTypes.Modal.DROPDOWN_TOGGLE:
      return {
        ...state,
        dropModal: {
          open: !state.dropModal.open,
          component: action.payload.component,
          offsetX: action.payload.x,
          offsetY: state.dropModal.offsetY,
        }
      }
    case ActionTypes.Modal.FETCH_TO_DROPDOWN:
      return {
        ...state,
        dropModal:  {
          open: !state.dropModal.open,
          component: action.payload.component,
          offsetX: action.payload.offsetX,
          offsetY: action.payload.offsetY,
        }
      }
    case ActionTypes.Modal.RESET:
      return INITIAL_MODAL_STATE
    default:
      return state;
  }
}

const socketReducer = (state: SocketState = INITIAL_SOCKET_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.Socket.CONNECT:
      const socket = io('ws://localhost:3000/', {withCredentials: true, transports: ['websocket'] })
      return {
        ...state,
        socket: socket,
      }
    case ActionTypes.Socket.DISCONNECT:
      state.socket?.disconnect();
      return {
        ...state,
        socket: undefined,
      }
    case ActionTypes.Socket.JOIN_BOARD:
      state.socket?.emit('joinToBoard', { boardId: action.payload.boardId });
      return {
        ...state,
      }
    case ActionTypes.Socket.RESET:
      return INITIAL_SOCKET_STATE;
    default:
      return {
        ...state,
      }
  }
}

const rootReducer = combineReducers({
  mainReducer,
  modalReducer,
  authReducer,
  boardReducer,
  socketReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;