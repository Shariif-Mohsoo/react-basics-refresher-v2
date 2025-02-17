import { Link } from "react-router-dom";
import { useContext } from "react";

import FavoritesContext from "../../store/favorities-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const favoritiesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add New Meetups</Link>
          </li>
          <li>
            <Link to="/favorites">
              My Favorites
              <span className={classes.badge}>
                {favoritiesCtx.totalFavorities}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
