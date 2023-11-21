This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app@latest`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

I'm using pnpm and pushed this repo with pnpm-lock.yaml so if you want to use other package manager, **please delete the file**!
Your Column should be **DateTime** however you can customize it if you want, if there is a better name welcome to open an issue here and submit a PR.

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

## Steps

```bash
# Get your own token and DB from your link
# Example from link above and the token below

NOTION_TOKEN="your_secret_token_from_this_link" https://www.notion.so/my-integrations
NOTION_CLASSES_DB="some_token_here_is_the_one_from above" https://www.notion.so/some_token_here_is_the_one_you_should_take?v=idk_what_is_this_dont_take
```

Then you can self host on your own Vercel account.

## Plans for this project

I'm thinking of adding Google Calendar as well, but i'm lazy so maybe a few days later

This project is open for PR and issues to discuss what to add and improve.
