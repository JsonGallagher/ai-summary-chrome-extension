# Chrome Extension for ChatGPT-4 Summarization

This Chrome extension offers a quick and efficient way to summarize web page content using OpenAI's ChatGPT-4 API. With a simple click, users can activate the extension to send the current page's content to a node server, which then communicates with the ChatGPT-4 API to generate a concise summary. This tool is perfect for those looking to grasp the main points of web articles, blogs, and other online materials without reading the full text.

## App Preview

![App Preview](/app_preview_images/app_preview.png)

## Features

- Easy-to-use interface integrated directly into the Chrome browser.
- Fast and accurate summarization of online text content.
- Secure handling of data with user privacy in mind.


## Getting Started

### Prerequisites

- Google Chrome browser.
- Node.js installed on your local machine for server setup.

## Installation

### Clone repo

1. Clone the GitHub repository to your local machine.

   ```sh
   git clone <repository-url>
   ```

### API Key Configuration

1. Within the openai-server directory, create a `.env` file.
2. Add the following line, replacing `<your-api-key>` with your actual OpenAI API key:

   ```env
   OPENAI_API_KEY=<your-api-key>
   ```

### Server Setup

To facilitate communication with OpenAI's API, a local server needs to be set up:

1. Navigate to the project's root directory in your terminal.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the server using Node.js:

   ```sh
   node server.js
   ```

### Install chrome extension

1. Navigate to `chrome://extensions/` in the Chrome browser.
2. Toggle on "Developer mode" at the top-right corner.
3. Click "Load unpacked" and navigate to the directory containing the cloned extension files.
4. Select the directory to install the extension.

## Usage

After installation and server setup:

1. Click on the extension icon in the Chrome toolbar.
2. The extension will automatically send the current page content to the server, which then submits it to OpenAI's API for summarization.
3. Summarized content will be logged to the console.

## Contributing

We welcome contributions to this project! If you have suggestions for improvements or new features, please feel free to contact me.

## License

This project is open-sourced under the MIT License.

## Acknowledgements

- OpenAI for providing the ChatGPT API.
- The Chrome Extensions documentation for guidance on extension development.

Thank you for your interest in our Chrome extension project! Your feedback and contributions are greatly appreciated.
