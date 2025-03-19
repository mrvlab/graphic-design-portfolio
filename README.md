# Graphic Designer (Portfolio)

## Next.js + Sanity Studio Setup

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and integrated with [Sanity Studio](https://www.sanity.io/).

## Getting Started

### 1. Install Dependencies

Ensure you have the Sanity CLI installed globally:

```bash
npm install -g sanity
```

Then, install dependencies for your project:

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root of your project if it does not exist, and add the following variables:

```ini
SANITY_STUDIO_PROJECT_ID="<paste your project ID here>" # Required - The ID of your Sanity project
SANITY_STUDIO_DATASET="production" # Required - The dataset of your Sanity project
SANITY_STUDIO_PREVIEW_URL="" # Optional - Defaults to http://localhost:3000
SANITY_STUDIO_STUDIO_HOST="" # Optional
```

### 3. Initialize Sanity Studio

If you haven't already, initialize Sanity Studio inside your Next.js project:

```bash
sanity init
```

Follow the prompts to create a new Sanity project or link an existing one.

### 4. Run the Development Server

To start both Next.js and Sanity Studio locally, run:

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) to see your Next.js application.
- Open [http://localhost:3333](http://localhost:3333) to access Sanity Studio.

If you have embedded Sanity Studio inside Next.js (`/studio` route), visit:

```
http://localhost:3000/studio
```

## Deploying Sanity Studio

You can deploy Sanity Studio separately using:

```bash
sanity deploy
```

Or, if embedded inside your Next.js project, deploy it along with your app using a hosting provider like Vercel or Netlify.

## Learn More

To learn more about Next.js and Sanity, visit:

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
