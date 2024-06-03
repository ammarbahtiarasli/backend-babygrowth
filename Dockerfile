
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

ENV SECRET_KEY=ammarripangantengbanget
ENV GOOGLE_CLOUD_PROJECT_ID=babygrowth-capstone-bangkit

CMD [ "npm", "start" ]
