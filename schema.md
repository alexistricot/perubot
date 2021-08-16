# Déroulement du jeu

## Démarrage

- Un utilisateur lance le jeu en utilisant une `commande`
- Tous les utilisateurs mentionnés dans le serveur sont ajoutés au jeu
- *TODO* ajouter une commande pour abandonner, qui arrête le jeu
- Le jeu est initialisé
- On envoie l'ordre de jeu
- On initialise le joueur qui commence à `0`

## Manche

- on roll les dés `Game.roll()`
- si on est en palmito, on envoie un message pour le dire
- on envoie ses dés à chaque joueur  `Game.sendDice()`
- on envoie un message dans le général pour commencer à parier, en identifiant 
  le joueur dont c'est le tour
- On écoute les annonces :
  - on vérifie si le play est **dudo** ou une **calzone**, sinon on considère que 
    c'est une surenchère
  - Si c'est **dudo**
    - on vérifie que l'annonce est faite par le joueur dont c'est le tour
    - on checke qui a raison entre le joueur qui a challengé et le joueur qui a 
        fait l'annonce
    - on passe le joueur courant sur le **joueur perdant** (**Important** cette étape doit précéder 
        celle de retirage de dé)
    - on retire un dé au **joueur perdant**, en le notifiant `Game.removeDice()`
      - à cette étape, il peut y avoir passage en palmito, ou retirage d'un joueur
    - on recommence la manche
  - Si c'est **calzone**
    - on identifie le joueur qui a calzone
    - on envoie les rolls à tout le monde
    - on passe le joueur courant sur ce joueur
    - on check s'il a raison ou non
    - si le nombre de joueurs est **> 2**:
      - on lui ajoute ou retire un dé
    - on recommence la manche
  - Si c'est une **surenchère**
    - si la surenchère est valable et qu'elle est faite par le joueur dont c'est le tour 
      - on réagit au message positivement
      - on garde l'annonce actuelle
      - on passe le joueur courant au joueur d'après `Game.nextPlayer()`
      - on notifie le joueur d'après
      - on recommence à écouter les annonces

## Spécifications

- [x] quand on retire un joueur avec `Game.removeDice()`, il faut que le joueur 
  courant soit sur ce joueur
- [ ] quand on retire un joueur et qu'on arrive à deux joueurs, on print que les 
  calzones ne donnent plus de dés
- [ ] option pour être plus ou moins verbeux sur les règles
- [x] quand on retire un joueur et qu'on arrive à un joueur, on print qu'il a gagné

## Bugs

- [x] Check error of winner during dudo (happened with 2 pacos, prby error with paco count)
- [x] logger le résultat et l'annonce à la fin d'une manche
- [x] arrêter la partie en cas de victoire
- [x] enlever les tabs additionnels
- [c] replace count as number by an emoji
- [x] add a rule where you can not go over the initial number of dice
- [x] add resign command
- [x] notify the player that they lost
- [x] print help on `!perudo help`
- [ ] emojis only work in the guild where there were originally added