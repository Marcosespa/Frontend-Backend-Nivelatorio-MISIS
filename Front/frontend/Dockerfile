# Usar una imagen base de Nginx
FROM nginx:alpine

# Copiar los archivos del frontend a la carpeta de Nginx
COPY ./public /usr/share/nginx/html

# Exponer el puerto 80 (puerto predeterminado de Nginx)
EXPOSE 80

# Nginx se inicia automáticamente, no necesitas un CMD explícito