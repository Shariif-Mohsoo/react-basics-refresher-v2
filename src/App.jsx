import { Route, Routes } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritiesPage from "./pages/Favorities";

import MainNavigation from "./components/layout/MainNavigation";

const App = function () {
  return (
    <div>
      <MainNavigation />
      <Routes>
        <Route exact path="/" element={<AllMeetupsPage />} />
        <Route exact path="/new-meetup" element={<NewMeetupPage />} />
        <Route exact path="/favorites" element={<FavoritiesPage />} />
      </Routes>
    </div>
  );
};
export default App;
