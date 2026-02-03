# Notlify - Your Daily Notes Platform

A modern, minimalist platform for writing and organizing daily notes with markdown support, tagging, and public/private visibility.

## Features

- 📝 **Markdown Editor** - Write notes with full markdown support and live preview
- 🏷️ **Smart Tagging** - Automatic hashtag extraction and manual tag management
- 🔒 **Privacy Control** - Keep notes private or make them public
- 🔍 **Powerful Search** - Quickly find notes by title, content, or tags
- 🌓 **Dark Mode** - Beautiful light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🚀 **Auto-Deploy** - Push to GitHub and deploy automatically

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with syntax highlighting
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Notlify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Update the following variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for local)

4. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   
   In Vercel project settings, add:
   - `DATABASE_URL`: Your production PostgreSQL URL (use Vercel Postgres or Supabase)
   - `NEXTAUTH_SECRET`: Generate a new secret for production
   - `NEXTAUTH_URL`: Your Vercel deployment URL

4. **Set up Vercel Postgres (Optional)**
   - In Vercel project, go to Storage tab
   - Create a new Postgres database
   - Copy the connection string to `DATABASE_URL`

5. **Deploy**
   - Vercel will automatically build and deploy
   - Future pushes to main branch will trigger auto-deploys

### Manual Deployment

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

## Project Structure

```
Notlify/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Protected pages with layout
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── editor/           # Markdown editor components
│   ├── layout/           # Layout components
│   └── notes/            # Note-related components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
├── types/                # TypeScript types
└── public/               # Static assets
```

## Usage

### Creating Notes

1. Click "New Note" in the sidebar
2. Enter a title and content (markdown supported)
3. Use hashtags (e.g., #work, #personal) to automatically tag notes
4. Toggle "Make this note public" to control visibility
5. Click "Create Note" to save

### Searching Notes

- Use the search page to find notes by title or content
- Click on tags to filter notes by specific tags
- Search is instant and works across all your notes

### Managing Privacy

- Private notes (default) are only visible to you
- Public notes can be shared and viewed by others
- Toggle privacy in the note editor

## Scaling & Premium Features

### Future Enhancements

- **Stripe Integration**: Add premium subscriptions
- **Image Uploads**: Support for images via Cloudinary/S3
- **Collaboration**: Share notes and enable comments
- **Full-Text Search**: Upgrade to PostgreSQL full-text search
- **Analytics**: Track note views and engagement
- **API Access**: Expose public API for integrations

### Performance Optimization

- Implement pagination (currently showing all notes)
- Add caching with Redis
- Enable ISR (Incremental Static Regeneration) for public notes
- Add CDN for static assets

## Database Migrations

When you update the Prisma schema:

```bash
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

For production:

```bash
npx prisma migrate deploy
```

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check firewall settings for remote databases

### Authentication Issues

- Clear browser cookies
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain

### Build Errors

- Delete `.next` folder and rebuild
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure TypeScript version is compatible

## Contributing

Feel free to submit issues and pull requests!

## License

MIT
