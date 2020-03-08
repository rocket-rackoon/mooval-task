FROM node:12.16.1
RUN mkdir /home/mooval
ENV HOME=/home/mooval
COPY ./task $HOME

ENV PATH="${HOME}/node_modules/.bin:${PATH}"

WORKDIR $HOME
