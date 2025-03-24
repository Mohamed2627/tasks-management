import { useCallback, useState } from 'react'
import { cn } from '../../utils/cn'
import { FaTasks } from "react-icons/fa";
import { IoAddSharp, IoStatsChartSharp } from "react-icons/io5";
import { NavLink, Outlet } from 'react-router';
import { FiMenu } from 'react-icons/fi';
import { RxCross2 } from "react-icons/rx";
import ThemeModeSwitcher from './ThemeModeSwitcher';

const RootLayout = () => {
  // States-----------------------------------------
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarNavItems = [
    { name: 'Dashboard', icon: <IoStatsChartSharp className="text-xl" />, href: "/" },
    {
      name: 'Tasks', icon: <FaTasks className="text-xl" />, href: `/tasks`
    },
    { name: 'Add Task', icon: <IoAddSharp className="text-xl" />, href: "/add-task" },
  ]

  const onSideBarNavigationClick = useCallback(() => {
    if (isSidebarOpen) setIsSidebarOpen(false)
  }, [isSidebarOpen])


  return (
    <div className={cn("min-h-[100dvh] flex flex-row relative")}>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 left-[220px] bg-black/50 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={cn("md:flex flex-col w-[220px] min-w-[220px] background-theme border-r border-color fixed md:sticky top-0 min-h-[100dvh] max-h-[100dvh] transition-transform duration-300 z-40", isSidebarOpen ? 'translate-x-0' : '-translate-x-full', "md:translate-x-0")}
      >
        {isSidebarOpen && (
          <button
            className="md:hidden py-2 px-6 cursor-pointer z-50 h-14"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <RxCross2 size={24} />
          </button>
        )}
        <nav className="flex-1 overflow-y-auto">
          {sidebarNavItems.map((item) => (
            <NavLink
              onClick={onSideBarNavigationClick}
              to={item.href}
              key={item.name}
              className={({ isActive }) => cn("w-full font-[500] text-[18px] flex items-center gap-x-3 px-6 py-2 transition-colors", isActive ? "active" : "")}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1 ">
        <nav className={cn("w-full background-theme sticky top-0 flex items-center justify-between md:justify-end h-14 px-4 py-3 border-b border-color md:border-b-0",
          isSidebarOpen ? "justify-end" : ""
        )}>
          {!isSidebarOpen && (
            <button
              className="md:hidden p-2 z-50 cursor-pointer"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FiMenu size={24} />
            </button>
          )}
          <ThemeModeSwitcher />
        </nav>
        <div className="flex-1 paddingX">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout