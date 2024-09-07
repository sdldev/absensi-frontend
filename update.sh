#!/bin/bash

git reset --hard
git pull
rm -r dist
npm i
npm run build