import { Archive, CalendarDays, FileText, LayoutDashboard, Menu, Users, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {

  const [isOpen, setIsOpen] = useState(false);
    const menuItems = [
    { path: "/", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/daily-sessions", name: "Daily Sessions", icon: <CalendarDays size={20} /> },
    { path: "/group-management", name: "Group Management", icon: <Users size={20} /> },
    { path: "/monthly-notes", name: "Monthly Notes", icon: <FileText size={20} /> },
    { path: "/session-archive", name: "Session Archive", icon: <Archive size={20} /> },
  ];
return (
    <>

      <button className="lg:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`fixed lg:static inset-y-0 w-64 min-h-full  border-0 lg:border-e-2 md:border-e-2 left-0 z-50 bg-white   p-4 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="mb-8 p-2 font-bold text-xl">Training System</div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}
    </>
  );
}
