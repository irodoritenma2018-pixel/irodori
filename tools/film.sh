#!/bin/bash
# usage: film.sh IN OUT
S=/tmp/claude-0/-home-user-irodori/cf376474-e9db-50b0-9ac0-46f06f13145e/scratchpad
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$1")
ffmpeg -nostdin -v error -y -i "$1" -stream_loop -1 -framerate 30 -i $S/dust/%03d.png -filter_complex "[0:v]crop=1064:1904:'8+3*sin(n*1.7)+2*random(1)':'8+3*cos(n*1.3)+2*random(2)',scale=1080:1920,eq=brightness='0.03*sin(n*2.1)+0.02*random(3)-0.012':eval=frame,noise=alls=20:allf=t+u[v];[1:v]scale=1080:1920[d];[v][d]overlay=0:0:shortest=1,format=yuv420p" -c:v libx264 -preset medium -crf 24 -maxrate 9M -bufsize 18M -c:a aac -b:a 128k -t $D -movflags +faststart "$2"
