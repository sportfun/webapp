FROM node:8-stretch

# Add the project and install
ADD . .
RUN npm install

# Launch the app
CMD ["npm", "start"]
EXPOSE 80
