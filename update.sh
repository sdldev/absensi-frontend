#!/bin/bash

git reset --hard
git pull
rm -r build
npm i
npm run build