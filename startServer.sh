#!/bin/bash
# Starts the server using nodemon, either in path or in sub-dir.
set -e

nodemon=nodemon

if ! type nodemon >/dev/null 2>&1; then
    nodemon=node_modules/.bin/nodemon
fi

$nodemon server/main.js
