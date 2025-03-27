class TypingEffect {
    constructor(element) {
        this.element = element;
        this.cursor = document.createElement('span');
        this.cursor.classList.add('typing-cursor');
    }

    type(message, speed = 30) {
        // Clear previous content
        this.element.innerHTML = '';
        
        // Add cursor
        this.element.appendChild(this.cursor);

        let index = 0;
        const typeNextCharacter = () => {
            if (index < message.length) {
                // Insert the character before the cursor
                this.element.insertBefore(
                    document.createTextNode(message.charAt(index)), 
                    this.cursor
                );
                index++;
                setTimeout(typeNextCharacter, speed + Math.random() * 50);
            } else {
                // Remove cursor when typing is complete
                this.cursor.remove();
            }
        };

        typeNextCharacter();
    }
}