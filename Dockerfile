# Use the official Node.js LTS image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install build dependencies (for bcrypt and other native modules)
RUN apt-get update && apt-get install -y python3 build-essential

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Express app runs on
EXPOSE 5000

# Set the command to start the Node.js server
CMD ["node", "server.js"]
