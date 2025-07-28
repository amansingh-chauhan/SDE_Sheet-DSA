import React, { useState, useEffect } from 'react';
import { AROStats, Alert, Lead, User } from '@/types';
import { mockAROStats, mockAlerts, getUsersByRole, getUnassignedLeads } from '@/lib/mockData';
import {
  formatTime,
  calculateProgress,
  getProgressColor,
  getSeverityColor,
  getTimeAgo,
} from '@/lib/utils';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  UserGroupIcon,
  BellIcon,
  ClockIcon,
  PhoneIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const TeamLeaderDashboard: React.FC = () => {
  const [aroStats, setAroStats] = useState<AROStats[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [aros, setAros] = useState<User[]>([]);
  const [unassignedLeads, setUnassignedLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<string>('');
  const [selectedARO, setSelectedARO] = useState<string>('');

  useEffect(() => {
    setAroStats(mockAROStats);
    setAlerts(mockAlerts);
    setAros(getUsersByRole('aro'));
    setUnassignedLeads(getUnassignedLeads());
  }, []);

  const handleAssignLead = () => {
    if (!selectedLead || !selectedARO) return;

    // In a real app, this would make an API call
    console.log('Assigning lead', selectedLead, 'to ARO', selectedARO);
    
    // Remove lead from unassigned leads
    setUnassignedLeads(prev => prev.filter(lead => lead.id !== selectedLead));
    
    // Reset selections
    setSelectedLead('');
    setSelectedARO('');
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const activeAROs = aroStats.filter(aro => aro.loginTime);
  const inactiveAROs = aroStats.filter(aro => !aro.loginTime);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
            <UserGroupIcon className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{activeAROs.length}</h3>
          <p className="text-sm text-gray-600">Active AROs</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-4">
            <BellIcon className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{unacknowledgedAlerts.length}</h3>
          <p className="text-sm text-gray-600">Active Alerts</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <PhoneIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {aroStats.reduce((sum, aro) => sum + aro.callsMadeToday, 0)}
          </h3>
          <p className="text-sm text-gray-600">Total Calls Today</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-4">
            <TrophyIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {aroStats.reduce((sum, aro) => sum + aro.okOtpCount, 0)}
          </h3>
          <p className="text-sm text-gray-600">Total OK OTPs</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ARO Overview Cards */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">ARO Overview</h2>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online: {activeAROs.length}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Offline: {inactiveAROs.length}
                </span>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {aroStats.map((aro) => (
                <div
                  key={aro.userId}
                  className={`border rounded-lg p-4 transition-all ${
                    aro.isOnCall ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* ARO Name & Status */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            aro.loginTime ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        ></div>
                        <div>
                          <div className="font-medium text-gray-900">{aro.userName}</div>
                          <div className="text-xs text-gray-500">
                            {aro.loginTime ? `Login: ${formatTime(aro.loginTime)}` : 'Offline'}
                          </div>
                        </div>
                      </div>
                      {aro.isOnCall && (
                        <div className="text-xs text-yellow-600 mt-1 flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          On call ({Math.floor((aro.currentCallDuration || 0) / 60)}m)
                        </div>
                      )}
                    </div>

                    {/* Leads Assigned */}
                    <div className="col-span-2 text-center">
                      <div className="text-lg font-bold text-gray-900">{aro.leadsAssigned}</div>
                      <div className="text-xs text-gray-500">Leads</div>
                    </div>

                    {/* Calls Made */}
                    <div className="col-span-2 text-center">
                      <div className="text-lg font-bold text-blue-600">{aro.callsMadeToday}</div>
                      <div className="text-xs text-gray-500">Calls Today</div>
                    </div>

                    {/* OK OTP Count */}
                    <div className="col-span-2 text-center">
                      <div className="text-lg font-bold text-green-600">{aro.okOtpCount}</div>
                      <div className="text-xs text-gray-500">OK OTPs</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="col-span-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Daily Progress</span>
                        <span>{aro.callsMadeToday}/{aro.dailyTarget}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            calculateProgress(aro.callsMadeToday, aro.dailyTarget)
                          )}`}
                          style={{
                            width: `${calculateProgress(aro.callsMadeToday, aro.dailyTarget)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Alerts Panel */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BellIcon className="h-5 w-5 text-red-500 mr-2" />
              Active Alerts
              {unacknowledgedAlerts.length > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {unacknowledgedAlerts.length}
                </span>
              )}
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {unacknowledgedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {alert.severity === 'high' && (
                          <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-xs font-medium uppercase">
                          {alert.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{getTimeAgo(alert.createdAt)}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAcknowledgeAlert(alert.id)}
                      className="ml-2"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {unacknowledgedAlerts.length === 0 && (
                <div className="text-center py-4">
                  <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No active alerts</p>
                </div>
              )}
            </div>
          </Card>

          {/* Manual Lead Assignment */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Assignment</h3>
            
            <div className="space-y-4">
              {/* Select Lead */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Lead
                </label>
                <select
                  value={selectedLead}
                  onChange={(e) => setSelectedLead(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a lead...</option>
                  {unassignedLeads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.name} - {lead.phone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select ARO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select ARO
                </label>
                <select
                  value={selectedARO}
                  onChange={(e) => setSelectedARO(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose an ARO...</option>
                  {aros
                    .filter(aro => aro.active)
                    .map((aro) => (
                      <option key={aro.id} value={aro.id}>
                        {aro.name} ({aroStats.find(s => s.userId === aro.id)?.leadsAssigned || 0} leads)
                      </option>
                    ))}
                </select>
              </div>

              {/* Assign Button */}
              <Button
                variant="primary"
                onClick={handleAssignLead}
                disabled={!selectedLead || !selectedARO}
                className="w-full"
              >
                <ArrowRightIcon className="h-4 w-4 mr-2" />
                Assign Lead
              </Button>

              {/* Quick Stats */}
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Unassigned Leads:</span>
                  <span>{unassignedLeads.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active AROs:</span>
                  <span>{activeAROs.length}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                View ARO Timeline
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <PhoneIcon className="h-4 w-4 mr-2" />
                Call History Report
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <TrophyIcon className="h-4 w-4 mr-2" />
                Performance Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderDashboard;