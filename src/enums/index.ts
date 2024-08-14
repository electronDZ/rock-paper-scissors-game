export enum GamePhase {
  Initial = "initial",
  Timeout = "timeout",
  Finished = "finished",
}

export enum GameChoice {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors",
}

export enum GameWinner {
  Player = "player",
  Computer = "computer",
  Tie = "tie",
}

export enum GameActionKind {
  PLACE_BET = "PLACE_BET",
  CLEAR_BET = "CLEAR_BET",
  SHOW_BET_RESULT = "SHOW_BET_RESULT",
  START_GAME = "START_GAME",
}
