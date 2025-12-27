# 1. Base Image: Use a lightweight Linux image with Node.js v18
FROM node:18-alpine

# 2. Working Directory: Create and set the working directory inside the container
WORKDIR /app

# 3. Dependency Files: Copy only package.json and package-lock.json first
COPY package*.json ./

# 4. Install Dependencies: Download and install required libraries
RUN npm install

# 5. Application Code: Copy the remaining application files (including server.js)
COPY . .

# 6. Expose Port: Inform Docker that the app runs on port 3000
EXPOSE 3000

# 7. Start Command: Run the application when the container starts
CMD ["node", "server.js"]
