#FROM ubuntu
#RUN apt-get update
#RUN apt-get install -y git nodejs npm nodejs-legacy
#RUN git clone git://github.com/DuoSoftware/DVP-DiameterRelay.git /usr/local/src/diameterrelay
#RUN cd /usr/local/src/diameterrelay; npm install
#CMD ["nodejs", "/usr/local/src/diameterrelay/app.js"]

#EXPOSE 8886

FROM node:5.10.0
ARG VERSION_TAG
RUN git clone -b $VERSION_TAG https://github.com/DuoSoftware/DVP-DiameterRelay.git /usr/local/src/diameterrelay
RUN cd /usr/local/src/diameterrelay;
WORKDIR /usr/local/src/diameterrelay
RUN npm install
EXPOSE 8886
CMD [ "node", "/usr/local/src/diameterrelay/app.js" ]
