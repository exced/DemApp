# Dem App

Dem App is a mobile app for helping medical monitoring.
The goal is to build an user-friendly app to let patient do clock drawing test.

Each patient is managed by a nurse who can see his data in order to react fastly.


# Ionic 2 beta
This app was built with ionic2 beta. Now lot of changes have been made.


# Install on Debian and Ubuntu based Linux distribution

## Install NodeJS
```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install -y build-essential
```

Check the install :
```bash
node -v
```

## Install MongoDB
```bash
sudo apt-get install mongodb-server mongodb-clients
```

Check the install :
```bash
mongo
```

## Install NPM (Node Package Manager)
```bash
sudo apt-get install npm
```
## Install Server Side
```bash
cd DemApp/Server

sudo npm install
```

Run the server :
```bash
./bin/www
```

## Install Client Side

### Install Cordova
```bash
sudo npm install -g cordova
```
### Install Ionic
```bash
sudo npm install -g ionic@beta
```

Run the client :
```bash
ionic serve --lab
```

## Production mode
```bash
make address
```

It will prompt you to enter address and replace all 'localhost:3000' lines in Client Side by your server address

Connection to MongoDB and secret code of the encrypt function are stored in /Server/config/database.js.

It is highly recommended to use a random key as secret of your app. You can use v4.uuid function given by NodeJS to generate such a key.

## Publishing your app

Here is the tutorial by ionic :

http://ionicframework.com/docs/guide/publishing.html



