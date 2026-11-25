# Crib Crazy — Client

React frontend for Crib Crazy (also titled Cribbage Crazy in the app manifest), a practice tool for the most important cribbage skill: choosing which two cards to throw into the crib.

The Express/MongoDB API lives in [crib-crazy-server](https://github.com/leyuh/crib-crazy-server).

## Tech stack

- React 18 (Create React App)
- React Router
- axios
- react-cookie
- Local storage for in-progress round state

## How it works

Each round deals six random cards and randomly assigns the crib to you or to the opponent. You select two cards to discard. The app then compares your throw to every possible discard from that hand and shows a round summary:

- Hand and crib point breakdowns, including average potential points once a random starter (and, for the crib, two random opponent cards) are added
- A throw score (potential hand points plus potential crib points; crib points are negative when the crib is the opponent's)
- An accuracy rating based on where your throw score sits between the worst and best possible throws
- The bot's best combination, found by scoring all 15 possible discards

A help menu in the app explains the scoring in more detail and links to cribbage rules.

## Features

- Card selection, sort, and a new random deal each round
- Round summary comparing your discard to the best and worst options
- Optional accounts (register / login) so stats can be saved
- Leaderboard ranked by level, with average accuracy (last 50 hands), hit/miss ratio, longest hit streak, highest throw score, and account age
- Unlockable themes: default (level 1), sky (level 2), and space (level 4)
- Round state persisted in the browser so a refresh does not wipe the current hand

## How to run

```bash
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

The client calls the hosted API at `https://crib-cards-api.onrender.com`. To use a local server, change those request URLs to `http://localhost:3001` (see [crib-crazy-server](https://github.com/leyuh/crib-crazy-server)).
