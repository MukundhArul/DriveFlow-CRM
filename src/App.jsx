import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, GitBranch, Menu, X, Search, Bell, Mail, Settings, ChevronsLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import LeadListing from './components/LeadListing';
import LeadDetails from './components/LeadDetails';
import Pipeline from './components/Pipeline';
import SettingsPage from './components/Settings';
import { LeadsProvider } from './context/LeadsContext';
import { ThemeProvider } from './context/ThemeContext';

const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider>
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <LeadsProvider>
      <Router>
        <div className="flex min-h-screen bg-[#f7f8fa] dark:bg-[#0f1117] transition-colors duration-300">
          <Sidebar />
          <div
            className={`flex-1 flex flex-col min-w-0 ml-0 transition-all duration-300 ease-in-out ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[240px]'}`}
          >
            <Header />
            <main className="flex-1 p-3 sm:p-5 lg:p-6">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/leads" element={<LeadListing />} />
                  <Route path="/leads/:id" element={<LeadDetails />} />
                  <Route path="/pipeline" element={<Pipeline />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </Router>
      </LeadsProvider>
    </SidebarContext.Provider>
    </ThemeProvider>
  );
}

function Sidebar() {
  const location = useLocation();
  const { collapsed, setCollapsed } = useSidebar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/leads', icon: Users, label: 'Leads' },
    { path: '/pipeline', icon: GitBranch, label: 'Pipeline' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-white border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50 transition-colors"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-100 z-40
          flex flex-col overflow-hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300 lg:transition-none
        `}
        style={{ width: collapsed ? 72 : 240 }}
      >
        {/* Logo */}
        <div className={`border-b border-gray-50 flex items-center ${collapsed ? 'justify-center px-2 py-5' : 'px-5 py-5'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <h1 className="text-[15px] font-bold text-gray-900 leading-tight">DriveFlow</h1>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">CRM System</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-2 py-4 space-y-6 overflow-y-auto scrollbar-thin">
          <div>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                >
                  Menu
                </motion.p>
              )}
            </AnimatePresence>
            <nav className="space-y-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                    className={`
                      flex items-center gap-3 rounded-lg text-[13px] font-medium transition-all duration-150 relative
                      ${collapsed ? 'justify-center px-0 py-2.5 mx-1' : 'px-3 py-2.5'}
                      ${isActive
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }
                    `}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0" />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && !collapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                >
                  General
                </motion.p>
              )}
            </AnimatePresence>
            <nav className="space-y-0.5">
              <Link
                to="/settings"
                onClick={() => setIsMobileOpen(false)}
                title={collapsed ? 'Settings' : undefined}
                className={`
                  flex items-center gap-3 rounded-lg text-[13px] font-medium transition-all duration-150
                  ${collapsed ? 'justify-center px-0 py-2.5 mx-1' : 'px-3 py-2.5'}
                  ${location.pathname === '/settings'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }
                `}
              >
                <Settings size={18} strokeWidth={2} className="flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      Settings
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </nav>
          </div>
        </div>

        {/* Collapse + Footer */}
        <div className="border-t border-gray-50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 py-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronsLeft size={16} />
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[11px] font-medium overflow-hidden whitespace-nowrap"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="px-4 pb-3"
              >
                <div className="text-[10px] text-gray-400 text-center">HSR Motors &copy; 2026</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-3 sm:px-5 lg:px-6 h-14">
        {/* Spacer for mobile hamburger */}
        <div className="w-10 lg:hidden flex-shrink-0"></div>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-300 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 ml-2">
          <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all hidden sm:block">
            <Mail size={18} />
          </button>
          <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="h-6 w-px bg-gray-100 mx-1 sm:mx-1.5 hidden sm:block"></div>
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-semibold">
              BM
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-semibold text-gray-800 leading-tight">Business Manager</div>
              <div className="text-[10px] text-gray-400">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default App;
