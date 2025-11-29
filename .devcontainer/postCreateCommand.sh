#! /bin/sh

mise trust
mise install

npm -g install pnpm

# install project dependencies
pnpm install
