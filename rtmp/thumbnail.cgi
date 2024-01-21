#!/bin/bash
echo "Content-type: text/plain"
echo ""
echo "Hello from thumbnail.cgi script"

STREAM_NAME=$QUERY_STRING
FFMPEG_CMD="ffmpeg -i http://localhost:8080/hls/${STREAM_NAME}.m3u8 -ss 00:00:10 -vframes 1 /tmp/thumbnails/${STREAM_NAME}.png"

$FFMPEG_CMD

echo "Content-type: text/html"
echo ""
echo "<html><body><h2>Thumbnail generado para el stream ${STREAM_NAME}</h2></body></html>"