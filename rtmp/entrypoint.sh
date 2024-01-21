#!/bin/bash

# Start fcgiwrap and set socket permissions
/etc/init.d/fcgiwrap start
chmod 777 /var/run/fcgiwrap.socket
    
# Start Nginx
exec "$@"
