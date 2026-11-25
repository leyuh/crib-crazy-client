# Crib Crazy — Client

React frontend for Crib Crazy (the app manifest also calls it Cribbage Crazy). It's a practice app for deciding which two cards to throw into the crib.

The API is in [crib-crazy-server](https://github.com/leyuh/crib-crazy-server).

Designed and coded by me (Claire / leyuh) in 2023, before I used AI coding tools.

## Tech stack

- React 18 (Create React App)
- React Router
- axios
- react-cookie
- localStorage to keep the current round around if you refresh

## How it works

Each round deals six random cards and randomly decides whether the crib is yours or the opponent's. You pick two cards to discard. The app then compares your throw to every other possible discard from that hand and shows a round summary:

- Hand and crib point breakdowns, including average potential points once a random starter is added (and, for the crib, two random opponent cards)
- A throw score: potential hand points plus potential crib points. Crib points are negative if the crib is the opponent's.
- An accuracy rating based on where your throw score sits between the worst and best possible throws
- The bot's best combination, found by scoring all 15 possible discards

There's a help menu in the app with more detail on the scoring, plus a link to cribbage rules.

## Features

- Select cards, sort them, and deal a new hand each round
- Round summary comparing your discard to the best and worst options
- Optional accounts (register / login) so stats can be saved
- Leaderboard ranked by level, with average accuracy (last 50 hands), hit/miss ratio, longest hit streak, highest throw score, and account age
- Unlockable themes: default (level 1), sky (level 2), and space (level 4)
- Current round is saved in the browser, so a refresh doesn't wipe your hand

## How to run

```bash
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

The client talks to the hosted API at `https://crib-cards-api.onrender.com`. To use a local server, change those request URLs to `http://localhost:3001` (see [crib-crazy-server](https://github.com/leyuh/crib-crazy-server)).
