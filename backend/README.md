# NoteBox Backend API

Backend API for NoteBox - A lightweight application for creating quick notes with search and tag categorization.

## Features

- RESTful API architecture
- TypeScript for type safety
- Express.js framework
- SQL Server database integration
- Comprehensive error handling
- Request validation with Zod
- CORS configuration
- Security headers with Helmet
- Response compression

## Prerequisites

- Node.js 18+ 
- SQL Server 2019+
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run database migrations (when available)

## Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## API Documentation

### Base URL
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check
```
GET /health
```

Returns the API health status.

### API Versioning

The API uses URL path versioning:
- `/api/v1/external/*` - Public endpoints
- `/api/v1/internal/*` - Authenticated endpoints

## Project Structure

```
src/
├── api/              # API controllers
├── routes/           # Route definitions
├── middleware/       # Express middleware
├── services/         # Business logic
├── utils/            # Utility functions
├── constants/        # Application constants
├── instances/        # Service instances
├── config/           # Configuration
└── server.ts         # Application entry point
```

## Environment Variables

See `.env.example` for all available configuration options.

## License

ISC