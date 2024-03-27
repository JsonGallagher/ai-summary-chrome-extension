document.getElementById('submit').addEventListener('click', async () => {
    console.clear()
    console.log('Button clicked');
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: submitPageToOpenAI,
    });
});

async function submitPageToOpenAI() {
    const response = await fetch(document.location.href);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Remove <script> and <style> elements
    const scriptElements = doc.getElementsByTagName('script');
    const styleElements = doc.getElementsByTagName('style');
    for (let i = scriptElements.length - 1; i >= 0; i--) {
        scriptElements[i].parentNode.removeChild(scriptElements[i]);
    }
    for (let i = styleElements.length - 1; i >= 0; i--) {
        styleElements[i].parentNode.removeChild(styleElements[i]);
    }

    let bodyText = doc.body.innerText;

    // Limit the content to 50000 characters
    if (bodyText.length > 50000) {
        bodyText = bodyText.substring(0, 50000);
    }

    // Send the text to OpenAI's API
    chrome.runtime.sendMessage({action: "submitPageContent", content: bodyText}, function(response) {
        if (response.error) {
            console.error('Error:', response.error); // Log the error
        } else {
            console.log(response.summary); // Log the summary
        }
    });
}