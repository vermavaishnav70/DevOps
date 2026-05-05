# Instructions

1. Use MongoDB for database storage implementation
1. Use Mongoose for ORM
1. Implement at least one full CRUD RESTful API
1. Deploy it on Render for backend and vercel for frontend
1. Resolve CORS issue if needed after deployment

## Explanation

## Architecture

```mermaid
graph TD
    Client[User Browser] -->|HTTP/S| S3[AWS S3 Bucket<br>Frontend Host]
    Client -->|API Requests| ECS[AWS ECS Fargate<br>Backend Container]
    
    subgraph AWS Cloud
        S3
        ECS
        ECR[AWS ECR<br>Docker Registry] -->|Pulls Image| ECS
        CloudWatch[AWS CloudWatch<br>Logs & Monitoring]
        ECS -->|Sends Logs| CloudWatch
        TF_S3[AWS S3<br>Terraform State & Locks]
    end
```

The application is deployed entirely on AWS using Infrastructure as Code (Terraform):
- **Frontend**: Hosted on **AWS S3** as a static website.
- **Backend**: Containerized via Docker, stored in **AWS ECR**, and deployed to **AWS ECS Fargate** as a serverless container.
- **Monitoring**: Application logs are automatically shipped to **Amazon CloudWatch** for observability and monitoring.
- **Terraform State**: Remote state is securely stored in a dynamically created **AWS S3** bucket, utilizing modern native S3 state locking (`use_lockfile=true`) to prevent concurrent modifications.

### Deployed Application
- **URL**: [http://<s3-website-endpoint>](http://<s3-website-endpoint>) *(Placeholder)*
- **API Endpoint**: [http://<ecs-public-ip>:5001/api](http://<ecs-public-ip>:5001/api) *(Placeholder)*

---

## Required GitHub Secrets

To successfully run the CI/CD pipeline, the following secrets **must** be configured in your GitHub repository (`Settings` → `Secrets and variables` → `Actions`):

| Secret Name | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | Your AWS Account Access Key |
| `AWS_SECRET_ACCESS_KEY` | Your AWS Account Secret Key |
| `AWS_SESSION_TOKEN` | Your AWS Session Token (Required for AWS Learner Labs/voclabs) |
| `AWS_REGION` | The region to deploy to (e.g., `us-east-1`) |
| `MONGO_URI` | Your MongoDB connection string (used by the ECS container) |

---

## CI/CD Pipeline

We strictly enforce the following workflow order in our GitHub Actions pipeline (`pipeline.yml`):

1. **CI (Tests)**: On push/PR to `main`, the pipeline sets up Node.js, runs client/server linters, and executes unit/integration tests. Test reports (JUnit) and coverage artifacts are generated and uploaded.
2. **Terraform Apply**: 
   - Dynamically provisions an S3 bucket for **Remote State Management** if it doesn't already exist.
   - Initializes, plans, and automatically applies the infrastructure (S3, ECR, ECS, Security Groups). S3 buckets are configured with **versioning enabled**, **AES256 encryption**, and **public access blocked**.
   - Note: To comply with AWS Academy (`voclabs`) restrictions, Terraform uses the pre-existing `LabRole` rather than creating new IAM roles.
3. **Docker Build & Push**: The backend application is built using a **multi-stage Dockerfile** (running as a **non-root user** with a **healthcheck**) and pushed to the newly provisioned Amazon ECR repository.
4. **ECS Deploy**: The frontend is synced to the S3 bucket. The backend ECS Service is updated to run the latest Docker image. The pipeline concludes by running `aws ecs describe-services` to verify the service is successfully running and active.

### Screenshots

**GitHub Actions Pipeline Success**
*(Insert Screenshot Here)*

**AWS ECS Service Running**
*(Insert Screenshot Here)*

**AWS S3 Configuration (Encryption, Versioning)**
*(Insert Screenshot Here)*

---

### Local Development & Testing

To run the application locally or execute tests, use the following commands:

**Client (Frontend)**
```bash
cd client
npm install
npm run dev      # Start local development server
npm test         # Run unit tests via Vitest
npm run lint     # Run ESLint
```

**Server (Backend)**
```bash
cd server
npm install
npm run dev      # Start local backend with nodemon
npm test         # Run unit & integration tests via Jest
npm run lint     # Run ESLint
```

---

### Design Decisions
- **Express + Mongoose**: Used for rapid prototyping and flexibility, switching from SQLite to MongoDB to suit database requirements.
- **Premium UI**: Leveraged standard modern CSS with variables and hover states rather than a heavy component library to keep the frontend bundle small and the UI bespoke.
- **Cypress E2E Testing**: Added to simulate real user flows, verifying the integration from the browser down to the database level.
- **Infrastructure as Code**: Switched to Terraform for AWS infrastructure to maintain a reproducible and scalable cloud environment.

### Challenges
- **AWS Academy / Learner Lab (`voclabs`) Restrictions**: Encountered strict IAM permission boundaries (e.g., inability to create IAM roles or CloudFront distributions). Overcame this by hardcoding the pre-existing `LabRole`, dynamically appending random suffixes to resources to handle state desynchronization, and utilizing a pure S3 deployment.
- **State Management**: Ensuring Terraform tracks existing resources effectively within a CI/CD pipeline. Resolved by implementing an S3 remote backend dynamically inside the pipeline runner using native S3 state locking.
- **Test Automation with Mongoose**: Setting up `mongodb-memory-server` required handling `mongoose.connection` carefully to avoid overlapping connection pools during automated Jest testing.
