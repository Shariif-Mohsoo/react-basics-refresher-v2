import { useContext } from "react";
import FavoritiesContext from "../store/favorities-context";
import MeetupList from "../components/meetups/MeetupList";

const FavoritiesPage = () => {
  const favoritiesCtx = useContext(FavoritiesContext);
  let content;
  if (favoritiesCtx.totalFavorities) {
    content = <MeetupList meetups={favoritiesCtx.favorities} />;
  } else {
    content = <p>You got no favorites yet. Start adding some?</p>;
  }
  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
};

export default FavoritiesPage;
