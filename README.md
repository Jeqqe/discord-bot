# Discord.js | Komi - multi-purpose bot

Discord bot to handle different tasks on a small community server. These tasks could be management related commands, automatic role assignments, vote systems, games etc...

Members of the said server are allowed to contribute to the bot and add features that they would like the bot to have.

## Getting Started

### Installingd

- Create .env to the root of the project and add the necessary bot information to the file
  ```js
  DISCORD_TOKEN=*your bot token*
  CLIENT_ID=*your bot client id*
  GUILD_ID=*your guild id*
  ```
- Create config.json to the root of the project and add the necessary guild information to the file
  ```json
  {
    "CHANNELS": {
      "ROLE_ASSIGNMENT": *role assignment channel ID*,
      "KOMI_UPDATES": *updates channel ID*,
    },
    "ROLES": {
      "ADMIN": *admin role name*
    }
  }
  ```
- run 'npm install'

### Executing program

- Register commands by running 'npm run deploy'
- Start bot by running 'npm start'

## Authors

[@Jeqqe](https://github.com/Jeqqe) - Main author

## Features

- Role assignment by reactionsr
