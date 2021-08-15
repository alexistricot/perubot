# perubot

A Discord bot to play Perudo.

# Commands

Commands adressed to this bot must be prefixed by one of the following :
`!perudo`, `!palmito`, `!paco`, `!paquo`, `!pako`, `!paquito`, `!peru`, `!perubot`, `!leo_paul_a_un_petit_chien`.

## Start a game

Start a game by adressing a command to the bot and tagging the players to include
in the game. Example : `!perudo @user1 @user2` will start a game with players user1, user2 and the author of the message.

Only one game can run at a time, even on different servers.

## End a game

End a game by providing one of the following commands to the bot : `resign`, `abandon`, `end`. This ends the game for all players.
Example : `!perudo resign`

## Print this help message

Print help by providing one of the following command to the bot : 
`help`, `--help`, `-h`, `aide`.
Example : `!perudo -h`

# Play the game

You play the game by typing directly in the channel where the game was started.
Once a game is started, you do not need to prefix the plays by the command prefix.

The possible plays are :

- To place a new bet when it is your turn to play, write the bet as you would 
  express it orally. Example : `3 6`.
- To deny the last bet, when it is your turn to play : `dudo`.
- To bet that the last bet is exact, if you did not place the bet yourself : 
  `calzone` or `calza`.

# Rules

See https://fr.wikipedia.org/wiki/Perudo, with the [`Calza`](https://fr.wikipedia.org/wiki/Perudo#Calza) additional rule.