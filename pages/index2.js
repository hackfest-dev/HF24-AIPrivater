export async function translateText(query, languageCode) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Use CORS Anywhere proxy
    const url = `${proxyUrl}https://96be-117-236-190-193.ngrok-free.app/translate`;

    // Data to be sent in the POST request
    const requestData = {
        article_hi: query,
        language: languageCode
    };

    try {
        // Sending POST request to the endpoint via the proxy server
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Checking if the request was successful
        if (response.ok) {
            const responseData = await response.json();
            console.log("Bot:", responseData.bot_answer);
        } else {
            console.error("Error:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Example usage
const query = "hi"; // Removed unnecessary parentheses
const languageCode = 1;

translateText(query, languageCode);
