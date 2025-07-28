import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhone(phone: string): string {
  // Format as +91 98765 43210
  if (phone.length === 10) {
    return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
  }
  return phone;
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function formatDateTime(date: Date): string {
  return format(date, 'MMM dd, yyyy HH:mm');
}

export function formatTime(date: Date): string {
  return format(date, 'HH:mm');
}

export function getStatusColor(status: 'hot' | 'warm' | 'cold'): string {
  switch (status) {
    case 'hot':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'warm':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'cold':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getStatusIcon(status: 'hot' | 'warm' | 'cold'): string {
  switch (status) {
    case 'hot':
      return '🟢';
    case 'warm':
      return '🟠';
    case 'cold':
      return '🔴';
    default:
      return '⚪';
  }
}

export function getSeverityColor(severity: 'low' | 'medium' | 'high'): string {
  switch (severity) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function calculateProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
}

export function getProgressColor(progress: number): string {
  if (progress >= 90) return 'bg-green-500';
  if (progress >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return formatDate(date);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getDispositionLabel(disposition: string): string {
  switch (disposition) {
    case 'not_interested':
      return 'Not Interested';
    case 'call_back':
      return 'Call Back';
    case 'ok_otp':
      return 'OK OTP';
    case 'wrong_number':
      return 'Wrong Number';
    case 'not_eligible':
      return 'Not Eligible';
    case 'busy':
      return 'Busy';
    case 'no_answer':
      return 'No Answer';
    default:
      return capitalizeFirst(disposition);
  }
}

export function getDispositionColor(disposition: string): string {
  switch (disposition) {
    case 'ok_otp':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'call_back':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'not_interested':
    case 'not_eligible':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'busy':
    case 'no_answer':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'wrong_number':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}