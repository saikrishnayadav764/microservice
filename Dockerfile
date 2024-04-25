# Using official Node.js image as base
FROM node:latest

# Setting the working directory inside the container
WORKDIR /usr/src/app

# Copying package.json and package-lock.json to container
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the rest of the application code to container
COPY . .

# Exposing the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
