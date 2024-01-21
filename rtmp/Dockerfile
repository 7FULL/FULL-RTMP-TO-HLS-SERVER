FROM tiangolo/nginx-rtmp

RUN apt-get update && \
    apt-get install -y fcgiwrap && \
    update-rc.d fcgiwrap defaults 20

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /www/
COPY thumbnail.cgi /usr/share/nginx/cgi-bin/thumbnail.cgi
RUN chmod +x /usr/share/nginx/cgi-bin/thumbnail.cgi

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD /entrypoint.sh && nginx -g 'daemon off;'
