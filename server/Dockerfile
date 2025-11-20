FROM node:20-slim

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the server code
COPY . .

# Expose your server port
EXPOSE 3000

# Start the Node server
CMD ["npm", "start"]
