import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { api } from '../../api';
import { addWorkspace } from '../../store/action';
import ActionTypes from '../../store/action.types';
import { RootState } from '../../store/reducer';

export default function CreateWorkspaceModal() {
  const { userId } = useSelector((state: RootState) => state.authReducer);
  const { workspaceModal } = useSelector((state: RootState) => state.modalReducer);
  const [ wsTitle, setWsTitle ] = useState('');
  const dispatch = useDispatch();

  const createWorkspace = async (e: any) => {
    e.preventDefault();
    const res = await api.crud.workspace.create(userId, e.target[0].value);
    dispatch(addWorkspace(res.data));
    closeModal(e);
    console.log(res);
  }
  const changeTitle = (e: any) => {
    setWsTitle(e.target.value);
  }

  const closeModal = (e: any) => {
    if (e.target.classList.contains('window-wrapper')) dispatch({ type: ActionTypes.Modal.WORKSPACE_TOGGLE });
  }
  useEffect(() => {
  }, [workspaceModal])
  return (
    <div id='workspace-modal' className={'modal-form' + (workspaceModal.open ? '' : ' hidden')}>
      <div className="window-wrapper" onClick={closeModal} tabIndex={-1}>
        <form onSubmit={createWorkspace}>
          <input type="text" /> {/*onChange={changeTitle}/>*/}
          <button type='submit'>create workspace</button>
        </form>
      </div>
    </div>
  )
}
