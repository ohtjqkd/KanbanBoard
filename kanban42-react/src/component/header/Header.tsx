import ButtonGroup from './ButtonGroup';
import DotButton from './DotButton';
import HomeLogo from './HomeLogo';
import Account from './Account';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <div id="header">
      <nav className="header-container">
        <DotButton />
        <HomeLogo />
        <ButtonGroup />
        <div className="header-middle-section"></div>
        <SearchBar />
        <Account />
      </nav>
    </div>
  )
}