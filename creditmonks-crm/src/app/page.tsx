'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ARODashboard from '@/components/aro/ARODashboard';
import TeamLeaderDashboard from '@/components/team-leader/TeamLeaderDashboard';
import SuperAdminDashboard from '@/components/super-admin/SuperAdminDashboard';
import RoleSwitcher from '@/components/RoleSwitcher';
import { getCurrentUser } from '@/lib/mockData';
import { User } from '@/types';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // In a real app, this would come from authentication
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const renderDashboardContent = () => {
    if (!user) return <div>Loading...</div>;

    switch (user.role) {
      case 'aro':
        return renderAROPages();
      case 'team_leader':
        return renderTeamLeaderPages();
      case 'super_admin':
        return renderSuperAdminPages();
      default:
        return <div>Access denied</div>;
    }
  };

  const renderAROPages = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'leads':
        return <ARODashboard />;
      case 'calls':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Call History</h3>
            <p className="text-gray-500">Call history functionality will be implemented here.</p>
          </div>
        );
      case 'stats':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">My Statistics</h3>
            <p className="text-gray-500">Detailed statistics and performance metrics will be shown here.</p>
          </div>
        );
      default:
        return <ARODashboard />;
    }
  };

  const renderTeamLeaderPages = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'aros':
        return <TeamLeaderDashboard />;
      case 'alerts':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Alert Management</h3>
            <p className="text-gray-500">Detailed alert management interface will be implemented here.</p>
          </div>
        );
      case 'assignments':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Lead Assignment</h3>
            <p className="text-gray-500">Advanced lead assignment tools will be available here.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Team Reports</h3>
            <p className="text-gray-500">Comprehensive team performance reports will be shown here.</p>
          </div>
        );
      default:
        return <TeamLeaderDashboard />;
    }
  };

  const renderSuperAdminPages = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'upload':
      case 'users':
      case 'settings':
      case 'reports':
        return <SuperAdminDashboard />;
      default:
        return <SuperAdminDashboard />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Creditmonks CRM...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <RoleSwitcher currentUser={user} onUserChange={setUser} />
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderDashboardContent()}
      </Layout>
    </>
  );
}
