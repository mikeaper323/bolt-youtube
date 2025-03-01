interface Settings {
  apiKeys: {
    openai: string;
    google: string;
    news: string;
  };
  content: {
    videoLength: number;
    voice: string;
    category: string;
  };
  youtube: {
    authenticated: boolean;
    autoPublish: boolean;
  };
}

export class SettingsManager {
  private settings: Settings;
  
  constructor() {
    // Default settings
    this.settings = {
      apiKeys: {
        openai: '',
        google: '',
        news: ''
      },
      content: {
        videoLength: 5,
        voice: 'openai-alloy',
        category: 'technology'
      },
      youtube: {
        authenticated: false,
        autoPublish: false
      }
    };
  }
  
  loadSettings(): void {
    // In a real app, this would load from localStorage or a backend
    const savedSettings = localStorage.getItem('youtubeCreatorSettings');
    if (savedSettings) {
      try {
        this.settings = JSON.parse(savedSettings);
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }
  
  saveSettings(): void {
    // In a real app, this would save to localStorage or a backend
    localStorage.setItem('youtubeCreatorSettings', JSON.stringify(this.settings));
  }
  
  loadSettingsIntoForm(): void {
    // API Keys
    (document.getElementById('openai-key') as HTMLInputElement).value = this.settings.apiKeys.openai;
    (document.getElementById('google-key') as HTMLInputElement).value = this.settings.apiKeys.google;
    (document.getElementById('news-key') as HTMLInputElement).value = this.settings.apiKeys.news;
    
    // Content Settings
    (document.getElementById('video-length') as HTMLInputElement).value = this.settings.content.videoLength.toString();
    (document.getElementById('voice-selection') as HTMLSelectElement).value = this.settings.content.voice;
    (document.getElementById('content-category') as HTMLSelectElement).value = this.settings.content.category;
    
    // YouTube Settings
    (document.getElementById('auto-publish') as HTMLInputElement).checked = this.settings.youtube.autoPublish;
    
    // YouTube Auth Status
    const authStatus = document.getElementById('youtube-auth-status');
    if (authStatus) {
      if (this.settings.youtube.authenticated) {
        authStatus.textContent = 'Authenticated';
        authStatus.style.color = '#4caf50';
      } else {
        authStatus.textContent = 'Not authenticated';
        authStatus.style.color = '';
      }
    }
  }
  
  saveSettingsFromForm(): void {
    // API Keys
    this.settings.apiKeys.openai = (document.getElementById('openai-key') as HTMLInputElement).value;
    this.settings.apiKeys.google = (document.getElementById('google-key') as HTMLInputElement).value;
    this.settings.apiKeys.news = (document.getElementById('news-key') as HTMLInputElement).value;
    
    // Content Settings
    this.settings.content.videoLength = parseInt((document.getElementById('video-length') as HTMLInputElement).value, 10);
    this.settings.content.voice = (document.getElementById('voice-selection') as HTMLSelectElement).value;
    this.settings.content.category = (document.getElementById('content-category') as HTMLSelectElement).value;
    
    // YouTube Settings
    this.settings.youtube.autoPublish = (document.getElementById('auto-publish') as HTMLInputElement).checked;
    
    // Save to storage
    this.saveSettings();
  }
  
  getSettings(): Settings {
    return this.settings;
  }
  
  setYouTubeAuthenticated(authenticated: boolean): void {
    this.settings.youtube.authenticated = authenticated;
    this.saveSettings();
  }
}
