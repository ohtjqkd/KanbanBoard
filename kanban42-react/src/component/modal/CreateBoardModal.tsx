import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { api } from '../../api';
import { addBoard } from '../../store/action';
import ActionTypes from '../../store/action.types';
import { RootState } from '../../store/reducer'

export default function CreateBoardModal() {
  const { boardModal } = useSelector((state: RootState) => state.modalReducer);
  const { yourWorkspace } = useSelector((state: RootState) => state.mainReducer);
  const dispatch = useDispatch();
  // const [ boardTitle, setBoardTitle ] = useState('');
  // const [ wsId, setWsId ] = useState(undefined);
  const closeModal = () => {
    dispatch({type: ActionTypes.Modal.BOARD_TOGGLE, payload: {
      offsetX: boardModal.offsetX, offsetY: boardModal.offsetY
    }});
  }
  const handleSubmit = async (e: any) => {
    console.log(e.target[0].value);
    e.preventDefault();
    const res = await api.crud.board.create(e.target[1].value, e.target[0].value);
    dispatch(addBoard(e.target[1].value, res.data));
    e.target.reset();
    closeModal();
  }

  useEffect(() => {
  }, [boardModal, yourWorkspace])

  return (
    <div id="board-modal" className={'modal-form' + (boardModal.open ? '' : ' hidden')} style={{left: boardModal.offsetX}}>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <select name="workspace" id="board-modal-option" key={boardModal.wsId} defaultValue={boardModal.wsId}>
          {
            yourWorkspace?.map((ele: any) => {
              return (<option key={ele.id} value={ele.id}>{ele.title}</option>)
            })
          }
        </select>
        <div className="bnt-container">
          <button type="submit">Create Board</button>
        </div>
      </form>
    </div>
  )
}