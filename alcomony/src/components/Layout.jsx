import LeftNavbar from "./LeftNavbar";

function Layout({ children }) {
  return (
    <div className="flex">
      {/* LeftNavbar is fixed so we don't want it in the normal document flow */}
      <LeftNavbar />
      {/* Apply a left margin equal to the width of the navbar (w-64 = 16rem) */}
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
}

export default Layout;
