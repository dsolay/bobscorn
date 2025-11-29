FROM debian:12-slim

LABEL maintainer="Roman Gonzalez <roman.gonzalez.ea@gmail.com>"

ARG DEBIAN_FRONTEND=noninteractive

# hadolint ignore=DL3008
RUN set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
  sudo \
  curl \
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
  ca-certificates \
  build-essential \
  pkgconf \
  zip \
  unzip \
  gnupg2 \
  openssh-client \
  vim && \
  rm -rf /var/lib/apt/lists/*


# Add a non-root user
ARG USERNAME=app
ARG PUID=1001
ARG PGID=1001
ENV PUID ${PUID}
ENV PGID ${PGID}
ENV HOME /home/${USERNAME}

RUN set -x ; \
  addgroup --gid ${PGID} ${USERNAME} ; \
  adduser \
  --uid ${PUID} \
  --disabled-password \
  --gid ${PGID} \
  --comment ${USERNAME} \
  ${USERNAME}

WORKDIR $HOME/workspace/app

RUN mkdir -p \
  /home/${USERNAME}/.vscode-server/extensions \
  /home/${USERNAME}/.vscode-server-insiders/extensions && \
  chown -R ${USERNAME} \
  /home/${USERNAME}/.vscode-server \
  /home/${USERNAME}/.vscode-server-insiders

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV MISE_DATA_DIR=${HOME}/mise
ENV MISE_CONFIG_DIR=${HOME}/mise
ENV MISE_CACHE_DIR=${MISE_DATA_DIR}/cache
ENV MISE_INSTALL_PATH="/usr/local/bin/mise"
ENV PATH="${MISE_DATA_DIR}/shims:$PATH"

RUN curl https://mise.run | sh

CMD [ "sleep", "infinity"]
