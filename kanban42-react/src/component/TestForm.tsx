import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { api } from '../api'
import { fetchWorkspace } from '../store/action';
import { RootState } from '../store/reducer';

export default function TestForm() {
  const dispatch = useDispatch();
  const [wsTitle, setWsTitle] = useState('');
  const [wsId, setWsId] = useState(-1);
  const [boardTitle, setBoardTitle] = useState('');
  const [otherUserId, setOtherUserId] = useState(-1);
  const { userId } = useSelector((state: RootState) => state.authReducer);
  const { yourWorkspace } = useSelector((state: RootState) => state.mainReducer);
  const createWorkspace = async (e: any) => {
    e?.preventDefault();
    const createdWS = await api.crud.workspace.create(userId, wsTitle);
    // dispatch(fetchWorkspace);
    console.log(createdWS);
  }
  const createBoard = async (e: any) => {
    e?.preventDefault();
    await api.crud.board.create(wsId, boardTitle);
  }
  const addMember = async (e: any) => {
    e?.preventDefault();
    await api.test.addUserToWs(wsId, otherUserId);
  }


  return (
    <div className="test-form">
      <form onSubmit={createWorkspace}>
        <input onChange={(e) => setWsTitle(e.target.value)} type="text" name="wsTitle"/>
        <button type='submit'>add workspace</button>
      </form>
      <form onSubmit={createBoard}>
        <input onChange={(e) => setWsId(+e.target.value)} type="text" name="wsId"/>
        <input onChange={(e) => setBoardTitle(e.target.value)} type="text" name="boardTitle"/>
        <button type='submit'>add board</button>
      </form>
      <form onSubmit={addMember}>
        <input onChange={(e) => setWsId(+e.target.value)} type="text" name="wsId"/>
        <input onChange={(e) => setOtherUserId(+e.target.value)} type="text" name="other member"/>
        <button type='submit'>add member</button>
      </form>
      <NavLink to='/board/1'>to board 1</NavLink>
    </div>
  )
}