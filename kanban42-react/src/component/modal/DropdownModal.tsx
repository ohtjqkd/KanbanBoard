import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/reducer'

export default function DropdownModal() {
  const { dropModal } = useSelector((state: RootState) => state.modalReducer);
  useEffect(() => {
  }, [dropModal])
  return (
    <div className={"header-dropdown modal-form" + (dropModal.open ? '' : ' hidden')} style={{left: dropModal.offsetX, top: dropModal.offsetY }}>
      {dropModal.component}
    </div>
  )
}