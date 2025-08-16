#!/usr/bin/env bash
podman run --env-file ./server/.env -p 5000:5000 --rm -it -v /mnt/c/Users/Lenovo/AppData/Roaming/postgresql/:/root/.postgresql/ walmart-price-tracker:1