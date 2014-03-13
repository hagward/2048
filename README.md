# 2048

A JavaScript clone of the game that might be known as "2048" (?). Unfortunately
it does not feature any fancy visual effects, but it does include a simple AI
that plays the game for you!

## How to play

Change the direction of gravity with the arrow keys. If two squares of the same
value collides they will merge to one with the new value being the sum of the
two. When no more moves are possible the game is over.

[Demo](https://dl.dropboxusercontent.com/u/334931/2048/index.html).

To invoke the AI, fire up your favorite browsers developer tools and execute
the function `runAi(m, depth, waitTime)`. `m` is the matrix representing the
game, `depth` is how many steps the AI should simulate (this should be less
than ten due to the inefficiency of the AI) and `waitTime` is the time (in ms)
to wait between moves.
