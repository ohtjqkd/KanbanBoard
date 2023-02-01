import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/reducer'

export default function DropdownWorkspace() {
  const { yourWorkspace, guestWorkspace } = useSelector((state: RootState) => state.mainReducer);
  useEffect(() => {
  }, [yourWorkspace, guestWorkspace])
  return (
    <div className="drop-container">
      <div className="drop-title">
        Workspace
      </div>
      <div className="workspace-cat">
        <div className="workspace-kind">
          <div className="workspace-kind-title">
            Current Workspace
          </div>
          <div className="workspace-list">
          </div>
        </div>
        <div className="workspace-kind">
          <div className="workspace-kind-title">
            Your Workspace
          </div>
          <div className="workspace-list">
            {
              yourWorkspace?.map((ele: any) => {
                return (
                  <NavLink key={ele.id} to={`/workspace/${ele.id}`}>
                    <div className="workspace-tile">
                      <div className="workspace-title">
                        {ele.title}
                      </div>
                    </div>
                  </NavLink>
                )
              })
            }
          </div>
        </div>
        <div className="workspace-kind">
          <div className="workspace-kind-title">
            Guest Workspace
          </div>
          <div className="workspace-list">
            {
              guestWorkspace?.map((ele: any) => {
                return (
                  <div key={ele.workspaceId} className="workspace-tile">
                    <div className="workspace-title">
                      {ele.title}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}