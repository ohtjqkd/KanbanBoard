import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer';

export default function InstantAddForm(props: any) {
  const { socket } = useSelector((state: RootState) => state.socketReducer);
  const { currentBoard } = useSelector((state: RootState) => state.boardReducer);
  const [ isIdle, setIsIdle ] = useState('is-idle');
  // const [ input, setInput ] = useState('');
  const dispatch = useDispatch();
  const openForm = (e: any) => {
    setIsIdle('');
  }

  const closeForm = () => {
    setIsIdle('is-idle');
  }

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    dispatch(await props.dispatch(+props.id, e.target[0].value, props.length));
    socket?.emit('msgToServer', { target: props.target, tye: 'add', id: props.id});
    socket?.send()
    setIsIdle('is-idle');
    // setInput('');
    e.target.reset();
  }

  const onChangeInput = (e: any) => {
    // setInput(e.target.value);
  }

  useEffect(() => {
  }, [isIdle])

  return (
    <div className={`create-${props.target} mod-add ${isIdle}`}>
      <button onClick={openForm}>Add {props.target}</button>
      <form onSubmit={handleSubmit}>
        <input placeholder='enter title' type='text' name='title'/>
        <div className="btn-container">
          <button type='submit'>ADD</button>
          <button type='button' onClick={closeForm}>X</button>
        </div>
      </form>
    </div>
  )
}
