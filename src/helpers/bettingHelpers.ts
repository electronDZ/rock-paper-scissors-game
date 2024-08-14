import { GamePhase, GameWinner } from "../enums";
import { PlayerBet } from "../types";
import { hasMinimumBalance } from "../utils/gameUtils";

export function getBetOutcome(
  bettingAmount: number,
  winner: GameWinner,
  winRate: number,
  tieRate: number,
  loseRate: number,
) {
  switch (winner) {
    case GameWinner.Player:
      return bettingAmount * winRate;
    case GameWinner.Computer:
      return bettingAmount * loseRate;
    case GameWinner.Tie:
      return bettingAmount * tieRate;
  }
}

export function isSufficientFundsToBet(
  balance: number,
  currentGamePhase: GamePhase,
  playerBetPositions: PlayerBet[],
) {
  return (
    hasMinimumBalance(balance) ||
    currentGamePhase !== GamePhase.Initial ||
    !!playerBetPositions.length
  );
}
