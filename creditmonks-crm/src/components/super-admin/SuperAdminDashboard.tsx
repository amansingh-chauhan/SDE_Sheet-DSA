import React, { useState, useEffect } from 'react';
import { User, Lead, DashboardStats } from '@/types';
import { mockUsers, mockLeads, mockAROStats } from '@/lib/mockData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import {
  CloudArrowUpIcon,
  UserGroupIcon,
  CogIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const SuperAdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setUsers(mockUsers);
    setLeads(mockLeads);
    
    // Calculate dashboard stats
    const totalOkOtps = mockAROStats.reduce((sum, aro) => sum + aro.okOtpCount, 0);
    const totalCalls = mockAROStats.reduce((sum, aro) => sum + aro.callsMadeToday, 0);
    const avgCallDuration = totalCalls > 0 ? Math.round(Math.random() * 120 + 60) : 0; // Mock average
    
    setStats({
      totalLeads: mockLeads.length,
      totalUsers: mockUsers.length,
      todaysConversions: totalOkOtps,
      monthlyConversions: totalOkOtps * 20, // Mock monthly
      averageCallDuration: avgCallDuration,
      topPerformer: mockAROStats.reduce((prev, current) => 
        (prev.okOtpCount > current.okOtpCount) ? prev : current
      ).userName,
    });
  }, []);

  const handleFileUpload = async () => {
    if (!uploadFile) return;

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      console.log('File uploaded:', uploadFile.name);
      setIsUploading(false);
      setUploadFile(null);
      setIsUploadModalOpen(false);
    }, 2000);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleExportReport = (type: 'daily' | 'weekly' | 'monthly') => {
    console.log('Exporting', type, 'report');
    // In a real app, this would trigger a download
  };

  const activeUsers = users.filter(user => user.active);
  const inactiveUsers = users.filter(user => !user.active);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.totalLeads || 0}</h3>
          <p className="text-sm text-gray-600">Total Leads</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
            <UserGroupIcon className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</h3>
          <p className="text-sm text-gray-600">Total Users</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-4">
            <ChartBarIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.todaysConversions || 0}</h3>
          <p className="text-sm text-gray-600">Today&apos;s Conversions</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
            <ChartBarIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.monthlyConversions || 0}</h3>
          <p className="text-sm text-gray-600">Monthly Conversions</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Button
          variant="primary"
          onClick={() => setIsUploadModalOpen(true)}
          className="h-24 flex-col"
        >
          <CloudArrowUpIcon className="h-8 w-8 mb-2" />
          Upload Leads
        </Button>

        <Button
          variant="secondary"
          onClick={handleAddUser}
          className="h-24 flex-col"
        >
          <UserGroupIcon className="h-8 w-8 mb-2" />
          Add User
        </Button>

        <Button
          variant="secondary"
          onClick={() => setIsSettingsModalOpen(true)}
          className="h-24 flex-col"
        >
          <CogIcon className="h-8 w-8 mb-2" />
          System Settings
        </Button>

        <Button
          variant="secondary"
          onClick={() => handleExportReport('daily')}
          className="h-24 flex-col"
        >
          <DocumentArrowDownIcon className="h-8 w-8 mb-2" />
          Export Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active: {activeUsers.length}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Inactive: {inactiveUsers.length}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Target</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {user.monthlyTarget || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditUser(user)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Overview */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Call Duration</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats?.averageCallDuration}s
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Top Performer</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats?.topPerformer}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="text-sm font-medium text-green-600">
                  {stats && stats.totalLeads > 0 
                    ? Math.round((stats.todaysConversions / stats.totalLeads) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Reports */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
            
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => handleExportReport('daily')}
                className="w-full justify-start"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Daily Report
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleExportReport('weekly')}
                className="w-full justify-start"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Weekly Report
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleExportReport('monthly')}
                className="w-full justify-start"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Monthly Report
              </Button>
            </div>
          </Card>

          {/* Lead Summary */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">🟢 Hot Leads</span>
                <span className="text-sm font-medium text-green-600">
                  {leads.filter(lead => lead.status === 'hot').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">🟠 Warm Leads</span>
                <span className="text-sm font-medium text-orange-600">
                  {leads.filter(lead => lead.status === 'warm').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">🔴 Cold Leads</span>
                <span className="text-sm font-medium text-red-600">
                  {leads.filter(lead => lead.status === 'cold').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Unassigned</span>
                <span className="text-sm font-medium text-gray-600">
                  {leads.filter(lead => !lead.assignedTo).length}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Leads"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-lg font-medium text-gray-900 mb-2">
              Upload Image or Excel File
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Supports JPG, PNG, Excel files up to 10MB
            </div>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.xlsx,.xls"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="secondary" className="cursor-pointer">
                Choose File
              </Button>
            </label>
            {uploadFile && (
              <div className="mt-4 text-sm text-gray-700">
                Selected: {uploadFile.name}
              </div>
            )}
          </div>

          {uploadFile && (
            <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
              <div className="text-sm text-yellow-800">
                OCR processing will detect blur and quality issues automatically
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsUploadModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleFileUpload}
              disabled={!uploadFile}
              loading={isUploading}
            >
              Upload & Process
            </Button>
          </div>
        </div>
      </Modal>

      {/* User Modal */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title={selectedUser ? 'Edit User' : 'Add New User'}
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={selectedUser?.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={selectedUser?.email}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={selectedUser?.role}
              >
                <option value="aro">ARO</option>
                <option value="team_leader">Team Leader</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Target
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={selectedUser?.monthlyTarget}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => setIsUserModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary">
              {selectedUser ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="System Settings"
        maxWidth="2xl"
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Auto-Assignment Rules</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Leads per ARO
                </label>
                <input
                  type="number"
                  defaultValue="150"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lead Recycling (days)
                </label>
                <input
                  type="number"
                  defaultValue="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Target Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Monthly Target
                </label>
                <input
                  type="number"
                  defaultValue="300"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Call Threshold (minutes)
                </label>
                <input
                  type="number"
                  defaultValue="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => setIsSettingsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary">
              Save Settings
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SuperAdminDashboard;