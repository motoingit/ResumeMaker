# Base stage with Node runtime and package manifests
FROM node:24-slim AS base
WORKDIR /app
COPY package*.json ./

# Development stage with dependencies, code mounting, and nodemon hot-reloading
FROM base AS development

# Install all dependencies                #!including devDependencies
RUN npm install

# Copy source files (in case they are not volume-mounted in non-dev envs)
COPY . .

# Expose default API port
EXPOSE 3000

# Command to run development server
CMD ["npm", "run", "dev"]
