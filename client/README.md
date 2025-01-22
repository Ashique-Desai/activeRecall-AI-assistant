## Project structure

```
root/
    ├── client/
    │   ├── src/
    │   │   ├── app/
    │   │   │   ├── page.tsx             # Entry point for the next.js app
    │   │   │   ├── layout.tsx
    │   │   │   └── ...
    │   │   ├── components/
    │   │   │   ├── Voice/
    │   │   │   │   ├── RecordButton.tsx
    │   │   │   │   ├── AudioPlayer.tsx
    │   │   │   │   └── AudioRecorder.tsx
    │   │   └── ...
    │   ├── Dockerfile               # Docker configuration for the Next.js app
    │   ├── next.config.mjs          # Next.js configuration
    │   ├── .gitignore               # Git ignore file for client-side code
    │   ├── .dockerignore            # Docker ignore file
    │   ├── tsconfig.json            # TypeScript configuration
    │   ├── package.json             # Node.js dependencies and scripts
    │   ├── README.md                # Documentation for the client app
    │
    ├── fastAPI-backend/
        ├── app/
        │   ├── __init__.py
        │   ├── main.py                # Entry point for the FastAPI app
        │   ├── api/
        |   ...
        ...
```

# Progress so far with the development:

Created components to record and send the voice blobs to the transcription endpoint and now the issues are resolved and we are getting the text back from the whisper-1 model.

## Docker commands to start/stop the app in container:

```
systemctl --user start docker-desktop # start the deamon
docker compose up --build
docker compose down
```

## Start the app without docker

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
