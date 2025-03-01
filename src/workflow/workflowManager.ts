import { Logger } from '../utils/logger';
import { SettingsManager } from '../utils/settingsManager';
import { updateStepStatus, updateStatus } from '../app';
import { IdeaGenerator } from './modules/ideaGenerator';
import { ScriptGenerator } from './modules/scriptGenerator';
import { VoiceGenerator } from './modules/voiceGenerator';
import { CaptionGenerator } from './modules/captionGenerator';
import { VideoGenerator } from './modules/videoGenerator';
import { ThumbnailGenerator } from './modules/thumbnailGenerator';
import { YouTubeUploader } from './modules/youtubeUploader';

export class WorkflowManager {
  private logger: Logger;
  private settingsManager: SettingsManager;
  private isRunning: boolean = false;
  private currentStep: string = '';
  
  // Workflow modules
  private ideaGenerator: IdeaGenerator;
  private scriptGenerator: ScriptGenerator;
  private voiceGenerator: VoiceGenerator;
  private captionGenerator: CaptionGenerator;
  private videoGenerator: VideoGenerator;
  private thumbnailGenerator: ThumbnailGenerator;
  private youtubeUploader: YouTubeUploader;
  
  constructor(logger: Logger, settingsManager: SettingsManager) {
    this.logger = logger;
    this.settingsManager = settingsManager;
    
    // Initialize modules
    this.ideaGenerator = new IdeaGenerator(logger, settingsManager);
    this.scriptGenerator = new ScriptGenerator(logger, settingsManager);
    this.voiceGenerator = new VoiceGenerator(logger, settingsManager);
    this.captionGenerator = new CaptionGenerator(logger, settingsManager);
    this.videoGenerator = new VideoGenerator(logger, settingsManager);
    this.thumbnailGenerator = new ThumbnailGenerator(logger, settingsManager);
    this.youtubeUploader = new YouTubeUploader(logger, settingsManager);
  }
  
  async startWorkflow(): Promise<void> {
    if (this.isRunning) {
      this.logger.warning('Workflow is already running');
      return;
    }
    
    this.isRunning = true;
    
    // Reset all step statuses
    this.resetStepStatuses();
    
    try {
      // Step 1: Generate video idea
      this.currentStep = 'idea';
      updateStepStatus('idea', 'Processing...', 'active');
      const videoIdea = await this.simulateStep('idea', 'Generating video idea', 3000);
      updateStepStatus('idea', 'Completed: ' + videoIdea.title, 'completed');
      
      if (!this.isRunning) return;
      
      // Step 2: Generate script
      this.currentStep = 'script';
      updateStepStatus('script', 'Creating script...', 'active');
      const script = await this.simulateStep('script', 'Creating script based on idea', 5000);
      updateStepStatus('script', 'Completed: Script created', 'completed');
      
      if (!this.isRunning) return;
      
      // Step 3: Generate voiceover
      this.currentStep = 'voice';
      updateStepStatus('voice', 'Generating voiceover...', 'active');
      const voiceover = await this.simulateStep('voice', 'Converting script to speech', 4000);
      updateStepStatus('voice', 'Completed: Voiceover generated', 'completed');
      
      if (!this.isRunning) return;
      
      // Step 4: Generate captions
      this.currentStep = 'caption';
      updateStepStatus('caption', 'Creating captions...', 'active');
      const captions = await this.simulateStep('caption', 'Generating accurate captions', 3000);
      updateStepStatus('caption', 'Completed: Captions created', 'completed');
      
      if (!this.isRunning) return;
      
      // Step 5: Generate video
      this.currentStep = 'video';
      updateStepStatus('video', 'Creating video...', 'active');
      const video = await this.simulateStep('video', 'Matching visuals to script segments', 8000);
      updateStepStatus('video', 'Completed: Video created', 'completed');
      
      if (!this.isRunning) return;
      
      // Step 6: Generate thumbnail
      this.currentStep = 'thumbnail';
      updateStepStatus('thumbnail', 'Creating thumbnail...', 'active');
      const thumbnail = await this.simulateStep('thumbnail', 'Generating custom thumbnail', 2000);
      updateStepStatus('thumbnail', 'Completed: Thumbnail created', 'completed');
      
      if (!this.isRunning) return;
      
      // Step 7: Upload to YouTube
      this.currentStep = 'upload';
      updateStepStatus('upload', 'Uploading to YouTube...', 'active');
      const uploadResult = await this.simulateStep('upload', 'Uploading video to YouTube', 6000);
      updateStepStatus('upload', 'Completed: Video uploaded', 'completed');
      
      // All steps completed
      this.logger.success('Workflow completed successfully');
      updateStatus('Video created and uploaded successfully: ' + videoIdea.title);
      
    } catch (error) {
      this.logger.error(`Error in workflow step ${this.currentStep}: ${error.message}`);
      updateStepStatus(this.currentStep, `Error: ${error.message}`, 'error');
      updateStatus(`Error in ${this.currentStep} step: ${error.message}`);
    } finally {
      this.isRunning = false;
      
      // Re-enable start button and disable stop button
      const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
      const stopBtn = document.getElementById('stop-btn') as HTMLButtonElement;
      
      if (startBtn) startBtn.disabled = false;
      if (stopBtn) stopBtn.disabled = true;
    }
  }
  
  stopWorkflow(): void {
    if (!this.isRunning) {
      this.logger.warning('No workflow is currently running');
      return;
    }
    
    this.isRunning = false;
    this.logger.warning(`Workflow stopped during ${this.currentStep} step`);
    updateStepStatus(this.currentStep, 'Stopped', 'error');
  }
  
  private resetStepStatuses(): void {
    const steps = ['idea', 'script', 'voice', 'caption', 'video', 'thumbnail', 'upload'];
    steps.forEach(step => {
      updateStepStatus(step, 'Waiting', 'waiting');
    });
  }
  
  // This is a simulation function for demo purposes
  // In a real implementation, this would call the actual module methods
  private simulateStep(step: string, message: string, duration: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.logger.info(`${step}: ${message}`);
      
      setTimeout(() => {
        if (!this.isRunning) {
          reject(new Error('Process was stopped'));
          return;
        }
        
        // Simulate results based on step
        switch (step) {
          case 'idea':
            resolve({
              title: 'The Future of Quantum Computing in 2023',
              source: 'Technology News',
              score: 0.87
            });
            break;
          case 'script':
            resolve({
              sections: ['Introduction', 'What is Quantum Computing', 'Recent Breakthroughs', 'Future Applications', 'Conclusion'],
              wordCount: 850,
              estimatedDuration: '5:30'
            });
            break;
          case 'voice':
            resolve({
              duration: 330, // seconds
              format: 'mp3',
              size: '4.2 MB'
            });
            break;
          case 'caption':
            resolve({
              format: 'srt',
              wordCount: 850,
              accuracy: 0.98
            });
            break;
          case 'video':
            resolve({
              duration: 330,
              resolution: '1080p',
              format: 'mp4',
              size: '85 MB'
            });
            break;
          case 'thumbnail':
            resolve({
              resolution: '1280x720',
              format: 'jpg',
              size: '320 KB'
            });
            break;
          case 'upload':
            resolve({
              videoId: 'dQw4w9WgXcQ',
              url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
              status: 'Published'
            });
            break;
          default:
            resolve({});
        }
      }, duration);
    });
  }
}
