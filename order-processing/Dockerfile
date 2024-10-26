# Order Processing Dockerfile
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY order-processing/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY order-processing/ .

WORKDIR /app/src
# Expose the port (e.g., 3001)
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]  