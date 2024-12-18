# Use the Node.js 18 LTS image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application (if necessary)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Set the command to run your application
CMD ["npm", "run", "local"]
