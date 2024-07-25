FROM ubuntu:22.04

RUN apt update && apt upgrade -y

RUN apt install -y autoconf
RUN apt install -y curl
RUN apt install -y gcc
RUN apt install -y gettext
RUN apt install -y libpcre3-dev
RUN apt install -y libz-dev
RUN apt install -y make

ARG GIT_VERSION=2.45.0
RUN curl -L https://github.com/git/git/archive/v${GIT_VERSION}.tar.gz | tar -C /usr/local/src -zx \
 && cd /usr/local/src/git-${GIT_VERSION} \
 && make configure \
 && ./configure \
 && make \
 && make install \
 && cd ~ \
 && rm -rf /usr/local/src/git-${GIT_VERSION}

ARG NODEJS_VERSION=20.12.2
RUN curl -L https://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-x64.tar.gz | tar -C /usr/local -zx
ENV PATH ${PATH}:/usr/local/node-v${NODEJS_VERSION}-linux-x64/bin

ARG GOLANG_VERSION=1.22.2
RUN curl -L https://go.dev/dl/go${GOLANG_VERSION}.linux-amd64.tar.gz | tar -C /usr/local -zx
ENV PATH ${PATH}:/usr/local/go/bin
ENV PATH ${PATH}:/root/go/bin

RUN go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
