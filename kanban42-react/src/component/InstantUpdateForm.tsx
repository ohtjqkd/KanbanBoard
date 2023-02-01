import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWorkspace } from '../store/action';
import { RootState } from '../store/reducer';
// 
export default function InstantUpdateForm(props: any) {
  const [ open, setOpen ] = useState(false);
  const [ currentValue, setCurrentValue ] = useState(props.value);
  const [ tmpValue, setTmpValue ] = useState(currentValue);
  const valueInput = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (valueInput.current !== null) valueInput.current.focus();
  })

  useEffect(() => {
    if (currentValue === undefined) setCurrentValue(props.value);
    if (tmpValue === undefined) setTmpValue(currentValue);
  }, [currentValue, props.value]);
  const onClickValue = (e: any) => {
    e?.preventDefault();
    setOpen(true);
  }

  const onChangeInput = (e: any) => {
    setTmpValue(e.target.value);
  }

  const onModified = async (e: any) => {
    if (currentValue !== tmpValue) {
      try {
        await props.api(props.id, tmpValue);
        setCurrentValue(tmpValue);
        console.log(currentValue, tmpValue);
      } catch (e) {
        console.log(e);
        setTmpValue(currentValue);
      }
    }
    setOpen(false);
  }
  return (
    <div className={props.name + '-wrapper'} onClick={onClickValue}>
      <div className={props.name + (open ? ' hidden' : '')}>
        {currentValue}
      </div>
      <form onSubmit={onModified}>
        <textarea 
          ref={valueInput}
          onBlur={onModified}
          onChange={onChangeInput}
          className={"list-header-name mod-list-name js-list-name-input " + (open ? '': ' hidden')} 
          aria-label={currentValue}
          spellCheck={false}
          dir="auto" 
          maxLength={512} 
          defaultValue={props.value}
          data-autosize="true">
        </textarea>
        <button type='submit' className='hidden'>submit</button>
      </form>
    </div>
  )
}