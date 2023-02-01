import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Workspace from './Workspace';

export default function MainWorkspace() {
  const { yourWorkspace, guestWorkspace } = useSelector((state: RootState) => state.mainReducer);
  console.log('mainworkspace rending time', Date.now().toString())
  useEffect(() => {
    console.log('useEffect', Date.now().toString());
  }, [yourWorkspace, guestWorkspace])
  return (
    <div className="workspace-wrapper">
      <div className='workspace-list'>
        <div className='workspace-cat'>
          Your Workspaces
        </div>
        {
          yourWorkspace?.map((ele: any) => {
            return (<Workspace key={ele.id} workspace={ele}></Workspace>)
          })
        }
      </div>
      <div className='workspace-list'>
        <div className='workspace-cat'>
          Guest Workspaces
        </div>
        {
          guestWorkspace?.map((ele: any) => {
            return (<Workspace key={ele.id} workspace={ele}></Workspace>)
          })
        }
      </div>
    </div>
  )
}