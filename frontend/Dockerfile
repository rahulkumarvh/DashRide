# Set the base image
FROM node:20

# Set working directory
WORKDIR /var/www

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application
COPY . .

# Expose port 3000 (or your desired port)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
