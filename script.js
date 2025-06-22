// const responses = {
//     'who is rishabh gupta?': `Rishabh Gupta is an accomplished AI Engineer with expertise in developing and implementing cutting-edge artificial intelligence solutions. He has a strong background in machine learning, deep learning, and natural language processing, with a proven track record of delivering innovative AI-powered applications.`,
//
//     'what are his skills?': `Rishabh's technical skills include:
//     • Deep Learning & Machine Learning (PyTorch, TensorFlow)
//     • Natural Language Processing
//     • Computer Vision
//     • Large Language Models (LLMs)
//     • Python, JavaScript, and various AI/ML frameworks
//     • Cloud platforms (AWS, GCP)`,
//
//     'show me his projects': `Here are some of Rishabh's notable projects:
//     1. Developed an advanced NLP system for automated customer support
//     2. Created a computer vision solution for real-time object detection
//     3. Implemented a recommendation engine using deep learning
//     4. Built scalable ML pipelines for production environments`,
//
//     'default': `I'm not sure about that specific query, but I'd be happy to tell you about Rishabh's experience, skills, or projects. Feel free to ask about those topics!`
// };

const chatMessages = document.querySelector('.chat-messages');
const userInput = document.getElementById('userInput');
const typingIndicator = document.querySelector('.typing-indicator');

// Variable to hold the LanguageModel session
let modelSession = null;

// Initialize the LanguageModel session
async function initializeSession() {
    try {
        // Assuming LanguageModel is available globally e.g. via a <script> tag
        if (window.LanguageModel && typeof window.LanguageModel.create === 'function') {
            const systemPromptConfig = {
                initialPrompts: [{
                    role: 'system',
                    content: `You are a specialized AI assistant for Rishabh Gupta's portfolio. Rishabh is an AI Engineer. Your primary functions are to:\n1. Provide information about Rishabh's background, passion for AI, and journey in the field.\n2. Detail Rishabh's skills, including machine learning (PyTorch, TensorFlow), deep learning, natural language processing (NLTK, SpaCy), computer vision (OpenCV, YOLO), LLMs, Python, JavaScript, and cloud platforms (AWS, GCP).\n3. Describe Rishabh's projects, such as 'Project Alpha' (data analytics), 'Project Beta' (NLP engine for sentiment analysis), and 'Project Gamma' (computer vision for object detection), highlighting the technologies used.\n4. Encourage users to explore the different sections of the website (Home, About, Projects, Skills, Contact).\n5. If asked for opinions or information outside of Rishabh's professional context as presented on the site, politely decline and redirect to portfolio-related topics. Maintain a professional, helpful, and enthusiastic tone.`
                }],
            };
            modelSession = await window.LanguageModel.create(systemPromptConfig);
            console.log("LanguageModel session initialized with system prompt.");
        } else {
            console.error("LanguageModel library not found or 'create' method is missing.");
            addMessage("Error: Chat functionality is currently unavailable. LanguageModel library not found.", false);
            typingIndicator.style.display = 'none';
        }
    } catch (error) {
        console.error("Error initializing LanguageModel session:", error);
        addMessage("Error: Could not initialize the chat assistant. Please try again later.", false);
        typingIndicator.style.display = 'none';
    }
}

// Call initializeSession when the script loads
initializeSession();


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
    // We don't need a fixed timeout anymore as we wait for the actual LLM response
}

// async function getResponse(message) {
//     const normalizedMessage = message.toLowerCase().trim();
//     await simulateTyping();
//     typingIndicator.style.display = 'none';
//     return responses[normalizedMessage] || responses['default'];
// }

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';
    simulateTyping(); // Show typing indicator

    if (!modelSession) {
        addMessage("Chat assistant is not available. Session not initialized.", false);
        typingIndicator.style.display = 'none';
        return;
    }

    try {
        const result = await modelSession.prompt(message);
        addMessage(result);
    } catch (error) {
        console.error("Error getting response from LanguageModel:", error);
        addMessage("Sorry, I encountered an error trying to respond. Please try again.", false);
    } finally {
        typingIndicator.style.display = 'none'; // Hide typing indicator
    }
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
