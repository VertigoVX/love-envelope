class VoiceRecorder {
    constructor(audioPlayerElement) {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.audioPlayerElement = audioPlayerElement;
        this.recordButton = document.getElementById('recordVoiceBtn');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.recordButton.addEventListener('click', () => {
            if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                this.stopRecording();
            } else {
                this.startRecording();
            }
        });
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            
            this.audioChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };
            
            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                
                this.audioPlayerElement.src = audioUrl;
                this.audioPlayerElement.style.display = 'block';
                
                this.recordButton.textContent = '🎤 Record Voice Message';
            };
            
            this.mediaRecorder.start();
            this.recordButton.textContent = '🛑 Stop Recording';
        } catch (err) {
            console.error('Error accessing microphone', err);
            alert('Could not access microphone. Please check permissions.');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }
    }
}