FROM node:20.11.1-bookworm

ARG UID=1000

ENV NPM_CONFIG_PREFIX=/home/frontend/.npm-global
ENV PATH=$PATH:/home/frontend/.npm-global/bin

RUN set -eux; \
  if [ "${UID}" = "1000" ]; then \
  usermod -l frontend -s /bin/bash node; \
  groupmod -n frontend node; \
  else \
  useradd -s /bin/bash -u ${UID} -m frontend; \
  fi; \
  mkdir -p /app/frontend/node_modules /home/frontend/.npm-global; \
  chown -R frontend:frontend /app /home/frontend/.npm-global

USER frontend

WORKDIR /app/frontend

ENV NODE_ENV=development

RUN npm install -g create-next-app@latest