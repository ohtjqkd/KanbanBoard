import { useDispatch } from 'react-redux';
import ActionTypes from '../store/action.types';
import Board from './Board';

export default function Workspace(props: any) {
  const dispatch = useDispatch();
  const toggleModal = (e: any) => {
    const x = e.target.offsetLeft + e.target.offsetWidth + 10;
    dispatch({ type: ActionTypes.Modal.BOARD_TOGGLE, payload: { wsId: props.workspace.id, x: x }});
  }
  return (
    <div className='workspaces'>
      <div className='workspace-header'>
        <div className="workspace-title">
          {props.workspace.title}
        </div>
        <div className="workspace-header btn-section">
          <button>Board</button>
          <button>View</button>
          <button>Members</button>
          <button>Settings</button>
        </div>
      </div>
      <div className="board-list">
        {
          props.workspace.board?.map(function(ele:any, index: number) {
            console.log();
            return (
              <div className="board-card" key={index}>
                <Board board={ele}></Board>
              </div>
            )
          })
        }
        <div className="create-board-card board-card" onClick={toggleModal}>
          <div className="board-tile">
            Create new board
          </div>
        </div>
      </div>
    </div>
  )
}