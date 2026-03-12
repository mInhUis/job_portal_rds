# Use the lightweight Alpine version of Node 20
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# 1. Copy the dependency blueprints first
COPY package.json package-lock.json ./

# 2. Install dependencies for production only!
# This ignores devDependencies and cleans the cache, saving massive amounts of space.
RUN npm ci --production && npm cache clean --force

# 3. Copy your actual backend source code
COPY . .

# 4. Expose the port your backend runs on
# (Since your Nginx config points to port 5000, we expose 5000 here)
EXPOSE 5000

# 5. Start the Node server
# Change "index.js" if your main file is named "server.js" or something else
CMD ["node", "index.js"]