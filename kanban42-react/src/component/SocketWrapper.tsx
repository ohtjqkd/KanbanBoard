import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Iprops } from '../interface';
import { connectSocket } from '../store/action';
import { RootState } from '../store/reducer';

export default function SocketWrapper({ children }: Iprops) {
  const { socket } = useSelector((state: RootState) => state.socketReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket === undefined) {
      dispatch(connectSocket());
    }
    return () => {
      socket?.disconnect();
    }
  }, [socket])
  return children;
}