# BASE IMAGE
FROM node:16.13.0-alpine3.14 as base
# adding bash and removing /bin/sh from image
RUN apk add --no-cache bash &&\
    rm /bin/sh && ln -s /bin/bash /bin/sh

# this would customize how the shell is displayed
# RUN echo "PS1='\e[33;1m\u@container: \e[0;92m\w\e[0m\$ '" > /root/.bashrc

#######################
## DEVELOPMENT IMAGE ##
#######################
FROM base as development
# we are going to use the dir /home/node/app
ENV APP=/home/node/app
WORKDIR $APP
# changing the owner and group of working directory
RUN chown node:node $APP
# using the node user
USER node
# copying everything from the host to the container /home/node/app directory
COPY --chown=node:node . $APP/
# installing dependencies and removing yarn cache
RUN yarn install --frozen-lockfile &&\
    rm -rf "$(yarn cache dir)"
# generating the transpiled code from typescript
RUN yarn build
# starting ts-node-dev to watch for changes
CMD yarn dev

######################
## PRODUCTION IMAGE ##
######################
FROM base as production
# we are going to use the dir /home/node/app
ENV APP=/home/node/app
WORKDIR $APP
# changing the owner and group of working directory
RUN chown node:node $APP
# using the node user
USER node
# copying the transpiled code generated in the development image to current working directory
COPY --chown=node:node --from=development $APP/dist/ $APP/dist/
# copying package.json and yarn.lock from host to container working directory
COPY --chown=node:node package.json yarn.lock $APP/
# installing only production dependencies and removing yarn cache
RUN NODE_ENV=production yarn install --frozen-lockfile &&\
    rm -rf "$(yarn cache dir)"
# starting the application with `node dist/index.js`
CMD yarn start
