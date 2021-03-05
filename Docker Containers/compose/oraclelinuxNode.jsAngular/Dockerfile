FROM oraclelinux:7-slim

#https://blogs.oracle.com/opal/dockerfiles-for-node-oracledb-are-easy-and-simple

# Create app directory
WORKDIR /usr/src/app

# Copy the .js files from your host machine into the new app directory
ADD *.js ./

# Update Oracle Linux
# Install Node.js
# Install the Oracle Instant Client
# Check that Node.js and NPM installed correctly
# Install the OracleDB driver
RUN yum update -y && \
    yum install -y oracle-release-el7 && \
    yum install -y oracle-nodejs-release-el7 && \
    yum install -y nodejs && \
    yum install -y telnet && \
    yum install -y oracle-instantclient19.3-basic.x86_64 && \
    yum clean all && \
    node --version && \
    npm --version && \
    npm install oracledb && \
    echo Installed

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

#Bundle app source
COPY . .

COPY ["./front-angularbuilded", "./"]

EXPOSE 3002
CMD [ "npm", "start" ]