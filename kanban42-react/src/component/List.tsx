import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../api';
import { createCard } from '../store/action';
import { RootState } from '../store/reducer';
import Card from './Card';
import InstantAddForm from './InstantAddForm';
import InstantUpdateForm from './InstantUpdateForm';

export default function List(props: any) {
  // const [ open, setOpen ] = useState(false);
  // const [ currentTitle, setCurrentTitle ] = useState(props.list.title);
  // const [ tmpTitle, setTmpTitle ] = useState(currentTitle);
  const { currentBoard } = useSelector((state: RootState) => state.boardReducer);
  const [ createCardForm, setCreateCardForm ] = useState(false);
  // const titleInput = useRef<HTMLTextAreaElement>(null);

  // useLayoutEffect(() => {
  //   if (titleInput.current !== null) titleInput.current.focus();
  // })
  // const onClickTitle = (e: any) => {
  //   e?.preventDefault();
  //   setOpen(true);
  // }

  // const onFocusOutTitle = async (e: any) => {
  //   if (currentTitle !== tmpTitle) {
  //     api.crud.list.update(props.list.id, tmpTitle).then((res) => {
  //       console.log(res);
  //       setCurrentTitle(tmpTitle);
  //     }).catch((err) => {
  //       console.log(err);
  //       setTmpTitle(currentTitle);
  //     })
  //   }
  //   setOpen(false);
  // }


  useEffect(() => {
    // console.log(open);
  }, [currentBoard, createCardForm])

  return (
    <div className="list-wrapper">
      <div className="list-box">
        <InstantUpdateForm
          value={props.list.title}
          id={props.list.id}
          name='list-title'
          api={api.crud.list.update} />
        {/* <div className="list-title-wrapper" onClick={onClickTitle}>
          <div className={"list-title" + (open ? ' hidden' : '')}>
            {currentTitle}
          </div>
          <textarea 
            ref={titleInput}
            onBlur={onFocusOutTitle}
            onChange={onChangeText}
            className={"list-header-name mod-list-name js-list-name-input " + (open ? '': ' hidden')} 
            aria-label={currentTitle}
            spellCheck={false}
            dir="auto" 
            maxLength={512} 
            defaultValue={props.list.title}
            data-autosize="true">
          </textarea>
        </div> */}
        <div className="card-container">
          {
            props.list.card?.map((ele: any) => {
              return (<Card key={ele.id} card={ele}></Card>)
            })
          }
        </div>
        <div className="list-tail-btn">
          <InstantAddForm 
            id={props.list.id}
            length={props.list.card.length}
            target='card'
            dispatch={createCard} />
        </div>
      </div>
    </div>
  )
}