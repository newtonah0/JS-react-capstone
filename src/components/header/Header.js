import { Link, useLocation } from 'react-router-dom';
import './header.css';
import {
  IoChevronBackOutline,
  IoMicSharp,
  IoSettingsSharp,
} from 'react-icons/io5';

function Header() {
  const location = useLocation();
  return (
    <div className="header" data-testid="header">
      <nav className="nav">
        <Link to="/">
          <IoChevronBackOutline
            className="backOutline"
            color="#112a46"
            size="4rem"
          />
        </Link>
        {!location.pathname.includes('/details/') && <p className="year">2023</p>}
        {!location.pathname.includes('/details') && <p className="view-title">Categories/Calories</p>}
        {location.pathname.includes('/details') && <p className="view-title">Fruits/Calories</p>}
        <IoMicSharp className="mic-icon" color="#112a46" size="4rem" />
        <IoSettingsSharp className="gear-icon" color="#112a46" size="4rem" />
      </nav>
    </div>
  );
}

export default Header;
