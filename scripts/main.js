document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const messageDisplay = document.getElementById('messageDisplay');
    const messageContent = document.getElementById('messageContent');
    const backBtn = document.getElementById('backBtn');
    const optionButtons = document.querySelectorAll('.option-btn');
    const backgroundUpload = document.getElementById('backgroundUpload');
    const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');
    const voiceMessagePlayer = document.getElementById('voiceMessagePlayer');
    
    // Countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Initialize countdown to April 17, 2025
    const countdown = new Countdown(
        '2025-04-17T00:00:00',
        daysElement,
        hoursElement,
        minutesElement,
        secondsElement
    );
    
    countdown.start();

    // Typing Effect Initialization
    const typingEffect = new TypingEffect(messageContent);

    // Voice Recorder Initialization
    const voiceRecorder = new VoiceRecorder(voiceMessagePlayer);

    // Background Upload Functionality
    changeBackgroundBtn.addEventListener('click', () => {
        backgroundUpload.click();
    });

    backgroundUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.body.style.backgroundImage = `url(${e.target.result})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
            };
            reader.readAsDataURL(file);
        }
    });

    // Heart Animation Function (from previous implementation)
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.width = `${Math.random() * 20 + 10}px`;
        heart.style.height = heart.style.width;
        heart.style.animationDuration = `${Math.random() * 5 + 3}s`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    function startHeartAnimation() {
        const heartInterval = setInterval(createHeart, Math.random() * 700 + 300);
        setTimeout(() => {
            clearInterval(heartInterval);
        }, 30000);
    }

    // Envelope opening animation
    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            startHeartAnimation();
        }
    });

    // Option buttons functionality
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.getAttribute('data-mood');
            const messages = messageDatabase[mood];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];

            envelope.style.display = 'none';
            messageDisplay.style.display = 'block';

            // Use typing effect instead of direct text assignment
            typingEffect.type(randomMessage);
        });
    });

    // Back to envelope button
    backBtn.addEventListener('click', () => {
        envelope.style.display = 'block';
        messageDisplay.style.display = 'none';
        envelope.classList.remove('open');

        // Reset voice message player
        voiceMessagePlayer.src = '';
        voiceMessagePlayer.style.display = 'none';
    });

    // Optional initial heart animation
    if (Math.random() > 0.5) {
        startHeartAnimation();
    }
});
