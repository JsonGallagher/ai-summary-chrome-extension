chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

// Listener for messages from the content script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('Received message:', request);
        if (request.action === "submitPageContent") {
            submitToOpenAI(request.content).then(data => {
                if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                    const summary = data.choices[0].message.content;
                    console.log(summary); // Log the summary
                    sendResponse({summary: summary}); // Send the summary back to the content script
                } else {
                    console.error('Error: Unexpected response structure:', JSON.stringify(data));
                    sendResponse({error: 'Error: Unexpected response structure from server.'});
                }
            }).catch(error => {
                console.error('Error:', error);
                sendResponse({error: error.toString()}); // Send the error back to the content script
            });
            return true; // Indicate that the response will be sent asynchronously
        }
    }
);

// Function to submit data to your server
async function submitToOpenAI(pageContent) {
    try {
        const response = await fetch('http://localhost:3000/submitToOpenAI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pageContent: pageContent  // Only send the necessary content for summarization
            })
        });
        const data = await response.json(); // Parse the response to JSON
        console.log(data); // Log the response
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to catch it in the .catch() block of the promise
    }
}