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

Next Milestone

## Milestone 2 — Environment Configuration, Swagger Documentation, and Global Validation
