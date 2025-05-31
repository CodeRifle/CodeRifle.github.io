const responses = {
    'who is rishabh gupta?': `Rishabh Gupta is an accomplished AI Engineer with expertise in developing and implementing cutting-edge artificial intelligence solutions. He has a strong background in machine learning, deep learning, and natural language processing, with a proven track record of delivering innovative AI-powered applications.`,

    'what are his skills?': `Rishabh's technical skills include:
    • Deep Learning & Machine Learning (PyTorch, TensorFlow)
    • Natural Language Processing
    • Computer Vision
    • Large Language Models (LLMs)
    • Python, JavaScript, and various AI/ML frameworks
    • Cloud platforms (AWS, GCP)`,

    'show me his projects': `Here are some of Rishabh's notable projects:
    1. Developed an advanced NLP system for automated customer support
    2. Created a computer vision solution for real-time object detection
    3. Implemented a recommendation engine using deep learning
    4. Built scalable ML pipelines for production environments`,

    'default': `I'm not sure about that specific query, but I'd be happy to tell you about Rishabh's experience, skills, or projects. Feel free to ask about those topics!`
};

const chatMessages = document.querySelector('.chat-messages');
const userInput = document.getElementById('userInput');
const typingIndicator = document.querySelector('.typing-indicator');

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);

    // Trigger reflow for animation
    messageDiv.offsetHeight;
    messageDiv.classList.add('visible');

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateTyping() {
    typingIndicator.style.display = 'block';
    return new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
}

async function getResponse(message) {
    const normalizedMessage = message.toLowerCase().trim();
    await simulateTyping();
    typingIndicator.style.display = 'none';
    return responses[normalizedMessage] || responses['default'];
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    const response = await getResponse(message);
    addMessage(response);
}

function usePrompt(prompt) {
    userInput.value = prompt;
    sendMessage();
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
