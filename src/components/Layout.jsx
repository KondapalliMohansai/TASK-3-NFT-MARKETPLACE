import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Grid2X2, ClipboardList, Heart, Star, CircleUserRound, Settings, LogOut, Sun, Moon, Bell, Search, Hexagon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", icon: Grid2X2, label: "Home" },
  { to: "/bids", icon: ClipboardList, label: "Bids" },
  { to: "/saved", icon: Heart, label: "Saved" },
  { to: "/collections", icon: Star, label: "Collections" },
  { to: "/profile", icon: CircleUserRound, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Layout({ children }) {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const submitSearch = (e) => {
    e.preventDefault();
    const value = query.trim();
    navigate(value ? `/?q=${encodeURIComponent(value)}` : "/");
  };

  return (
    <div className={dark ? "min-h-screen bg-ink text-white" : "min-h-screen bg-[#f6f4ff] text-[#17132f]"}>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[80px] bg-[#191631] md:flex flex-col items-center py-7">
        <button aria-label="Go home" onClick={() => navigate("/")} className="grid h-[30px] w-[30px] place-items-center rounded-[6px] bg-purple text-white">
          <Hexagon size={21} strokeWidth={2.8}/>
        </button>
        <nav className="mt-10 flex flex-1 flex-col items-center gap-7">
          {nav.map(({to, icon: Icon, label}) => (
            <NavLink key={to} to={to} title={label} className={({isActive}) => `grid h-9 w-9 place-items-center rounded-lg transition ${isActive ? "bg-purple/15 text-purple" : "text-[#7a7890] hover:bg-white/5 hover:text-white"}`}>
              <Icon size={21} strokeWidth={1.7}/>
            </NavLink>
          ))}
        </nav>
        <button aria-label="Sign out" onClick={() => navigate("/")} className="grid h-9 w-9 place-items-center rounded-lg text-[#7a7890] hover:bg-white/5 hover:text-white"><LogOut size={20}/></button>
      </aside>

      <header className={`fixed left-0 right-0 top-0 z-40 h-[88px] md:left-[80px] ${dark ? "bg-ink" : "bg-[#f6f4ff]"}`}>
        <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-5 md:pl-[38px] md:pr-[50px] xl:px-[70px]">
          <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#1c1937] text-white md:hidden"><Menu size={22}/></button>
          <form onSubmit={submitSearch} className="relative w-full max-w-[380px] md:w-[380px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white" size={23}/>
            <input aria-label="Search marketplace" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Here" className="h-[51px] w-full rounded-[12px] bg-[#1c1937] pl-[58px] pr-4 text-[16px] text-white outline-none placeholder:text-[#6e6a83] focus:ring-2 focus:ring-purple/60"/>
          </form>
          <div className="flex shrink-0 items-center gap-3 sm:gap-5 md:gap-7">
            <button aria-label="Toggle theme" onClick={() => setDark(v => !v)} className="hidden text-white transition hover:text-purple sm:block">{dark ? <Sun size={20}/> : <Moon size={20}/>}</button>
            <div className="relative">
              <button aria-label="Notifications" onClick={() => setNotifications(v => !v)} className="text-white transition hover:text-purple"><Bell size={20}/></button>
              {notifications && <div className="absolute right-0 top-9 w-56 rounded-xl border border-white/10 bg-[#1c1937] p-4 text-xs shadow-2xl"><b>Notifications</b><p className="mt-2 text-[#9b96b7]">You have no new notifications.</p></div>}
            </div>
            <button aria-label="Open profile" onClick={() => navigate("/profile")}><img src="/assets/top-avatar.jpg" alt="Profile" className="h-10 w-10 rounded-full object-cover ring-1 ring-white/20 sm:h-11 sm:w-11" /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && <>
          <motion.button aria-label="Close menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-50 bg-black/60 md:hidden" />
          <motion.aside initial={{x:-280}} animate={{x:0}} exit={{x:-280}} transition={{type:"spring", damping:24}} className="fixed left-0 top-0 z-[60] h-screen w-[270px] bg-[#191631] p-5 md:hidden">
            <div className="flex items-center justify-between"><button onClick={() => navigate("/")} className="grid h-10 w-10 place-items-center rounded-lg bg-purple"><Hexagon size={22}/></button><button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="text-white"><X/></button></div>
            <nav className="mt-8 grid gap-2">
              {nav.map(({to, icon: Icon, label}) => <NavLink key={to} to={to} className={({isActive}) => `flex min-h-12 items-center gap-4 rounded-xl px-4 ${isActive ? "bg-purple text-white" : "text-[#9b96b7] hover:bg-white/5"}`}><Icon size={20}/><span>{label}</span></NavLink>)}
            </nav>
          </motion.aside>
        </>}
      </AnimatePresence>

      <main className="min-h-screen pt-[88px] md:ml-[80px]">
        <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:.25}} className="mx-auto w-full max-w-[1370px] px-4 pb-24 sm:px-5 md:px-[38px] xl:px-[70px]">
          {children}
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[62px] items-center justify-around border-t border-white/5 bg-[#191631] md:hidden">
        {nav.slice(0,5).map(({to, icon: Icon, label}) => <NavLink key={to} to={to} aria-label={label} className={({isActive}) => `grid h-11 w-11 place-items-center rounded-xl ${isActive ? "bg-purple/15 text-purple" : "text-[#7a7890]"}`}><Icon size={21}/></NavLink>)}
      </nav>
    </div>
  );
}
