FROM node:24-bookworm

LABEL maintainer="Roman Gonzalez <roman.gonzalez.ea@gmail.com>"

ARG DEBIAN_FRONTEND=noninteractive

# hadolint ignore=DL3008
RUN set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
  sudo \
  git \
  inetutils-ping \
  inetutils-traceroute \
  iproute2 \
  netcat-openbsd \
  httpie \
  libnss3-tools \
  xclip \
  dnsutils \
  net-tools \
  tcpflow \
  tcpdump \
  strace \
  p7zip-full \
  build-essential \
  pkgconf \
  zip \
  unzip \
  unrar-free \
  gnupg2 \
  openssh-client \
  vim && \
  rm -rf /var/lib/apt/lists/*

ENV HOME /home/node
ENV PATH $HOME/.anyenv/bin:$PATH

RUN set -ex; \
  git clone https://github.com/anyenv/anyenv "${HOME}"/.anyenv && \
  "$HOME"/.anyenv/bin/anyenv install --force-init && \
  anyenv install nodenv && \
  eval "$(anyenv init -)" && \
  git clone https://github.com/nodenv/node-build-update-defs.git \
  "$(nodenv root)"/plugins/node-build-update-defs

# hadolint ignore=DL3008
RUN set -ex; \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  chrpath \
  libssl-dev \
  libxft-dev \
  libfreetype6 \
  libfreetype6-dev \
  libfontconfig1 \
  libfontconfig1-dev && \
  apt-get autoremove -y && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

USER node
WORKDIR $HOME/workspace/app

RUN mkdir -p \
  /home/node/.vscode-server/extensions \
  /home/node/.vscode-server-insiders/extensions && \
  chown -R node \
  /home/node/.vscode-server \
  /home/node/.vscode-server-insiders

CMD [ "sleep", "infinity"]
