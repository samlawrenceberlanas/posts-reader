import { Outlet } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";

const Layout = () => {
  return (
    <div className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <header className="flex items-center justify-between gap-5">
          <span className="text-lg font-medium tracking-[-0.01em]">
            Posts
          </span>

          <ModeToggle />
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;