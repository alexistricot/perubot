# perubot

A Discord bot to play Perudo.

# Commands

This bot declares the following commands usable in the Discord client:

- `/perudo <user1> <user2> ...`: start a game of perudo.
- `/perudo-resign`: resign the current game.
- `/perudo-help`: print an help message.
- `/perudo-ranking`: get a ranking of all players.


## Start a game

Start a game by adressing a command to the bot and tagging the players to include
in the game. Example : `/perudo <user1> <user2>` will start a game with players 
*user1*, *user2* and the author of the message.

Only one game can run at a time, even on different servers.

## End a game

End a game by using the `/perudo-resign` command.
This ends the game for all players.
This does not affect ranking. 

## Print this help message

Print help by using the `/perudo-help` command.
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