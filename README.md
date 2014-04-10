# 2048

A simple clone of the popular game
["2048" by Gabriele Cirulli](http://gabrielecirulli.github.io/2048/).
Unfortunately it does not feature any fancy visual effects, but it does include
a simple AI that plays the game for you!

## How to play

Move all the cells at once by pressing the arrow keys. If two squares of the
same value collides they will merge into one with the new value being the sum of
the two. When no more moves are possible the game is over.

[Demo](https://dl.dropboxusercontent.com/u/334931/2048/index.html).

To invoke the AI, fire up your favorite browser's developer tools and call the
function `runAi(m, depth, waitTime)`, where `m` is the matrix representing the
game, `depth` is how many steps the AI should simulate (this should be less
than ten due to the inefficiency of the AI) and `waitTime` is the time (in ms)
to wait between moves. For start, try `runAi(m, 6, 50)`.

