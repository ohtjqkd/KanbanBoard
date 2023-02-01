import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { onLoadMain } from '../store/action';
import { RootState } from '../store/reducer';
import MainWorkspace from './MainWorkspace';

export default function DashBoard() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.authReducer);
  async function load() {
    dispatch(await onLoadMain(+userId!));
  }
  useEffect(() => {
    if (!!userId) load();
  }, [userId])
  return (
    <div className='main-content'>
      <MainWorkspace/>
    </div>
  )
}