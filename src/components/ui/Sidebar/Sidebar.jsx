import Logo from "../../brand/Logo";
import MainNav from "../../navigation/MainNav";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`p-8 px-6 border-r border-gray-200 row-span-full flex flex-col gap-8 bg-white dark:bg-neutral-800 shadow transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/*  logo */}
      <Logo />

      {/*  main nav */}
      <MainNav toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Sidebar;
