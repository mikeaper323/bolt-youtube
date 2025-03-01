import './style.css';
import { initializeApp } from './app';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Autonomous YouTube Video Creator</h1>
    <div class="dashboard">
      <div class="status-panel">
        <h2>System Status</h2>
        <div id="status-display">Initializing system...</div>
      </div>
      <div class="control-panel">
        <h2>Controls</h2>
        <button id="start-btn" class="btn">Start Process</button>
        <button id="stop-btn" class="btn" disabled>Stop Process</button>
        <button id="settings-btn" class="btn">Settings</button>
      </div>
    </div>
    <div class="workflow-panel">
      <h2>Workflow Status</h2>
      <div class="workflow-steps">
        <div class="step" id="step-idea">
          <div class="step-icon">1</div>
          <div class="step-content">
            <h3>Idea Generation</h3>
            <div class="step-status" id="idea-status">Waiting</div>
          </div>
        </div>
        <div class="step" id="step-script">
          <div class="step-icon">2</div>
          <div class="step-content">
            <h3>Script Creation</h3>
            <div class="step-status" id="script-status">Waiting</div>
          </div>
        </div>
        <div class="step" id="step-voice">
          <div class="step-icon">3</div>
          <div class="step-content">
            <h3>Voiceover Generation</h3>
            <div class="step-status" id="voice-status">Waiting</div>
          </div>
        </div>
        <div class="step" id="step-caption">
          <div class="step-icon">4</div>
          <div class="step-content">
            <h3>Caption Creation</h3>
            <div class="step-status" id="caption-status">Waiting</div>
          </div>
        </div>
        <div class="step" id="step-video">
          <div class="step-icon">5</div>
          <div class="step-content">
            <h3>Video Generation</h3>
            <div class="step-status" id="video-status">Waiting</div>
          </div>
        </div>
        <div class="step" id="step-thumbnail">
          <div class="step-icon">6</div>
          <div class="step-content">
            <h3>Thumbnail Creation</h3>
            <div class="step-status" id="thumbnail-status">Waiting</div>
          </div>
        </div>
        <div class="step" id="step-upload">
          <div class="step-icon">7</div>
          <div class="step-content">
            <h3>YouTube Upload</h3>
            <div class="step-status" id="upload-status">Waiting</div>
          </div>
        </div>
      </div>
    </div>
    <div class="output-panel">
      <h2>System Output</h2>
      <div id="output-log" class="log-container"></div>
    </div>
    <div id="settings-modal" class="modal">
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>System Settings</h2>
        <div class="settings-form">
          <div class="setting-group">
            <h3>API Keys</h3>
            <div class="form-group">
              <label for="openai-key">OpenAI API Key:</label>
              <input type="password" id="openai-key" placeholder="Enter OpenAI API key">
            </div>
            <div class="form-group">
              <label for="google-key">Google API Key:</label>
              <input type="password" id="google-key" placeholder="Enter Google API key">
            </div>
            <div class="form-group">
              <label for="news-key">News API Key:</label>
              <input type="password" id="news-key" placeholder="Enter News API key">
            </div>
          </div>
          <div class="setting-group">
            <h3>Content Settings</h3>
            <div class="form-group">
              <label for="video-length">Target Video Length (minutes):</label>
              <input type="number" id="video-length" min="1" max="60" value="5">
            </div>
            <div class="form-group">
              <label for="voice-selection">Voice Selection:</label>
              <select id="voice-selection">
                <option value="openai-alloy">OpenAI - Alloy</option>
                <option value="openai-echo">OpenAI - Echo</option>
                <option value="openai-fable">OpenAI - Fable</option>
                <option value="openai-onyx">OpenAI - Onyx</option>
                <option value="google-en-US-Standard-A">Google - Standard A</option>
                <option value="google-en-US-Standard-B">Google - Standard B</option>
              </select>
            </div>
            <div class="form-group">
              <label for="content-category">Content Category:</label>
              <select id="content-category">
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>
          </div>
          <div class="setting-group">
            <h3>YouTube Settings</h3>
            <div class="form-group">
              <label for="youtube-auth">YouTube Authentication:</label>
              <button id="youtube-auth-btn" class="btn">Authenticate with YouTube</button>
              <span id="youtube-auth-status">Not authenticated</span>
            </div>
            <div class="form-group">
              <label for="auto-publish">Auto Publish:</label>
              <input type="checkbox" id="auto-publish">
            </div>
          </div>
          <button id="save-settings" class="btn">Save Settings</button>
        </div>
      </div>
    </div>
  </div>
`;

initializeApp();
