import { Outlet } from "react-router-dom";
import NavbarLoggedIn from "./NavbarLoggedIn";

const Layout = () => {
  return (
    <>
      <NavbarLoggedIn />
      <main className="pt-16 px-4 sm:px-8">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
