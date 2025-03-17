# Stage 1: Build
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /build

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the TypeScript source code
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript
RUN npm install -g typescript
# RUN npx tsc
RUN npm run build


# Stage 2: Run
FROM node:18 as runner

WORKDIR /app

# Copy only necessary compiled files and dependencies
COPY --from=builder build/package*.json ./
COPY --from=builder build/node_modules node_modules/
COPY --from=builder build/dist dist/

# RUN npm install --omit=dev 
# COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
