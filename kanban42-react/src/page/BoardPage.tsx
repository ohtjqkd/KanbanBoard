import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import BoardContent from '../component/BoardContent';
import { joinToBoard, onLoadBoard } from '../store/action';
import { RootState } from '../store/reducer';

export default function BoardPage(props: any) {
  const { id } = useParams();
  const { socket } = useSelector((state: RootState) => state.socketReducer);
  const dispatch = useDispatch();
  const load = async () => {
    dispatch(await onLoadBoard(+id!));
  }
  socket?.emit('joinToBoard', { boardId: id });
  socket?.on('msgToClient', (data) => {
    if (data.command.toString() === 'reload') load();
  })
  useEffect(() => {
    if (!!id) {
      dispatch(joinToBoard(+id!));
      load()
    };
  }, [id])
  return (
    <main id="popover-boundary">
      <BoardContent />
    </main>
  )
}