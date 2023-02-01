import { NavLink } from 'react-router-dom';

export default function Board(props: any) {
  return (
    <NavLink to={'/board/' + props.board.id }>
      <div className='board-card-content'>
        <div className="board-tile">
          <div className="board-card-title">
            {props.board.title}
          </div>
        </div>
      </div>
    </NavLink>
  )
}