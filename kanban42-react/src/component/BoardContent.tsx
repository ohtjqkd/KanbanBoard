import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { api } from '../api';
import { createList } from '../store/action';
import { RootState } from '../store/reducer';
import InstantAddForm from './InstantAddForm';
import InstantUpdateForm from './InstantUpdateForm';
import List from './List';

export default function BoardContent() {
  const { id } = useParams();
  const { currentBoard } = useSelector((state: RootState) => state.boardReducer);
  useEffect(() => {

  }, [currentBoard]);
  return (
    // {console.log(currentBoard?.title)}
    <div className="board-container">
      <InstantUpdateForm
        value={currentBoard?.title}
        id={currentBoard?.id}
        name='board-title'
        api={api.crud.board.update} />
      <div className="board-content">
        {
          currentBoard?.list.map((ele: any) => {
            return (<List key={ele.id} list={ele}></List>)
          })
        }
        <div className='list-wrapper'>
          <InstantAddForm 
            id={id} 
            target='list'
            length={currentBoard?.list.length}
            dispatch={createList}/>
        </div>
      </div>
    </div>
  )
}