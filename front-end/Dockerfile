# Use the lightweight Node image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the blueprints and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of your frontend code
COPY . .

# Vite's default development port is 5173
EXPOSE 5173

# Start the Vite development server
# The "--host" flag is crucial here!
CMD ["npm", "run", "dev", "--", "--host"]