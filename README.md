# Dem App

Dem App is a mobile app for helping medical monitoring.
The goal is to build an user-friendly app to let patient do clock drawing test.

Each patient is managed by a nurse who can see his data in order to react fastly.

# Install on Debian and Ubuntu based Linux distribution

## Install NodeJS

$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

$ sudo apt-get install -y nodejs

$ sudo apt-get install -y build-essential

Check the install :
$ node -v

## Install MongoDB

$ sudo apt-get install mongodb-server mongodb-clients

Check the install :
$ mongo

## Install NPM (Node Package Manager)

$ sudo apt-get install npm

## Install Server Side

$ cd DemApp/Server

$ sudo npm install

Run the server :
$ ./bin/www


## Install Client Side

### Install Cordova

$ sudo npm install -g cordova

### Install Ionic

$ sudo npm install -g ionic@beta

Run the client :
$ ionic serve --lab

## Production mode
$ make address

It will prompt you to enter address and replace all 'localhost:3000' lines in Client Side by your server address

Connection to MongoDB and secret code of the encrypt function are stored in /Server/config/database.js.

It is highly recommended to use a random key as secret of your app. You can use v4.uuid function given by NodeJS to generate a such key.

## Publishing your app

Here is the tutorial by ionic :

http://ionicframework.com/docs/guide/publishing.html



