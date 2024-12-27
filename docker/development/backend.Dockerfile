FROM ruby:3.3.6-bookworm

RUN set -eux; \
  apt-get update; \
  apt-get -y upgrade

ARG UID=1000

RUN set -eux; \
  useradd -s /bin/bash -u ${UID} -m backend; \
  mkdir -p /app/backend/vendor/bundle; \
  chown -R backend:backend /app

USER backend

WORKDIR /app/backend

ENV BUNDLE_PATH=vendor/bundle
ENV BUNDLE_APP_CONFIG=$BUNDLE_PATH
ENV BUNDLE_USER_CACHE=vendor/bundle/cache
ENV PATH="/app/backend/bin:${PATH}"

RUN bundle config set force_ruby_platform true
RUN gem install rails -v '~> 7.1.2'