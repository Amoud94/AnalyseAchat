# Use a lightweight Node.js image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package files
#COPY package*.json ./

# Copy the application code
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose the port
#EXPOSE 4173

# Serve the built app
CMD ["npm", "run", "preview"]
