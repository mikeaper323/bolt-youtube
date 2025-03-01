export class Logger {
  private logContainer: HTMLElement | null;
  
  constructor(containerId: string) {
    this.logContainer = document.getElementById(containerId);
  }
  
  private log(level: string, message: string, className: string): void {
    if (!this.logContainer) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'log-time';
    timeSpan.textContent = `[${timeString}]`;
    
    const levelSpan = document.createElement('span');
    levelSpan.className = className;
    levelSpan.textContent = `[${level}] `;
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    logEntry.appendChild(timeSpan);
    logEntry.appendChild(levelSpan);
    logEntry.appendChild(messageSpan);
    
    this.logContainer.appendChild(logEntry);
    
    // Auto-scroll to bottom
    this.logContainer.scrollTop = this.logContainer.scrollHeight;
  }
  
  info(message: string): void {
    this.log('INFO', message, 'log-info');
  }
  
  success(message: string): void {
    this.log('SUCCESS', message, 'log-success');
  }
  
  warning(message: string): void {
    this.log('WARNING', message, 'log-warning');
  }
  
  error(message: string): void {
    this.log('ERROR', message, 'log-error');
  }
}
