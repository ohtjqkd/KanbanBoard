import { NavLink } from 'react-router-dom';

export default function HomeLogo() {
  return (
    <div className="home-logo-section">
      <NavLink className='home-logo' to={'/'}>
        <div>
          <div className="home-logo-btn">
          </div>
        </div>
      </NavLink>
    </div>
  )
}