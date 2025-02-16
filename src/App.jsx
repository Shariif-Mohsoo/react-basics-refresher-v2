import { Route, Routes } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritiesPage from "./pages/Favorities";
import Layout from "./components/layout/Layout";

const App = function () {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<AllMeetupsPage />} />
        <Route exact path="/new-meetup" element={<NewMeetupPage />} />
        <Route exact path="/favorites" element={<FavoritiesPage />} />
      </Routes>
    </Layout>
  );
};
export default App;

// 1  https://react-app-a-2216a-default-rtdb.firebaseio.com
// 2  https://react-app-a-2216a-default-rtdb.firebaseio.com/
