# Written Answers

## 1. Dockerfile Instruction Order

The Dockerfile first creates a test stage using the pinned Node.js image, installs dependencies, copies the source and test files and runs the unit tests. The runtime stage installs only production dependencies and copies the application files, using a marker from the test stage to ensure the tests pass before the build completes. It then sets environment variables, switches to the non-root node user, documents port 8080 with EXPOSE, adds a health check and starts the server. Copying package files before source files allows Docker to reuse cached dependency layers, avoiding unnecessary dependency installation when only the application code changes.

## 2. Container Data and Persistence

When a container is removed, any data stored only in its writable layer is removed with it. To preserve data, a Docker volume or bind mount can be attached so that important application state is stored outside the container or in an external database. Planora currently generates study plans in response to requests but does not save them, so it has no server side state to preserve between container runs.

## 3. The `latest` Tag and Reproducibility

The `latest` tag may refer to different image versions over time, meaning future builds could use a different Node.js or base OS version. This can lead to unexpected changes and compatibility problems. For Planora, I chose the specific `node:24.22.0-bookworm-slim` tag to make builds more consistent and reproducible.

## AI Usage Disclosure

I used AI assistants to help with application development, Docker configuration. I also asked AI to explain some kind of errors such as the port 8080 conflict error and help resolve it by checking the occupied port and restarting the container.