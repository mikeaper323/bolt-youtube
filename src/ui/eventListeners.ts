import { WorkflowManager } from '../workflow/workflowManager';
import { SettingsManager } from '../utils/settingsManager';
import { Logger } from '../utils/logger';
import { updateStatus } from '../app';

export function setupEventListeners(
  workflowManager: WorkflowManager,
  settingsManager: SettingsManager,
  logger: Logger
): void {
  // Start button
  const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
  const stopBtn = document.getElementById('stop-btn') as HTMLButtonElement;
  const settingsBtn = document.getElementById('settings-btn') as HTMLButtonElement;
  const settingsModal = document.getElementById('settings-modal') as HTMLDivElement;
  const closeBtn = document.querySelector('.close-btn') as HTMLSpanElement;
  const saveSettingsBtn = document.getElementById('save-settings') as HTMLButtonElement;
  const youtubeAuthBtn = document.getElementById('youtube-auth-btn') as HTMLButtonElement;

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      updateStatus('Process started. Generating video ideas...');
      logger.info('Process started by user');
      workflowManager.startWorkflow()
        .catch(error => {
          logger.error(`Workflow error: ${error.message}`);
          updateStatus(`Error: ${error.message}`);
          startBtn.disabled = false;
          stopBtn.disabled = true;
        });
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      workflowManager.stopWorkflow();
      startBtn.disabled = false;
      stopBtn.disabled = true;
      updateStatus('Process stopped by user.');
      logger.warning('Process stopped by user');
    });
  }

  if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener('click', () => {
      // Load current settings into form
      settingsManager.loadSettingsIntoForm();
      settingsModal.style.display = 'block';
    });
  }

  if (closeBtn && settingsModal) {
    closeBtn.addEventListener('click', () => {
      settingsModal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
      settingsModal.style.display = 'none';
    }
  });

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      settingsManager.saveSettingsFromForm();
      settingsModal.style.display = 'none';
      logger.info('Settings updated');
      updateStatus('Settings updated successfully.');
    });
  }

  if (youtubeAuthBtn) {
    youtubeAuthBtn.addEventListener('click', () => {
      // In a real implementation, this would handle OAuth flow
      // For this demo, we'll simulate authentication
      const authStatus = document.getElementById('youtube-auth-status');
      if (authStatus) {
        authStatus.textContent = 'Authenticated';
        authStatus.style.color = '#4caf50';
      }
      logger.info('YouTube authentication completed');
    });
  }

  // Load settings on page load
  settingsManager.loadSettings();
}
