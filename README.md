# Node Trader

This is a simple trading game in the style of Trade Wars.

### How To Run Node Trader

* clone the repository
* run `npm i`
* create `.env` and copy/paste from `.env_example` (or enter your own custom preferences)
* run `npm start`

This will generate all the files you need and give you a basic command line instance to interact with.

### Configuration (`.env`)

The game reads these settings from `.env` through `dotenv`. `.env` is gitignored, so each clone needs its own copy of `.env_example`. Changes to the galaxy settings only apply when a new galaxy is generated (delete `./files` first).

| Variable | Default in `.env_example` | Used in | Effect |
|---|---|---|---|
| `SYSTEMS_TO_GENERATE` | `16` | `lib/Galaxy.js` | Number of star systems in a new galaxy |
| `MAX_PLANETS_PER_SYSTEM` | `5` | `lib/StarSystem.js` | Each system gets a random 0 to this value minus 1 planets |
| `HABITABILITY_CHANCE` | `10` | `lib/Planet.js` | Percent chance a planet is habitable |
| `STAR_SYSTEM_CONNECTION_CHANCE` | `5` | `lib/StarSystem.js` | Percent chance of a wormhole to each other system |
| `STAR_SYSTEM_MAX_CONNECTIONS` | `10` | `lib/StarSystem.js` | Maximum wormholes per system |

Without a `.env` file, galaxy generation crashes with `RangeError: Maximum call stack size exceeded`. `STAR_SYSTEM_CONNECTION_CHANCE` is undefined, so no wormhole is ever created and `generateConnections` retries forever.

### How to Play Node Trader

At the moment you can barely do anything, but you can type `help` to get started and see what you can see

### Like, why though?

Because I spend a lot of my time in node doing web server related stuff and I wanted to try a console application that would use the file system to do interesting things.

Plus, Trade Wars was like, _really_ cool.