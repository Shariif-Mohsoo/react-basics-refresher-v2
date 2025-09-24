import Sidebar from "./components/Sidebar";

import Link from "./components/Link";
import Route from "./components/Route";

import AccordionPage from "./pages/AccordionPage";
import DropdownPage from "./pages/DropdownPage";
import ButtonPage from "./pages/ButtonPage";
import ModalPage from "./pages/ModalPage";
import TablePage from "./pages/TablePage";
import CounterPage from "./pages/CounterPage";

const App = () => {
  return (
    <div className=" ml-2 container mx-auto grid grid-cols-6 gap-4 mt-4">
      {/* <Link to="/accordion">Go Accodion</Link>
      <Link to="/dropdown">Go Dropdown</Link>
       */}
      <Sidebar />

      <div className="col-span-5 border-amber-100">
        <Route path="/">
          <DropdownPage />
        </Route>
        <Route path="/accordion">
          <AccordionPage />
        </Route>
        <Route path="/buttons">
          <ButtonPage />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
        <Route path="/modal">
          <ModalPage />
        </Route>
        <Route path="/counter">
          <CounterPage />
        </Route>
      </div>
    </div>
  );
};

export default App;
