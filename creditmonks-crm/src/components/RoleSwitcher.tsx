import React from 'react';
import { User } from '@/types';
import Button from './ui/Button';
import { mockUsers, setCurrentUser } from '@/lib/mockData';

interface RoleSwitcherProps {
  currentUser: User;
  onUserChange: (user: User) => void;
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentUser, onUserChange }) => {
  const roles = [
    { role: 'aro', label: 'ARO', user: mockUsers.find(u => u.role === 'aro')! },
    { role: 'team_leader', label: 'Team Leader', user: mockUsers.find(u => u.role === 'team_leader')! },
    { role: 'super_admin', label: 'Super Admin', user: mockUsers.find(u => u.role === 'super_admin')! },
  ];

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="text-xs font-medium text-gray-700 mb-3">Demo: Switch Role</div>
      <div className="flex space-x-2">
        {roles.map(({ role, label, user }) => (
          <Button
            key={role}
            size="sm"
            variant={currentUser.role === role ? 'primary' : 'secondary'}
            onClick={() => {
              setCurrentUser(user);
              onUserChange(user);
            }}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitcher;