FROM node:8
ADD lambda  /usr/src/app/lambda
ADD models /usr/src/app/models
WORKDIR /usr/src/app/lambda/custom
RUN npm install 
RUN mkdir build
RUN npm test
RUN npm run build-aws-resource
CMD ["cp", "BasicAlexaEchoHello.zip", "build"]


