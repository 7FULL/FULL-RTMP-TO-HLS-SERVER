#!/bin/sh

# Construye y ejecuta el servicio RTMP
docker build -t rtmp_server /app/rtmp
docker run -d --name rtmp_server rtmp_server

# Construye y ejecuta el servicio de autenticación
docker build -t auth_server /app/auth
docker run -d --name auth_server auth_server

# Inicia NGINX con la configuración RTMP
nginx -g 'daemon off;'
