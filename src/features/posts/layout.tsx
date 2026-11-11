
import { Outlet } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <a href="/" className="font-reading text-xl font-semibold">
            Posts Reader
          </a>

          <ModeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
