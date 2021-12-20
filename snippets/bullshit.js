// conquer the world
function copilot() {
    var copilot = {
        init: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }
    };
    copilot.init();
}

function microsoft() {
    var s = document.createElement('script');
    s.src = 'https://copilot.microsoft.com/embed.js';
    document.body.appendChild(s);
}

// embrace, extend, extinguish
function Copilot(options) {
    var self = this;
  
    // default options
    self.options = {
      // default language
      language: 'en',
      // default voice
      voice: `
          <speak> 
              <voice name="Google UK English
              (en-GB)">
                  <prosody rate="1.5">
                      <say-as interpret-as="interjection">
  
                      </say-as>
                  </prosody>
              </voice>
          </speak>
      `,
      // default voice name
      voiceName: 'Google UK English (en-GB)',
      // default voice rate
    };
}