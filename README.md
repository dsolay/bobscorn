# Bob's Corn Portal

A full-stack web application for managing corn purchases with rate limiting capabilities.
Built with modern web technologies including Nuxt 4, Vue 3, Node.js, and TypeScript.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 24.11.1 or higher
- **pnpm** 10.23.0 or higher
- **Docker** and **Docker Compose** (for containerized deployment)

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bobscorn
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy environment file for API
   cp apps/api/.env.example apps/api/.env
   ```

4. **Run the development servers**

   **Option A: Run both services simultaneously**

   ```bash
   # From the root directory
   pnpm --filter api dev & pnpm --filter web dev
   ```

   **Option B: Run services separately**

   ```bash
   # Terminal 1 - Start API server
   cd apps/api
   pnpm dev

   # Terminal 2 - Start Web frontend
   cd apps/web
   pnpm dev
   ```

5. **Access the application**
   - Frontend: <http://localhost:3000>
   - API: <http://localhost:8080>

### Docker Setup

#### Using Docker Compose (Recommended)

1. **Build and run all services**

   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: <http://localhost:80>
   - API: <http://localhost:8080>

#### Individual Docker Services

**API Service Only**

```bash
cd apps/api
docker-compose up --build
```

**Web Service Only**

```bash
cd apps/web
docker build -t bobscorn-web .
docker run -p 80:80 bobscorn-web
```

## 📁 Project Structure

```text
bobscorn/
├── apps/
│   ├── api/                 # Backend API (Node.js + Express)
│   │   ├── src/
│   │   ├── prisma/          # Database schema and migrations
│   │   ├── Dockerfile
│   │   └── package.json
│   └── web/                 # Frontend (Nuxt 4 + Vue 3)
│       ├── app/
│       ├── components/
│       ├── i18n/            # Internationalization
│       ├── Dockerfile
│       └── package.json
├── docker-compose.yaml      # Multi-service Docker setup
└── package.json            # Root package.json (monorepo)
```

## 🛠️ Development Commands

### Root Level Commands

```bash
pnpm lint                   # Lint all packages
pnpm lint:api              # Lint API only
pnpm lint:web              # Lint Web only
pnpm lint:fix              # Fix linting issues
```

### API Commands

```bash
cd apps/api
pnpm dev                   # Start development server
pnpm build                 # Build for production
pnpm start                 # Start production server
pnpm lint                  # Run linting
pnpm typecheck             # TypeScript type checking
```

### Web Commands

```bash
cd apps/web
pnpm dev                   # Start development server
pnpm build                 # Build for production
pnpm preview               # Preview production build
pnpm lint                  # Run linting
pnpm typecheck             # TypeScript type checking
```

## 🔧 Configuration

### Environment Variables

**API (.env)**

```env
DATABASE_URL=file:./dev.db
APP_DEBUG=true
PORT=3000
JWT_ACCESS_SECRET=your-secret-key
ORIGINS=http://localhost
```

**Web**
Environment variables for the web app are configured in `nuxt.config.ts` and can be overridden via Docker build args.

### Database

The API uses SQLite by default for development. For production, you can configure PostgreSQL via the Docker setup.

To initialize the database:

```bash
cd apps/api
pnpm prisma generate
pnpm prisma db push
```

## 🧪 Testing

### Running Tests

```bash
# API Tests
cd apps/api
pnpm test

# Web Tests
cd apps/web
pnpm test
```

### Linting and Type Checking

```bash
# Run from root
pnpm lint
pnpm typecheck
```

## 🌐 Internationalization

The application supports multiple languages through Vue I18n. Translation files are located in `apps/web/i18n/locales/`.

- English: `en.json`
- Spanish: `es.json`

To add a new language:

1. Create a new locale file in `apps/web/i18n/locales/`
2. Update the i18n configuration in `apps/web/nuxt.config.ts`

## 🐳 Docker Details

### Services

- **api**: Node.js API server running on port 8080
- **web**: Nuxt.js frontend running on port 80

### Customization

You can customize the Docker setup by modifying:

- `docker-compose.yaml` for service configuration
- Individual `Dockerfile` in each app directory for build customization

## 🔒 Security Features

- Rate limiting (1 purchase per minute per client)
- JWT authentication
- Input validation with Zod
- CORS protection
- Helmet security headers

## 📝 API Documentation

The API follows RESTful principles and includes:

- Authentication endpoints
- Purchase management with rate limiting
- User management
- Error handling with proper HTTP status codes

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages

## 📄 License

ISC License - see LICENSE file for details.
