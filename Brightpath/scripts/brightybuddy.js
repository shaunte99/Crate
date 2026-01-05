const messagesEl = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const options = document.querySelectorAll('.sidebar .option');

// Scroll helper
function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Add message
function addMessage(text, sender='bot') {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  messagesEl.appendChild(msg);
  scrollToBottom();
}

// Simulate bot typing
function botReply(text) {
  addMessage('...', 'bot');
  setTimeout(() => {
    messagesEl.lastChild.remove();
    addMessage(text, 'bot');
  }, 800 + Math.random()*500);
}

// Handle user sending message
function sendMessage() {
  const text = userInput.value.trim();
  if(!text) return;
  addMessage(text, 'user');
  userInput.value = '';
  handleBotResponse(text);
}

// Basic bot logic for demo
function handleBotResponse(text) {
  const lower = text.toLowerCase();
  if(lower.includes('phonics')) botReply('Sure! Let\'s practice some phonics sounds. What letter would you like to start with?');
  else if(lower.includes('numeracy')) botReply('Great! Shall we practice addition, subtraction, or counting?');
  else if(lower.includes('story')) botReply('Once upon a time, in a bright sunny land, there was a little learner named Brighty...');
  else if(lower.includes('worksheet')) botReply('I can generate a worksheet for you. What topic should it cover?');
  else if(lower.includes('lesson')) botReply('Absolutely! Let\'s create a lesson plan. Which grade are we teaching today?');
  else botReply('I\'m here to help! Try typing "Phonics", "Numeracy", "Story", "Lesson", or "Worksheet".');
}

// Sidebar option clicks
options.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    addMessage(btn.textContent, 'user');
    handleBotResponse(action);
  });
});

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') sendMessage();
});

// Clear chat
document.getElementById('clearBtn').addEventListener('click', () => {
  messagesEl.innerHTML = '';
  addMessage('Hi! I\'m Brighty’s Buddy. Ask me anything or choose an option on the left!', 'bot');
});

// Initialize
addMessage('Hi! I\'m Brighty’s Buddy. Ask me anything or choose an option on the left!', 'bot');
