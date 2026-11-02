# Milestone 1 — NestJS Project Initialization

## Objective

Initialize the Syllens backend using NestJS and TypeScript.

### Project Setup

Created the project directory and initialized npm.

```bash
mkdir syllens
cd syllens
npm init -y
```

Generated the NestJS application inside the existing directory.

```bash
npx @nestjs/cli@latest new . --package-manager npm --skip-git
```

### Concepts Learned

- `npm init -y` creates the initial Node.js package configuration.
- The NestJS CLI generates the application structure and installs dependencies.
- `src/main.ts` bootstraps the application.
- `src/app.module.ts` is the root application module.
- Controllers receive HTTP requests.
- Services contain application logic.
- NestJS uses dependency injection to connect controllers and services.

### Start the Application

```bash
npm run start:dev
```

Default URL: `http://localhost:3000`

Expected response: `Hello World!`

### Status

Pending successful application startup and verification.

### Next Step

Create a dedicated `/health` endpoint and verify that the application builds and passes its initial tests.

### Milestone 1 — Application Startup and Health Check

**Health Module

Generated a dedicated Health module containing:

- `HealthModule`
- `HealthController`
- `HealthService`

**Health endpoint

`GET /health`

Expected response:

```json
{
  "status": "ok",
  "application": "Syllens",
  "message": "Syllens API is running"
}
```

**Concepts learned

- NestJS modules organize application functionality.
- Controllers receive HTTP requests.
- Services contain application logic.
- Dependency injection connects controllers with services.
- `@Controller()` defines the route prefix.
- `@Get()` defines an HTTP GET endpoint.
- NestJS automatically serializes returned objects into JSON.
- A basic health endpoint verifies that the application is responsive, not necessarily that all dependencies are healthy.

**Verification commands

```bash
npm run build
npm test -- --runInBand
npm run lint
```

**Status:** Application startup verified. Health endpoint and verification commands pending.

### Milestone 1 — Resolving Jest and TypeScript Configuration Issues

## The initial Jest execution failed with

`TS5011: The common source directory of tsconfig.json is ./src.`

An explicit `rootDir` was required.

Initially, `rootDir` was configured as `./src`, but TypeScript reported that `jest.config.ts` was outside the configured source directory.

For the initial troubleshooting stage, `rootDir` was changed to `"."` to include root-level TypeScript configuration files.

**Issue 2: Jest ESM Compatibility

After resolving the source-directory error, Jest failed while loading `@nestjs/testing`.

Error:

`Must use import to load ES Module`

The test runner needed support for loading ES modules.

**Successful troubleshooting command:**

```bash
NODE_OPTIONS=--experimental-vm-modules npm test -- --runInBand
```

**Result:**

- Test suites: 1 passed.
- Tests: 1 passed.
- Test file: `src/app.controller.spec.ts`.

**Permanent test script configuration:**

```json
"test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js"
```

**Concepts learned:**

- TypeScript's `rootDir` controls the emitted source-file structure.
- Jest executes TypeScript tests through its configured transformation process.
- CommonJS and ESM have different module-loading behavior.
- Node.js VM module support can enable ESM loading in Jest.
- Build validation and test execution should both be verified after configuration changes.

**Status:** All done including production-startup verification.

### GIT repository setup

**Status: Completed

The Syllens NestJS backend was initialized, configured, tested, and published to GitHub.

**Implementation:

- Initialized NestJS with TypeScript.
- Configured CommonJS and Jest.
- Implemented the Health module.
- Resolved TypeScript and Jest module compatibility issues.
- Configured repository-specific Git identity.
- Created the initial Git commit.
- Pushed the application to personal GitHub.

**Verification:

- Build: Passed
- Unit tests: 1 passed
- Lint: 0 warnings and 0 errors
- Production startup: Successful
- Health route: Registered
- GitHub push: Successful

**Initial commit:** `a01b9d2`

**Repository:** <https://github.com/devigitlearn/syllens>

**Key Learning:**

Established a working NestJS backend development workflow with version control, testing, linting, production compilation, and GitHub integration.

Next Milestone

## Milestone 2 — Environment Configuration, Swagger Documentation, and Global Validation

### Step 1: Environment Configuration Using @nestjs/config

**Objective

Implement a centralized configuration system for Syllens using NestJS ConfigModule and Zod validation.

This allows the application to use different settings for development, testing, and production without hardcoding environment-specific values.

### 1. Install Dependencies

```bash
npm install @nestjs/config zod
```

**Dependencies

- `@nestjs/config` — Loads and manages application configuration.
- `zod` — Validates environment variables and transforms their values.

### 2. Create Environment Files

Created `.env` to store local configuration.

```env
NODE_ENV=development
PORT=3000
```

Created `.env.example` to document the required environment variables.

```env
NODE_ENV=development
PORT=3000
```

**Important

- `.env` is excluded from Git.
- `.env.example` can be committed because it contains no secrets.
- Runtime environment variables take precedence over `.env` by default.

### 3. Create Environment Validation

Created:

`src/config/env.validation.ts`

Implemented Zod validation for:

- `NODE_ENV`: development, test, or production.
- `PORT`: Integer between 1 and 65535.

Default values:

- `NODE_ENV = development`
- `PORT = 3000`

**Why validation matters

Invalid configuration should be detected during application startup rather than causing errors during execution.

### 4. Register ConfigModule

Updated `src/app.module.ts` to register:

```typescript
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  validationSchema: envValidationSchema,
})
```

**Explanation

- `isGlobal: true` — Makes ConfigService available across application modules.
- `envFilePath` — Specifies the environment file.
- `validationSchema` — Validates configuration before application startup completes.

### 5. Update Application Bootstrap

Updated `src/main.ts` to retrieve the port from ConfigService.

```typescript
const configService = app.get(ConfigService);

const port = configService.getOrThrow<number>('PORT');

await app.listen(port);
```

**Concept learned

ConfigService provides centralized access to validated application settings.

### 6. Configuration Verification

**Test A — Normal Startup

Configured `PORT=3000` and started the application.

Command:

`npm run start:dev`

Result: Pending verification.

**Test B — Change Port

Changed `PORT` from `3000` to `3001`.

Expected: The application starts on port 3001.

Result: Pending verification.

**Test C — Invalid Port

Configured `PORT=invalid`.

Expected: Startup fails due to configuration validation.

Result: Pending verification.

Restored the original configuration after testing.

### 7. Build and Test Commands

```bash
npm run build
npm test -- --runInBand
npm run lint
```

Results: Pending verification.

### 8. Project Structure

```text
syllens/
├── src/
│   ├── config/
│   │   └── env.validation.ts
│   ├── health/
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### 9. Important Concepts Learned

1. Environment variables separate configuration from application logic.
2. ConfigModule loads and manages configuration in NestJS.
3. ConfigService provides access to configuration values.
4. Zod validates values and performs type conversion.
5. Invalid configuration can prevent application startup.
6. `.env` files should not be committed to Git.
7. `.env.example` documents the configuration needed to run the application.
8. Environment-specific settings support deployment across development, testing, and production environments.

### 10. Status

Implementation local verification done.

**Step 2: Swagger/OpenAPI Documentation

We will document the Syllens REST API and make endpoints testable through Swagger UI.

Integrate Swagger into the Syllens NestJS backend to automatically generate API documentation and provide an interactive interface for testing REST endpoints.

### 1. Install Swagger

```bash
npm install @nestjs/swagger
```

### 2. Configure Swagger

Updated `src/main.ts` using:

- `DocumentBuilder`
- `SwaggerModule.createDocument()`
- `SwaggerModule.setup()`

Configured API metadata:

- Title: Syllens API
- Description: Student-focused Agentic RAG learning platform with evidence-backed answers
- Document version: 1.0.0

### 3. Swagger Endpoints

Swagger UI:

`http://localhost:3000/api/docs`

OpenAPI JSON:

`http://localhost:3000/api/docs-json`

The OpenAPI JSON can be used by tools that support importing or generating clients from an API specification.

### 4. Health Endpoint Documentation

Updated `src/health/health.controller.ts` with Swagger decorators:

- `@ApiTags('Health')` — Groups related endpoints.
- `@ApiOperation()` — Describes the endpoint.
- `@ApiOkResponse()` — Documents the successful response.

Documented endpoint:

`GET /health`

Expected response:

```json
{
  "status": "ok",
  "application": "Syllens",
  "message": "Syllens API is running"
}
```

### 5. Execution Flow

1. NestJS starts the application.
2. SwaggerModule reads controller metadata and Swagger decorators.
3. An OpenAPI specification is generated when requested.
4. Swagger UI displays the documented endpoints.
5. Developers can execute requests through the Swagger interface.
6. NestJS processes the requests and returns their responses.

### 6. Verification

Start the application:

```bash
npm run start:dev
```

Verify Swagger UI:

`http://localhost:3000/api/docs`

Verify the OpenAPI specification:

```bash
curl http://localhost:3000/api/docs-json
```

Verify application health:

```bash
curl http://localhost:3000/health
```

Run quality checks:

```bash
npm run build
npm test -- --runInBand
npm run lint
```

**Verification status:** Completed.

### 7. Concepts Learned

- OpenAPI specifications
- Swagger UI
- API documentation generation
- NestJS Swagger decorators
- DocumentBuilder configuration
- Interactive API testing
- JSON API specification
- API documentation as part of backend engineering

### 8. Security Considerations

Swagger documentation is currently enabled for local development.

Before production deployment, documentation access must be reviewed and appropriately restricted or disabled.

### 9. Next Step

** Step 3: Request Validation

We will learn how to validate incoming API requests using DTOs and global validation mechanisms.

Implement centralized request validation in Syllens using NestJS ValidationPipe and class-based DTOs.

This ensures invalid incoming API requests are rejected before reaching application business logic.

```bash
npm install class-validator class-transformer
```

- `class-validator` provides validation decorators.
- `class-transformer` transforms incoming payloads into DTO instances.

### 2. Configure Global ValidationPipe

Updated `src/main.ts`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

**Configuration explanation:**

- `whitelist`: Restricts accepted properties to those declared with validation decorators.
- `forbidNonWhitelisted`: Rejects unexpected properties.
- `transform`: Converts payloads to the corresponding DTO class instances.

### 3. Create Study Questions Module

Generated:

```bash
npx nest generate module study-questions
npx nest generate controller study-questions --no-spec
npx nest generate service study-questions --no-spec
```

Implemented:

- `StudyQuestionsModule`
- `StudyQuestionsController`
- `StudyQuestionsService`
- `PreviewQuestionDto`

### 4. Create the Request DTO

File: `src/study-questions/dto/preview-question.dto.ts`

Validation rules:

| Property | Validation |
| `question` | Required, string, non-empty, maximum 1000 characters |
| `documentId` | Required, valid UUID string |

Swagger decorators document both properties in the generated OpenAPI specification.

### 5. Implement Validation Endpoint

**Endpoint:** `POST /study-questions/preview`

**Purpose:** Validate a student question and document identifier without calling Gemini or the database.

Example request:

```json
{
  "question": "What is the Basic Structure Doctrine?",
  "documentId": "550e8400-e29b-41d4-a716-446655440000"
}
```

Expected successful response:

```json
{
  "message": "Question validated successfully",
  "data": {
    "question": "What is the Basic Structure Doctrine?",
    "documentId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

Default successful HTTP status: `201 Created`.

### 6. Validation Test Cases

| Scenario | Expected HTTP status |
| Valid question and UUID | 201 |
| Empty question | 400 |
| Invalid UUID | 400 |
| Unexpected property | 400 |
| Missing required property | 400 |

Manual testing through Swagger is required to verify these behaviors.

### 7. Important Concepts Learned

- DTOs define request data contracts.
- TypeScript types alone do not validate runtime request data.
- Global ValidationPipe validates applicable controller inputs.
- `class-validator` decorators define field-level constraints.
- `class-transformer` creates DTO instances.
- Unknown properties can be rejected.
- Swagger documents request schemas and validation expectations.
- Input validation is different from authentication and authorization.

### 8. Verification Commands

```bash
npm run build
npm test -- --runInBand
npm run lint
```

### 9. Current Limitations

- Questions are validated but are not sent to Gemini.
- Document IDs are validated for format but are not checked against a database.
- Authentication and student document ownership checks are not implemented.
- Whitespace-only questions require additional validation.
- Automated tests for the new validation endpoint are still to be added.

Step 4: API Error Handling and Response Conventions.

Establish consistent error responses, safe exception handling, and API route conventions before implementing document upload functionality.
