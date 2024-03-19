import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

import Header from "./components/Header";

// Layouts
import Default from "./layouts/Default";
import Protected from "./layouts/Protected";
import MyFavList from "./pages/Index";
import Error from "./pages/Error";

function App() {
  return (
    <Fragment>
      {/* Header */}
      <Header />
      {/* Routes */}
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<Protected />}>
          <Route path="/" element={<MyFavList />} />
        </Route>

        {/* Allowed Routes */}
        <Route path="/" element={<Default />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Handle 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Fragment>
  );
}

export default App;
