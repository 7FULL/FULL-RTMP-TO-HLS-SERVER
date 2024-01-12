# Dockerfile

# Usa la imagen oficial de NGINX
FROM nginx:latest

# Copia la configuración del servidor RTMP al contenedor
COPY ./rtmp/nginx.conf /etc/nginx/nginx.conf

# Expone los puertos necesarios para el servidor RTMP
EXPOSE 1935 8080

# Establece el directorio de trabajo
WORKDIR /etc/nginx

# Copia los archivos del servidor RTMP al contenedor
COPY ./rtmp /app/rtmp

# Copia los archivos del servidor de autenticación al contenedor
COPY ./auth /app/auth

# Copia el script de inicio
COPY ./start.sh /app/start.sh

# Establece permisos de ejecución para el script
RUN chmod +x /app/start.sh

# Comando para ejecutar el script de inicio
CMD ["/app/start.sh"]
