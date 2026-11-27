#!/bin/bash
# usage: mkreel.sh OVERLAYDIR OUTFILE < segments(clip start dur overlay|-)
S=/tmp/claude-0/-home-user-irodori/cf376474-e9db-50b0-9ac0-46f06f13145e/scratchpad; R=/home/user/irodori/clients/birdie-house/assets/raw
OV=$1; OUT=$2; O=$S/segx; mkdir -p "$O"; rm -f "${O:?}"/*
VF="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,eq=saturation=0.78:contrast=1.06:brightness=-0.02,colorbalance=rs=0.06:gs=0.02:bs=-0.08:rm=0.05:bm=-0.06,noise=alls=14:allf=t,vignette=PI/4.2"
i=0
VFZ="scale=1350:2400,crop=1080:1920:135:430,fps=30,eq=saturation=0.78:contrast=1.06:brightness=-0.02,colorbalance=rs=0.06:gs=0.02:bs=-0.08:rm=0.05:bm=-0.06,noise=alls=14:allf=t,vignette=PI/4.2"
while read c s d ov z; do [ -z "$c" ] && continue; i=$((i+1)); n=$(printf %02d $i)
 if [ "$ov" = "-" ]; then OVP=$S/blankframe.png; else OVP=$OV/$ov.png; fi
 ffmpeg -nostdin -v error -y -ss $s -t $d -i $R/IMG_$c.mov -i $OVP -filter_complex "[0:v]$( [ "$z" = "Z" ] && echo "$VFZ" || echo "$VF" )[v];[v][1:v]overlay=0:0,format=yuv420p" -af "aresample=44100" -ac 2 -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k $O/$n.mp4
 echo "file '$O/$n.mp4'" >> $O/list.txt
done
ffmpeg -nostdin -v error -y -loop 1 -t 3.5 -i $OV/end.png -f lavfi -t 3.5 -i anullsrc=r=44100:cl=stereo -vf "scale=1080:1920,fps=30,format=yuv420p" -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k -shortest $O/99.mp4
echo "file '$O/99.mp4'" >> $O/list.txt
ffmpeg -nostdin -v error -y -f concat -safe 0 -i $O/list.txt -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 128k -movflags +faststart $OUT
