# CodeMate

CodeMate is an innovative application designed to connect developers and facilitate collaboration. With CodeMate, you can find and join rooms, share your screen, send messages, and reply to each other, enhancing your coding experience and productivity.

## Features

- **Find and Join Rooms**: Easily browse and join rooms for collaboration.
- **Screen Sharing**: Share your screen with room participants to demonstrate code or collaborate on projects.
- **Real-time Messaging**: Send messages instantly and engage in real-time conversations.
- **Threaded Replies**: Reply to specific messages to keep discussions organized and coherent.

## Live Demo

Check out the live application here: [CodeMate Live](https://codemate-1geh.onrender.com)

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, ShadCN UI
- **Backend**: Node.js, Drizzle ORM, PostgreSQL
- **Real-time Communication**: WebSockets, GetStream API
- **Authentication**: Next-Auth

## Getting Started

Follow these steps to set up and run CodeMate locally.

### Prerequisites

- Node.js v20.10.0 or higher
- PostgreSQL database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/codemate.git
    cd codemate
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables:

    Create a `.env.local` file in the root of your project and add the following:

    ```env
    DATABASE_URL=postgresql://username:password@localhost:5432/codemate
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    NEXT_PUBLIC_GET_STREAM_API_KEY=
    NEXT_PUBLIC_GET_STREAM_API_SECRET_KEY=
    ```

4. Run database migrations:

    ```bash
    npx drizzle orm migrate
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and visit `http://localhost:3000`.

## Contributing

We welcome contributions to CodeMate! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.
---

Happy Coding! 🚀
