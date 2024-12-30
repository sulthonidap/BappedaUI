import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Users, Settings, Menu, X, Clipboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', icon: Home, path: '/', permission: 'dashboard' },
  { name: 'Surat', icon: Clipboard, path: '/surat', permission: 'settings' },
  // { name: 'Analytics', icon: BarChart2, path: '/analytics', permission: 'analytics' },
  { name: 'Users', icon: Users, path: '/users', permission: 'users' },
  // { name: 'Settings', icon: Settings, path: '/settings', permission: 'settings' },

] as const;

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { hasPermission } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavLinks = () => (
    <nav className="space-y-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        if (!hasPermission(item.permission)) return null;

        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900 text-white"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-gray-900 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 pt-16">
          <h1 className="text-2xl font-bold text-white mb-8">Bapenda</h1>
          <NavLinks />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen w-64 bg-[#02255D] text-white fixed left-0 top-0">
        <div className="p-4">
          <div>
            <h1 className="text-2xl font-bold mb-8 flex items-center">
            <img src="/src/components/image/bapeda.png" alt="Logo" className="h-14 inline-block mr-2 " />
            Bapenda
            </h1>
          </div>
          <NavLinks />
        </div>
      </div>
    </>
  );
}