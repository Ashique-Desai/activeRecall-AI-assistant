# node.js image
FROM node:18-alpine

# set the working directory in the container
WORKDIR /app

# copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# copy rest of the application
COPY . .

#build the client app (Next.js app)
RUN npm run build

# expose port client will run on
EXPOSE 3000

# Run Next.js in development mode
CMD [ "npm", "run", "dev" ]


