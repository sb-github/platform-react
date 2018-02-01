FROM node
EXPOSE 3000

USER root
RUN mkdir /usr/plarform

WORKDIR /usr/plarform
ADD . .

RUN npm install \
	&& npm install -g serve \
	&& npm run build

ENTRYPOINT npm run server