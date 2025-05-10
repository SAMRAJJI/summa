document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');

    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});


const projectsContainer = document.querySelector(".projects");
let scrollPosition = 0;
const projectWidth = 220; // Includes width + margin of .project-box

function scrollLeft() {
    scrollPosition = Math.max(scrollPosition - projectWidth, 0);
    projectsContainer.style.transform = `translateX(-${scrollPosition}px)`;
}

function scrollRight() {
    const maxScroll = projectsContainer.scrollWidth - projectsContainer.clientWidth;
    scrollPosition = Math.min(scrollPosition + projectWidth, maxScroll);
    projectsContainer.style.transform = `translateX(-${scrollPosition}px)`;
}



// Chatbot toggle function
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
}

// Function to send user message and receive response
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="user-message">${userInput}</div>`;
    document.getElementById('user-input').value = '';

    // Simulate a response from the chatbot
    setTimeout(() => {
        const botResponse = "I'm here to help! What can I assist you with?";
        chatBox.innerHTML += `<div class="bot-message">${botResponse}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }, 1000);
} 

function sendMessage() {
    let userMessage = document.getElementById('userMessage').value;

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        let botReply = data.fulfillmentText;
        document.getElementById('chatBox').innerHTML += "<div>Bot: " + botReply + "</div>";
    })
    .catch(error => console.error('Error:', error));
}


