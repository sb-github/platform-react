FROM node
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
	git \
	vim 

RUN git clone -b develop https://github.com/sb-github/platform-react.git /usr/src/app \
	&& cd /usr/src/app/ \
 	&& npm install \
 	&& npm run build 

EXPOSE 3000

ENTRYPOINT cd app && npm run server




