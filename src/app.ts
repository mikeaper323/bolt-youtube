import { setupEventListeners } from './ui/eventListeners';
import { Logger } from './utils/logger';
import { WorkflowManager } from './workflow/workflowManager';
import { SettingsManager } from './utils/settingsManager';

export function initializeApp(): void {
  // Initialize the logger
  const logger = new Logger('output-log');
  
  // Initialize settings manager
  const settingsManager = new SettingsManager();
  
  // Initialize workflow manager
  const workflowManager = new WorkflowManager(logger, settingsManager);
  
  // Setup event listeners
  setupEventListeners(workflowManager, settingsManager, logger);
  
  // Log initialization
  logger.info('System initialized and ready');
  updateStatus('System ready. Configure settings and press Start to begin.');
}

export function updateStatus(message: string): void {
  const statusDisplay = document.getElementById('status-display');
  if (statusDisplay) {
    statusDisplay.textContent = message;
  }
}

export function updateStepStatus(step: string, status: string, state: 'waiting' | 'active' | 'completed' | 'error'): void {
  const stepElement = document.getElementById(`step-${step}`);
  const statusElement = document.getElementById(`${step}-status`);
  
  if (stepElement && statusElement) {
    // Remove all state classes
    stepElement.classList.remove('active', 'completed', 'error');
    
    // Add the appropriate class
    if (state !== 'waiting') {
      stepElement.classList.add(state);
    }
    
    // Update the status text
    statusElement.textContent = status;
  }
}
