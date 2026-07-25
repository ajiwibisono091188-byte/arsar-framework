/**
 * NotificationManager Class
 */
export class NotificationManager {
  constructor() {
    this.notifications = [];
  }

  push(message, level = 'info') {
    const notif = {
      id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      message,
      level, // info, success, warning, error
      timestamp: new Date().toISOString()
    };
    this.notifications.push(notif);
    console.log(`[Notification Manager] [${level.toUpperCase()}] ${message}`);
    return notif.id;
  }

  info(message) { return this.push(message, 'info'); }
  success(message) { return this.push(message, 'success'); }
  warning(message) { return this.push(message, 'warning'); }
  error(message) { return this.push(message, 'error'); }

  list() {
    return this.notifications;
  }

  clear() {
    this.notifications = [];
  }
}
export const notificationManager = new NotificationManager();
