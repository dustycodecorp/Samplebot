# Samplebot

This is a sample (and also very simple) Bot for Discord using the library [discord.js](http://google.com)
The idea is to give you kind of a bootstrap from where you can start testing and learning to develop
your own discord bot.

## Useful links and must read

- This bot uses Nodejs so you will need to have that installed!
- [Discord Official Developer documentation](https://discordapp.com/developers/docs/intro)
- [Discord.js documentation](https://discord.js.org/#/docs/main/stable/general/welcome)

## Installation
Download the project, go to the project folder and run this command on your terminal
```
npm install
```
This will install all libraries required, then you will need to create a `config.json` file using the content from the `config.test.json` and replacing the **client_id**, **token** and others parameters that you see fit with you own bot credentials which you can create in [https://discordapp.com/developers/applications/me](https://discordapp.com/developers/applications/me)

You need to make sure you create a **Bot user a account** this will give you a token that is a **MUST** to run your bot

then you will need to run this command
```
  node bot.js
```
This will run the bot.

The last step is to give your bot all the permissions you think it will need in your server, this is done by assign it a Role that can for example can Manage roles (if you want it to be able to assign role to the users)

PR are very welcome have fun ^^
