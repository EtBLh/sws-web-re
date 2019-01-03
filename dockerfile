FROM node:8
MAINTAINER etblh
ADD . /srv

WORKDIR /srv/sws-web-re

RUN cd /srv/sws-web-re/ \   
&& npm run heroku-postbuild

CMD [ "npm start" ]