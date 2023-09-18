#building

 FROM node:19-alpine3.15 AS builder
 ENV NODE_ENV production
 # Add a work directory
 WORKDIR /app
 # Cache and Install dependencies (excluding devDependencies)
 COPY package.json .
 COPY package-lock.json .
 RUN npm install --only=production
 # Copy app files
 COPY . .
 # Build the app
 RUN npm run build
 
 # hosting

 # Bundle static assets with nginx
 FROM nginx:1.23-alpine as production
 ENV NODE_ENV production
 WORKDIR /usr/share/nginx/html
 RUN rm -rf ./*
 # Copy built assets from builder
 COPY --from=builder /app/build /usr/share/nginx/html
 # Add your nginx.conf
 COPY nginx.conf /etc/nginx/conf.d/default.conf
 # Expose port
 EXPOSE 80
 # Start nginx
 CMD ["nginx", "-g", "daemon off;"]
