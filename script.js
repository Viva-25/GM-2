
        // Get DOM elements
        const submitButton = document.getElementById('submitAnswer');
        const invitationPopup = document.getElementById('invitationPopup');
        const closePopupButton = document.getElementById('closePopup');
        const incorrectAnimation = document.getElementById('incorrectAnimation');
        const celebrationEffects = document.getElementById('celebrationEffects');
        const celebrationAudio = document.getElementById('celebrationAudio');

        const correctAnswer = 'wind'; // The correct answer to the riddle

        // Function to check the selected answer
        function checkAnswer() {
            const selectedOption = document.querySelector('input[name="riddle"]:checked');

            if (selectedOption) {
                if (selectedOption.value === correctAnswer) {
                    // Correct answer: Show invitation and trigger celebration
                    invitationPopup.classList.add('show');
                    playCelebration();
                } else {
                    // Incorrect answer: Show funny animation
                    triggerIncorrectAnimation();
                }
            } else {
                // No option selected
                alert("Please select an answer!");
            }
        }

        // Function to trigger the incorrect answer animation
        function triggerIncorrectAnimation() {
            incorrectAnimation.style.display = 'block';
            incorrectAnimation.style.animation = 'none'; // Reset animation
            void incorrectAnimation.offsetWidth; // Trigger reflow
            incorrectAnimation.style.animation = 'shake 0.8s ease-in-out forwards'; // Apply shake animation

            setTimeout(() => {
                incorrectAnimation.style.animation = 'fadeOut 0.5s forwards'; // Fade out
                setTimeout(() => {
                    incorrectAnimation.style.display = 'none'; // Hide after fade out
                    incorrectAnimation.style.opacity = '1'; // Reset opacity for next time
                }, 500);
            }, 1000); // Animation visible for 1 second
        }

        // Function to play celebration effects
        function playCelebration() {
            celebrationAudio.currentTime = 0; // Rewind audio to start
            celebrationAudio.play(); // Play celebratory audio

            celebrationEffects.classList.add('active'); // Activate fade-in for effects container

            // Create and animate flower petals
            for (let i = 0; i < 50; i++) {
                const petal = document.createElement('div');
                petal.classList.add('flower-petal');
                petal.style.width = `${Math.random() * 15 + 5}px`; // Random size
                petal.style.height = petal.style.width;
                petal.style.left = `${Math.random() * 100}%`; // Random horizontal position relative to parent
                petal.style.animationDelay = `${Math.random() * 3}s`; // Random delay
                petal.style.setProperty('--end-x', `${(Math.random() - 0.5) * 100}%`); // Random horizontal drift relative to parent
                petal.style.setProperty('--end-rotate', `${Math.random() * 720}deg`); // Random rotation
                celebrationEffects.appendChild(petal);
            }

            // Create and animate popping elements
            for (let i = 0; i < 30; i++) {
                const pop = document.createElement('div');
                pop.classList.add('pop-element');
                pop.style.width = `${Math.random() * 20 + 10}px`; // Random size
                pop.style.height = pop.style.width;
                pop.style.left = `${Math.random() * 100}%`; // Random horizontal position relative to parent
                pop.style.top = `${Math.random() * 100}%`; // Random vertical position relative to parent
                pop.style.animationDelay = `${Math.random() * 1}s`; // Random delay
                celebrationEffects.appendChild(pop);
            }

            // Fade out celebration effects after a delay
            setTimeout(() => {
                celebrationEffects.classList.remove('active'); // Start fade out
                // Remove elements after fade out completes
                setTimeout(() => {
                    celebrationEffects.innerHTML = ''; // Clear all generated elements
                }, 2000); // Match CSS transition duration
            }, 5000); // Effects last for 5 seconds before fading out
        }

        // Event Listeners
        submitButton.addEventListener('click', checkAnswer);
        closePopupButton.addEventListener('click', () => {
            invitationPopup.classList.remove('show');
            celebrationAudio.pause(); // Stop audio when popup is closed
            celebrationAudio.currentTime = 0; // Reset audio
        });

        // Simple alert replacement for demonstration purposes
        function alert(message) {
            const customAlert = document.createElement('div');
            customAlert.style.cssText = `
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background-color: #8B0000; color: white; padding: 20px; border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.5); z-index: 1001; font-size: 1.2em;
                border: 2px solid #FFD700;
            `;
            customAlert.textContent = message;
            document.body.appendChild(customAlert);
            setTimeout(() => {
                customAlert.remove();
            }, 2000); // Alert disappears after 2 seconds
        }
    