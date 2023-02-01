import { Fragment } from 'react';
import CreateBoardModal from './CreateBoardModal';
import CreateWorkspaceModal from './CreateWorkspaceModal';
import DropdownModal from './DropdownModal';

export default function ModalSet() {
  return (
    <Fragment>
      <CreateBoardModal />
      <CreateWorkspaceModal />
      <DropdownModal />
    </Fragment>
  )
}