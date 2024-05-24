# Progenetor

Progenetor is an AI ChatBot Prompt Generator app designed to elevate your chatbot's performance. It’s the perfect tool for crafting engaging prompts that drive meaningful AI conversations. Simple, efficient, and versatile—transform your chatbot experience now.

## Features

- Generate detailed and in-depth prompts for your AI chatbot.
- Powered by the Gemini 1.5 AI model.
- Built with Next.js using `create-next-app`.
- Deployed at [progenetor.vercel.app](https://progenetor.vercel.app).

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/polyxenna/progenetor.git
    cd progenetor
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file in the root of your project and add your Gemini API key:

```env
NEXT_PUBLIC_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

> Note: For security reasons, ensure that your `.env` file is listed in your `.gitignore` file to prevent it from being pushed to your repository.

## Usage

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about Next.js and the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
