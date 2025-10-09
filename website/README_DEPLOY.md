# Deploying to Vercel

This project is ready to deploy to Vercel. Follow these steps:

## Prerequisites

1. Make sure you have a Vercel account (sign up at https://vercel.com)
2. Install Vercel CLI (optional): `npm i -g vercel`

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Vercel will automatically detect Next.js settings
5. Add your environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

### Option 2: Deploy via CLI

1. Run `vercel` in the project directory
2. Follow the prompts
3. Add environment variables using: `vercel env add OPENAI_API_KEY`

## Environment Variables

Make sure to add the following environment variable in Vercel:

- `OPENAI_API_KEY`: Your OpenAI API key for the chat agent

## Important Notes

- The build script has been configured for Vercel (removed `--turbopack` flag)
- ESLint and TypeScript errors are ignored during build (you may want to fix these later)
- The project uses Next.js 15.5.1 with App Router
- All static assets are in the `public/` folder

## After Deployment

1. Your site will be live at `https://your-project.vercel.app`
2. Configure a custom domain in Vercel settings if desired
3. Monitor your deployment logs in the Vercel dashboard

## Troubleshooting

If you encounter build errors:
1. Check the Vercel build logs
2. Ensure all environment variables are set correctly
3. Verify that all dependencies are in `package.json`
4. Make sure `bg.png` and project images are in the `public/` folder
