import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ActionTypes from '../store/action.types';
import { RootState } from '../store/reducer';

export default function Navigator() {
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch({type: ActionTypes.Modal.WORKSPACE_TOGGLE});
  }
  return (
    <div className="home-nav">
      <ul className="nav-to-board">
        <NavLink to={'/'}> Board </NavLink>
      </ul>
      <div className="nav-workspace-list">
        <div className="nav-list-title">
          Workspace
        </div>
        <button className="create-workspace" onClick={toggleModal}>
          +
        </button>
      </div>
    </div>
  )
}