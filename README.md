# WebChat

WebChat is an innovative tool that allows users to chat with the content of any website. By leveraging AI technology and Upstash's vector database, this application provides an interactive way to explore and understand web content through natural language conversations.

## Features

- Chat with any website's content
- User-friendly interface
- Real-time AI-powered responses
- Responsive design for various screen sizes
- Error handling and informative user feedback
- Efficient data storage and retrieval using Upstash Vector and Redis

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Upstash Vector
- Upstash Redis
- QStash

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Upstash account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Osamaz123/WebChat.git
   ```

2. Navigate to the project directory:
   ```
   cd webchat
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   UPSTASH_VECTOR_REST_URL=your_upstash_vector_rest_url
   UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_rest_token
   QSTASH_TOKEN=your_qstash_token
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   ```
   ## Usage

1. On the home page, enter the URL of the website you want to chat about.
2. Click "Start Chatting" to begin the conversation.
3. Type your questions or comments in the chat input field.
4. The AI will respond with information based on the website's content.

## How It Works

1. When a user enters a website URL, WebChat crawls the site and extracts relevant content.
2. The extracted content is processed and stored in Upstash Vector, which allows for efficient similarity searches.
3. User queries are compared against the stored vector representations to find the most relevant information.
4. Upstash Redis is used for caching and managing chat sessions.
5. QStash is utilized for managing asynchronous tasks and background jobs.
