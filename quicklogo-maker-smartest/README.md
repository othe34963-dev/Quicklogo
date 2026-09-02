# QuickLogo Maker Smartest

Full-stack starter for an AI logo maker using Next.js + Prisma.

## Run locally

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000

## Important security note

The signup route intentionally stores the password as plain text only to keep this starter self-contained.
Before production, replace it with Argon2 or bcrypt and use a real session/auth system.

## Replace the logo generator

Edit `lib/ai.ts`. Connect it to your preferred image generation provider and return a public image URL.

## Suggested production stack

- Next.js
- PostgreSQL
- Prisma
- Auth.js or Clerk
- S3/R2-compatible object storage
- Stripe
- Redis/rate limiting
- AI image provider
- Vercel/Render/Fly.io/AWS
