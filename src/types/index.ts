import { GameActionKind, GameChoice, GamePhase, GameWinner } from "../enums";

export interface PlayerBet {
  choice: GameChoice;
  amount: number;
}

export interface GameStateType {
  balance: number;
  totalNetWinningAmount: number;
  playerBetPositions: PlayerBet[];
  currentGamePhase: GamePhase;
  computerChoice: GameChoice | null;
  playerChoice: GameChoice | null;
  currentGameWinner: GameWinner | null;
  winningChoice: GameChoice | null;
  currentWinningAmount: number;
}

export type GameAction =
  | { type: GameActionKind.PLACE_BET; betPosition: GameChoice }
  | { type: GameActionKind.CLEAR_BET }
  | { type: GameActionKind.SHOW_BET_RESULT }
  | { type: GameActionKind.START_GAME };
