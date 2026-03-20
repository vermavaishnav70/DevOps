# Instructions

1. Use MongoDB for database storage implementation
1. Use Mongoose for ORM
1. Implement at least one full CRUD RESTful API
1. Deploy it on Render for backend and vercel for frontend
1. Resolve CORS issue if needed after deployment

## Explanation

### Architecture
The project follows a standard 3-tier MERN-like architecture:
1. **Frontend**: React via Vite. The UI fetches data from the backend via REST. Cypress handles E2E testing, Vitest handles unit tests.
2. **Backend**: Express + Node.js. Serves a REST API over HTTP.
3. **Database**: MongoDB via Mongoose. Mongoose handles schemas and data integrity. We use `mongodb-memory-server` in the test environment.

### Workflow
1. **Local Development**: Run `npm install` and use `dev` scripts in client and server.
2. **CI (Continuous Integration)**: GitHub Actions run on `push` and `pull_request` to verify code quality. The pipeline:
   - Sets up Node.js for client and server.
   - Runs ESLint to check for stylistic and syntax errors.
   - Runs unit and integration tests (Jest / Vitest).
3. **CD (Continuous Deployment)**: Simulated via an AWS EC2 deployment Github action that connects to a target server via SSH. *(Note: For a full deployment, `EC2_HOST`, `EC2_USER`, and `EC2_SSH_KEY` must be configured in GitHub Secrets. Without these, the CD step cleanly simulates success but skips SSH.)*
4. **Dependabot**: Automatically scans and updates `npm` dependencies weekly.

### Design Decisions
- **Express + Mongoose**: Used for rapid prototyping and flexibility, switching from SQLite to MongoDB to suit database requirements.
- **Premium UI**: Leveraged standard modern CSS with variables and hover states rather than a heavy component library to keep the frontend bundle small and the UI bespoke.
- **Cypress E2E Testing**: Added to simulate real user flows, verifying the integration from the browser down to the database level.
- **Idempotency**: Adjusted scripts like `dev-setup.sh` and `ec2-script.sh` to check state before applying changes, preventing destructive overwrites.

### Challenges
- **Test Automation with Mongoose**: Setting up `mongodb-memory-server` required handling `mongoose.connection` carefully to avoid overlapping connection pools during automated Jest testing.
- **Idempotency in Bash**: Making sure `npm install` only runs when necessary required checking for the existence of `node_modules`.
 
