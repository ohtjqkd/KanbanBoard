import { useDispatch } from 'react-redux';
import { fetchToDropdownModal } from '../../store/action';
import ActionTypes from '../../store/action.types';
import Account from './Account';
import DropdownRecent from './DropdownRecent';
import DropdownWorkspace from './DropdownWorkspace';

export default function ButtonGroup() {
  const dispatch = useDispatch();
  const openDrop = (e: any) => {
    const offsetX = e.currentTarget.offsetLeft + 10;
    const offsetY = 50;
    switch (e.currentTarget.innerText) {
      case 'Workspace':
        dispatch(fetchToDropdownModal({ offsetX, offsetY, component: <DropdownWorkspace />}));
        break;
      case 'Recent':
        dispatch(fetchToDropdownModal({ offsetX, offsetY, component: <DropdownRecent />}))
        break;
      default:
        break;
    }
    console.log(e.target.innerText);
  }
  return (
    <div className="header-btn-section">
      <button className="dropdown-btn hover" onClick={openDrop}>
        Workspace
        <span>
          <span className="sc-bdVaJa ifeHxY" role="img" aria-label="DownIcon">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
          </span>
        </span>
      </button>
      <button className="dropdown-btn hover" onClick={openDrop}>
        Recent
        <span>
          <span className="sc-bdVaJa ifeHxY" role="img" aria-label="DownIcon">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
          </span>
        </span>
      </button>
      <button className="dropdown-btn hover" onClick={openDrop}>
        Starred
        <span>
          <span className="sc-bdVaJa ifeHxY" role="img" aria-label="DownIcon">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
          </span>
        </span>
      </button>
      <button className="dropdown-btn hover" onClick={openDrop}>
        Template
        <span>
          <span className="sc-bdVaJa ifeHxY" role="img" aria-label="DownIcon">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
          </span>
        </span>
      </button>
      <div className="empty-space"></div>
    </div>
  )
}