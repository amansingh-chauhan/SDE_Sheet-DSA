import React, { useState, useEffect } from 'react';
import { Lead, Disposition, AROStats, User } from '@/types';
import { getLeadsByARO, getCurrentUser, mockAROStats } from '@/lib/mockData';
import {
  formatPhone,
  formatCurrency,
  getStatusIcon,
  getStatusColor,
  formatTime,
  calculateProgress,
  getProgressColor,
  generateId,
} from '@/lib/utils';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import DispositionModal from './DispositionModal';
import {
  PhoneIcon,
  TrophyIcon,
  FireIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const ARODashboard: React.FC = () => {
  const [user] = useState<User>(getCurrentUser());
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<AROStats | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);

  useEffect(() => {
    // Load leads and stats
    const userLeads = getLeadsByARO(user.id);
    setLeads(userLeads);
    
    const userStats = mockAROStats.find(s => s.userId === user.id);
    setStats(userStats || null);
  }, [user.id]);

  const handleCallNow = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDispositionModalOpen(true);
  };

  const handleDispositionSubmit = (disposition: Omit<Disposition, 'id' | 'createdAt'>) => {
    // In a real app, this would make an API call
    console.log('Submitting disposition:', disposition);
    
    // Update the lead's status based on disposition
    const updatedLeads = leads.map(lead => {
      if (lead.id === disposition.leadId) {
        let newStatus = lead.status;
        if (disposition.disposition === 'ok_otp') {
          newStatus = 'hot';
        } else if (disposition.disposition === 'call_back') {
          newStatus = 'warm';
        } else if (['not_interested', 'not_eligible'].includes(disposition.disposition)) {
          newStatus = 'cold';
        }
        
        return {
          ...lead,
          status: newStatus,
          lastCallDate: new Date(),
          updatedAt: new Date(),
          followUpDate: disposition.followUpDate,
          dispositionHistory: [
            ...lead.dispositionHistory,
            {
              ...disposition,
              id: generateId(),
              createdAt: new Date(),
            },
          ],
        };
      }
      return lead;
    });
    
    setLeads(updatedLeads);
    
    // Update stats
    if (stats) {
      setStats({
        ...stats,
        callsMadeToday: stats.callsMadeToday + 1,
        okOtpCount: disposition.disposition === 'ok_otp' ? stats.okOtpCount + 1 : stats.okOtpCount,
      });
    }
  };

  const todaysFollowUps = leads.filter(lead => 
    lead.followUpDate && 
    lead.followUpDate.toDateString() === new Date().toDateString()
  );

  const hotLeads = leads.filter(lead => lead.status === 'hot');
  const warmLeads = leads.filter(lead => lead.status === 'warm');
  const coldLeads = leads.filter(lead => lead.status === 'cold');

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-blue-100">
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{leads.length}</h3>
          <p className="text-sm text-gray-600">Leads Assigned</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
            <PhoneIcon className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.callsMadeToday || 0}</h3>
          <p className="text-sm text-gray-600">Calls Made Today</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-4">
            <TrophyIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.okOtpCount || 0}</h3>
          <p className="text-sm text-gray-600">OK OTP Count</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
            <ChartBarIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {stats ? Math.round(calculateProgress(stats.callsMadeToday, stats.dailyTarget)) : 0}%
          </h3>
          <p className="text-sm text-gray-600">Daily Progress</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Lead List */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Leads</h2>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  🟢 Hot: {hotLeads.length}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  🟠 Warm: {warmLeads.length}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  🔴 Cold: {coldLeads.length}
                </span>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{formatPhone(lead.phone)}</div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="text-sm text-gray-900">{lead.city}</div>
                      <div className="text-xs text-gray-500">{lead.bank}</div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(lead.salary)}
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                        {getStatusIcon(lead.status)} {lead.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="col-span-2">
                      {lead.followUpDate && (
                        <div className="text-xs text-gray-500 mb-1">
                          Follow-up: {formatTime(lead.followUpDate)}
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleCallNow(lead)}
                        className="w-full"
                      >
                        <PhoneIcon className="h-4 w-4 mr-1" />
                        Call Now
                      </Button>
                    </div>

                    <div className="col-span-1">
                      {lead.lastCallDate && (
                        <div className="text-xs text-gray-500">
                          Last: {formatTime(lead.lastCallDate)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {leads.length === 0 && (
                <div className="text-center py-8">
                  <ClipboardDocumentListIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No leads assigned yet</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Gamification Panel */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrophyIcon className="h-5 w-5 text-yellow-500 mr-2" />
              Achievements
            </h3>
            
            <div className="space-y-4">
              {/* Daily Progress */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Daily Target</span>
                  <span>{stats?.callsMadeToday || 0} / {stats?.dailyTarget || 50}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(
                      calculateProgress(stats?.callsMadeToday || 0, stats?.dailyTarget || 50)
                    )}`}
                    style={{
                      width: `${calculateProgress(stats?.callsMadeToday || 0, stats?.dailyTarget || 50)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <TrophyIcon className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-xs font-medium text-yellow-800">OK OTP Champ</div>
                  <div className="text-lg font-bold text-yellow-900">{stats?.okOtpCount || 0}</div>
                </div>
                
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <FireIcon className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                  <div className="text-xs font-medium text-blue-800">Daily Streak</div>
                  <div className="text-lg font-bold text-blue-900">3</div>
                </div>
              </div>

              {/* Monthly Progress */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Monthly Target</span>
                  <span>{(stats?.okOtpCount || 0) * 7} / {stats?.monthlyTarget || 300}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{
                      width: `${calculateProgress((stats?.okOtpCount || 0) * 7, stats?.monthlyTarget || 300)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Today's Follow-ups */}
          {todaysFollowUps.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CalendarDaysIcon className="h-5 w-5 text-blue-500 mr-2" />
                Today&apos;s Follow-ups
              </h3>
              
              <div className="space-y-3">
                {todaysFollowUps.map((lead) => (
                  <div key={lead.id} className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900">{lead.name}</div>
                    <div className="text-sm text-blue-700">{formatPhone(lead.phone)}</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {lead.followUpDate && formatTime(lead.followUpDate)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Disposition Modal */}
      <DispositionModal
        isOpen={isDispositionModalOpen}
        onClose={() => setIsDispositionModalOpen(false)}
        lead={selectedLead}
        onSubmit={handleDispositionSubmit}
      />
    </div>
  );
};

export default ARODashboard;