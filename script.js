document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const themeToggle = document.getElementById("theme-toggle");

    // Predefined love questions and their responses about Rishi and Abhinav
    const suggestions = [
        { text: "How did Rishi and Abhinav meet?", response: "Rishi and Abhinav met during a poetry reading event, where they instantly connected." },
        { text: "What is Rishi's favorite thing about Abhinav?", response: "Rishi loves Abhinav's kindness and the way he always knows how to make him smile." },
        { text: "What do Rishi and Abhinav enjoy doing together?", response: "They enjoy stargazing, cooking together, and sharing their favorite books." },
        { text: "What was their first date like?", response: "Their first date was at a quaint café where they shared stories and laughter over coffee." }
    ];

    // Additional love-themed questions about their relationship
    const loveQuestions = [
        { text: "What is Rishi's love language?", response: "Rishi's love language is acts of service; he loves doing little things to show his affection." },
        { text: "What is Abhinav's favorite memory with Rishi?", response: "Abhinav cherishes the moment Rishi surprised him with a handwritten letter on their anniversary." },
        { text: "How do they celebrate their love?", response: "They celebrate their love by planning special date nights and surprising each other with thoughtful gifts." },
        { text: "What song reminds Rishi of Abhinav?", response: "The song 'Perfect' by Ed Sheeran reminds Rishi of Abhinav and their beautiful moments together." },
        { text: "What is their dream vacation together?", response: "Their dream vacation is to travel to Paris, exploring the city of love hand in hand." }
    ];

    // Random suggestions based on Rishi and Abhinav's love story
    const randomSuggestions = [
        "What is Rishi's favorite romantic gesture for Abhinav?",
        "How do Rishi and Abhinav express their love for each other?",
        "What is the most memorable date Rishi and Abhinav have had?",
        "What is Rishi's favorite thing to cook for Abhinav?",
        "How do Rishi and Abhinav support each other's dreams?"
    ];

    const loveStoryFacts = [
        "Rishi and Abhinav met during a poetry reading event.",
        "Their first date was at a quaint little café where they shared their favorite books.",
        "They both love stargazing and often spend nights watching the stars together.",
        "Rishi surprised Abhinav with a handwritten letter on their anniversary.",
        "They enjoy cooking together and often try out new recipes.",
        "Rishi once wrote a song for Abhinav, which he still plays on special occasions."
    ];

    // Function to add a message to the chat with animation
    function addMessageToChat(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        // Trigger animation
        requestAnimationFrame(() => {
            messageDiv.classList.add('fade-in');
        });
    }

    // Function to show suggestions
    function showSuggestions() {
        // Clear previous suggestions to avoid duplicates
        const existingSuggestionContainer = document.querySelector(".suggestion-container");
        if (existingSuggestionContainer) {
            existingSuggestionContainer.remove(); // Remove existing suggestions
        }

        const suggestionContainer = document.createElement("div");
        suggestionContainer.className = "suggestion-container";
        suggestionContainer.style.maxHeight = "200px"; // Set a max height for scrolling
        suggestionContainer.style.overflowY = "auto"; // Enable vertical scrolling

        // Add predefined suggestions
        suggestions.forEach(suggestion => {
            const suggestionButton = document.createElement("button");
            suggestionButton.className = "suggestion-button";
            suggestionButton.textContent = suggestion.text;
            suggestionButton.onclick = () => {
                handleSuggestionClick(suggestion);
                // Show new suggestions after selection
                showSuggestions(); // Refresh suggestions
            };
            suggestionContainer.appendChild(suggestionButton);
        });

        // Add love-themed questions
        loveQuestions.forEach(loveQuestion => {
            const loveQuestionButton = document.createElement("button");
            loveQuestionButton.className = "suggestion-button";
            loveQuestionButton.textContent = loveQuestion.text;
            loveQuestionButton.onclick = () => {
                handleSuggestionClick(loveQuestion);
                // Show new suggestions after selection
                showSuggestions(); // Refresh suggestions
            };
            suggestionContainer.appendChild(loveQuestionButton);
        });

        // Add random suggestions based on their love story
        randomSuggestions.forEach(randomSuggestion => {
            const randomSuggestionButton = document.createElement("button");
            randomSuggestionButton.className = "suggestion-button";
            randomSuggestionButton.textContent = randomSuggestion;
            randomSuggestionButton.onclick = () => {
                addMessageToChat(randomSuggestion, "user-message");
                addMessageToChat("That's a great question! Let me think...", "ai");
                // Show new suggestions after selection
                showSuggestions(); // Refresh suggestions
            };
            suggestionContainer.appendChild(randomSuggestionButton);
        });

        // Append the new suggestion container to chat messages
        chatMessages.appendChild(suggestionContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

    // Function to handle suggestion click
    function handleSuggestionClick(suggestion) {
        addMessageToChat(suggestion.text, "user-message"); // Show user message
        addMessageToChat(suggestion.response, "ai"); // Show AI response
        showSuggestions(); // Show suggestions again after responding
    }

    // Function to handle sending messages
    function sendMessage() {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            addMessageToChat(userMessage, "user-message"); // Show user message
            messageInput.value = ""; // Clear input field
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
            
            // Check if the user message matches any suggestion
            const matchedSuggestion = [...suggestions, ...loveQuestions].find(suggestion => suggestion.text.toLowerCase() === userMessage.toLowerCase());
            if (matchedSuggestion) {
                addMessageToChat(matchedSuggestion.response, "ai"); // Show respective AI response
            } else {
                // Show random love story fact if no match
                const randomFact = loveStoryFacts[Math.floor(Math.random() * loveStoryFacts.length)];
                addMessageToChat(randomFact, "love-story"); // Add random love story fact
            }
            showSuggestions(); // Show suggestions again after replying
        }
    }

    // Initial call to show suggestions
    showSuggestions();

    // Event listener for the send button
    sendButton.addEventListener("click", sendMessage);

    // Optional: Allow pressing Enter to send the message
    messageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage(); // Trigger the send message function
        }
    });

    // Theme toggle functionality
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        document.querySelector(".chat-interface").classList.toggle("dark-theme");
        document.querySelector(".chat-header").classList.toggle("dark-theme");
    });
});