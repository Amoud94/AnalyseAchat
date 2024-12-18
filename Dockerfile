# Use Node.js for the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the entire application code
COPY . .

# Build the Vue frontend
WORKDIR /app/vue-front
RUN npm install
RUN npm run build

# Move back to the backend and prepare to serve the frontend
WORKDIR /app/back
RUN npm install

RUN npm run build:prod

# Expose the backend port
EXPOSE 3000

# Start the backend
CMD ["npm", "run", "start"]
