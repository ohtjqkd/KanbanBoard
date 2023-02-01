import { ReactChildren, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { api } from '../../api'
import { RootState } from '../../store/reducer'

export default function PermissionsContext({ idBoard, children }: { idBoard: number, children: ReactChildren}) {
  const { userId } = useSelector((state: RootState) => state.authReducer.userId)
  const data = api.auth.isMember(idBoard, userId);

  const canEdit = useCallback(() => {
    if (!data) return false;
    return true
  }, [data]);
  return (
    <div></div>
  )
}