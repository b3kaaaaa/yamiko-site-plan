// ============================================
// YAMIKO - Utility Functions
// ============================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'K';
  }
  return num.toString();
}

export function formatDate(dateStr: string, format: 'short' | 'full' | 'relative' | 'time' = 'short'): string {
  const date = new Date(dateStr);
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      
    case 'full':
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
    case 'relative':
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      if (seconds < 60) return 'только что';
      if (minutes < 60) return `${minutes} мин. назад`;
      if (hours < 24) return `${hours} ч. назад`;
      if (days === 1) return 'вчера';
      if (days < 7) return `${days} дн. назад`;
      if (days < 30) return `${Math.floor(days / 7)} нед. назад`;
      
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
      
    case 'time':
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      
    default:
      return date.toLocaleDateString('ru-RU');
  }
}

export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + ellipsis;
}

export function pluralize(count: number, one: string, few: string, many: string): string {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;
  
  if (n > 10 && n < 20) return many;
  if (n1 > 1 && n1 < 5) return few;
  if (n1 === 1) return one;
  
  return many;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Онгоинг':
      return 'status-ongoing';
    case 'Завершено':
      return 'status-completed';
    case 'Заморожено':
      return 'status-hiatus';
    case 'Анонс':
      return 'status-announced';
    default:
      return '';
  }
}
