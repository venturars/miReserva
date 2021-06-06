FROM node:14.17
WORKDIR /home
RUN npm install -g @angular/cli@^12.0.0
RUN ng new ng-app
WORKDIR /home/ng-app
RUN rm -r .git
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
