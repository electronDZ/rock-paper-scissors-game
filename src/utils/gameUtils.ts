import {
  MAXIMUM_POSITIONS,
  SINGLE_BET_AMOUNT,
  SINGLE_BET_LOSE_RATE,
  SINGLE_BET_TIE_RATE,
  SINGLE_BET_WIN_RATE,
  TWO_BET_LOSE_RATE,
  TWO_BET_TIE_RATE,
  TWO_BET_WIN_RATE,
} from "../constants";
import { GameChoice, GameWinner } from "../enums";
import { getBetOutcome } from "../helpers/bettingHelpers";
import { PlayerBet } from "../types";

export function determineWinner(
  playerChoice: GameChoice,
  computerChoice: GameChoice,
): GameWinner {
  if (playerChoice === computerChoice) return GameWinner.Tie;
  if (
    (playerChoice === GameChoice.Rock &&
      computerChoice === GameChoice.Scissors) ||
    (playerChoice === GameChoice.Scissors &&
      computerChoice === GameChoice.Paper) ||
    (playerChoice === GameChoice.Paper && computerChoice === GameChoice.Rock)
  ) {
    return GameWinner.Player;
  }
  return GameWinner.Computer;
}

export function generateRandomChoice(): GameChoice {
  const choices = Object.values(GameChoice);
  return choices[Math.floor(Math.random() * choices.length)];
}

export function isChoiceInBets(
  playerBets: PlayerBet[],
  choice: GameChoice,
): boolean {
  return playerBets.some((bet) => bet.choice === choice);
}

export function getWinningChoice(
  winner: GameWinner,
  computerChoice: GameChoice,
  playerChoice: GameChoice,
): GameChoice | null {
  switch (winner) {
    case GameWinner.Computer:
      return computerChoice;
    case GameWinner.Player:
      return playerChoice;
    default:
      return null;
  }
}

export function updateBetAmount(
  betPositions: PlayerBet[],
  betPosition: GameChoice,
  betAmount: number,
): PlayerBet[] {
  return betPositions.map((currentBetPosition) => {
    if (currentBetPosition.choice === betPosition) {
      return {
        choice: betPosition,
        amount: currentBetPosition.amount + betAmount,
      };
    }
    return currentBetPosition;
  });
}

export function hasReachedMaximumPositions(betPositions: PlayerBet[]): boolean {
  return betPositions.length >= MAXIMUM_POSITIONS;
}

export function hasMinimumBalance(balance: number): boolean {
  return balance >= SINGLE_BET_AMOUNT;
}

export function calculateWinningAmount(winner: GameWinner, outcome: number) {
  return winner === GameWinner.Player ? outcome : 0;
}

export function updateTotalNetWinningAmount(
  totalNetWinningAmount: number,
  winningAmount: number,
  bettingAmount: number,
) {
  if (winningAmount - bettingAmount > 0) {
    return totalNetWinningAmount + (winningAmount - bettingAmount);
  }
  return totalNetWinningAmount;
}

export function updateBalance(balance: number, winningAmount: number) {
  return balance + winningAmount;
}

export function getPlayerBestPosition(
  playerBetPositions: PlayerBet[],
  computerChoice: GameChoice,
): GameChoice {
  const winnerPositions: GameWinner[] = determineWinners(
    playerBetPositions,
    computerChoice,
  );

  if (winnerPositions[0] === GameWinner.Player) {
    return playerBetPositions[0].choice;
  }

  if (winnerPositions[1] === GameWinner.Player) {
    return playerBetPositions[1].choice;
  }

  if (winnerPositions[0] === GameWinner.Tie) {
    return playerBetPositions[0].choice;
  }

  return playerBetPositions[1].choice;
}

export function determineWinners(
  playerBetPositions: PlayerBet[],
  computerChoice: GameChoice,
) {
  return playerBetPositions.map((betPosition) =>
    determineWinner(betPosition.choice, computerChoice),
  );
}

export function calculateSingleBetOutcome(
  bettingAmount: number,
  winner: GameWinner,
) {
  return getBetOutcome(
    bettingAmount,
    winner,
    SINGLE_BET_WIN_RATE,
    SINGLE_BET_TIE_RATE,
    SINGLE_BET_LOSE_RATE,
  );
}

export function calculateTwoBetsOutcome(
  playerBetPositions: PlayerBet[],
  computerChoice: GameChoice,
) {
  const betOutcome1 = getBetOutcome(
    playerBetPositions[0].amount,
    determineWinner(playerBetPositions[0].choice, computerChoice),
    TWO_BET_WIN_RATE,
    TWO_BET_TIE_RATE,
    TWO_BET_LOSE_RATE,
  );

  const betOutcome2 = getBetOutcome(
    playerBetPositions[1].amount,
    determineWinner(playerBetPositions[1].choice, computerChoice),
    TWO_BET_WIN_RATE,
    TWO_BET_TIE_RATE,
    TWO_BET_LOSE_RATE,
  );

  return betOutcome1 + betOutcome2;
}

export function calculateTotalBettingAmount(playerBetPositions: PlayerBet[]) {
  return playerBetPositions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
}
