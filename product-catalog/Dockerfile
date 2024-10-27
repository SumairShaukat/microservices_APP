# User Management Dockerfile
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY product-catalog/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY product-catalog/ .


WORKDIR /app/src

# Expose the port (e.g., 3000)
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]