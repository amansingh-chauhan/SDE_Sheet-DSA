import React, { useState } from 'react';
import { User } from '@/types';
import { getCurrentUser } from '@/lib/mockData';
import {
  HomeIcon,
  UserGroupIcon,
  CogIcon,
  ChartBarIcon,
  PhoneIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  UserIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const [user] = useState<User>(getCurrentUser());
  
  const getNavigationItems = () => {
    switch (user.role) {
      case 'aro':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
          { id: 'leads', label: 'My Leads', icon: ClipboardDocumentListIcon },
          { id: 'calls', label: 'Call History', icon: PhoneIcon },
          { id: 'stats', label: 'My Stats', icon: ChartBarIcon },
        ];
      case 'team_leader':
        return [
          { id: 'dashboard', label: 'Team Dashboard', icon: HomeIcon },
          { id: 'aros', label: 'ARO Management', icon: UserGroupIcon },
          { id: 'alerts', label: 'Alerts', icon: BellIcon },
          { id: 'assignments', label: 'Lead Assignment', icon: ClipboardDocumentListIcon },
          { id: 'reports', label: 'Reports', icon: ChartBarIcon },
        ];
      case 'super_admin':
        return [
          { id: 'dashboard', label: 'Admin Dashboard', icon: HomeIcon },
          { id: 'upload', label: 'Upload Leads', icon: ClipboardDocumentListIcon },
          { id: 'users', label: 'User Management', icon: UserGroupIcon },
          { id: 'settings', label: 'System Settings', icon: CogIcon },
          { id: 'reports', label: 'Reports & Export', icon: ChartBarIcon },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'aro':
        return 'ARO';
      case 'team_leader':
        return 'Team Leader';
      case 'super_admin':
        return 'Super Admin';
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        {/* Logo and Header */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 bg-blue-600">
          <h1 className="text-xl font-bold text-white">Creditmonks CRM</h1>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <UserIcon className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {getRoleDisplayName(user.role)}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1">
          <div className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full transition-colors`}
                >
                  <Icon
                    className={`${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5 flex-shrink-0`}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <PowerIcon className="mr-3 h-5 w-5 text-gray-400" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {navigationItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
              </h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                {user.loginTime && (
                  <div className="text-sm text-green-600">
                    Online since {user.loginTime.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;