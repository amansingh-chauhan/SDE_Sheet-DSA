import React, { useState } from 'react';
import { Lead, Disposition } from '@/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { formatPhone } from '@/lib/utils';

interface DispositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSubmit: (disposition: Omit<Disposition, 'id' | 'createdAt'>) => void;
}

const DispositionModal: React.FC<DispositionModalProps> = ({
  isOpen,
  onClose,
  lead,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    callDuration: 0,
    disposition: '' as Disposition['disposition'],
    notes: '',
    followUpDate: '',
    followUpTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispositionOptions = [
    { value: 'not_interested', label: 'Not Interested' },
    { value: 'call_back', label: 'Call Back' },
    { value: 'ok_otp', label: 'OK OTP' },
    { value: 'wrong_number', label: 'Wrong Number' },
    { value: 'not_eligible', label: 'Not Eligible' },
    { value: 'busy', label: 'Busy' },
    { value: 'no_answer', label: 'No Answer' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead || !formData.disposition) return;

    setIsSubmitting(true);
    
    try {
      let followUpDate: Date | undefined;
      if (formData.followUpDate && formData.followUpTime) {
        followUpDate = new Date(`${formData.followUpDate}T${formData.followUpTime}`);
      }

      const disposition: Omit<Disposition, 'id' | 'createdAt'> = {
        leadId: lead.id,
        aroId: 'aro1', // This would come from auth in real app
        callDuration: formData.callDuration,
        disposition: formData.disposition,
        notes: formData.notes || undefined,
        followUpDate,
      };

      await onSubmit(disposition);
      
      // Reset form
      setFormData({
        callDuration: 0,
        disposition: '' as Disposition['disposition'],
        notes: '',
        followUpDate: '',
        followUpTime: '',
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting disposition:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      callDuration: 0,
      disposition: '' as Disposition['disposition'],
      notes: '',
      followUpDate: '',
      followUpTime: '',
    });
    onClose();
  };

  const showFollowUpFields = formData.disposition === 'call_back';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Call Disposition"
      maxWidth="lg"
    >
      {lead && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <span className="ml-2 text-gray-900">{lead.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="ml-2 text-gray-900">{formatPhone(lead.phone)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">City:</span>
              <span className="ml-2 text-gray-900">{lead.city}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Bank:</span>
              <span className="ml-2 text-gray-900">{lead.bank}</span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Call Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call Duration (seconds) *
          </label>
          <input
            type="number"
            min="0"
            required
            value={formData.callDuration}
            onChange={(e) => setFormData({ ...formData, callDuration: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter call duration in seconds"
          />
        </div>

        {/* Disposition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disposition *
          </label>
          <select
            required
            value={formData.disposition}
            onChange={(e) => setFormData({ ...formData, disposition: e.target.value as Disposition['disposition'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select disposition</option>
            {dispositionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add any additional notes about the call..."
          />
        </div>

        {/* Follow-up fields (show only for call_back) */}
        {showFollowUpFields && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Schedule Follow-up</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Time
                </label>
                <input
                  type="time"
                  value={formData.followUpTime}
                  onChange={(e) => setFormData({ ...formData, followUpTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={!formData.disposition}
          >
            Submit Disposition
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DispositionModal;