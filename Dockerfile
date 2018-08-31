FROM python:3.6-jessie

ENV PROJECT_ENV = 'staging'
ENV LC_ALL=C.UTF-8
ENV  LANG=C.UTF-8
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION 8.11
ENV AWS_ACCESS_KEY_ID = 'key-id'
ENV AWS_SECRET_ACCESS_KEY = 'secret'

WORKDIR /usr/src/app

# Install base dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
  apt-transport-https \
  build-essential \
  ca-certificates \
  curl \
  git \
  libssl-dev \
  wget \
  && rm -rf /var/lib/apt/lists/*

# Install nvm with node and npm
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN apt-get update && apt-get install python3-pip git -y && pip3 install pipenv
RUN apt-get install vim -y

COPY package.json .
COPY webpack.config.prod.js .
COPY Pipfile .
COPY Pipfile.lock .
COPY src ./src
COPY tsconfig.json .
COPY typings.d.ts .

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn
RUN apt-get install --no-install-recommends yarn
RUN yarn --version

# Install dependencies
RUN set -ex && pipenv install --deploy --system

# Run Tests
# RUN npm run test

CMD ["yarn", "build"]