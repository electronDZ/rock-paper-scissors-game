import { SINGLE_BET_AMOUNT } from "../constants";
import { GameChoice, GamePhase, GameWinner } from "../enums";
import { INITIAL_GAME_STATE } from "../reducer/gameReducer";
import { GameStateType } from "../types";
import {
  calculateSingleBetOutcome,
  calculateTwoBetsOutcome,
  calculateWinningAmount,
  isChoiceInBets,
  determineWinner,
  generateRandomChoice,
  getPlayerBestPosition,
  getWinningChoice,
  hasReachedMaximumPositions,
  hasMinimumBalance,
  updateBalance,
  updateBetAmount,
  updateTotalNetWinningAmount,
  calculateTotalBettingAmount,
} from "./gameUtils";

export function handleSingleBetResult(state: GameStateType): GameStateType {
  const winner: GameWinner = determineWinner(
    state.playerBetPositions[0].choice,
    state.computerChoice!,
  );
  const winningChoice: GameChoice | null = getWinningChoice(
    winner,
    state.computerChoice!,
    state.playerBetPositions[0].choice,
  );
  const outcome = calculateSingleBetOutcome(
    state.playerBetPositions[0].amount,
    winner,
  );
  const newBalance = updateBalance(state.balance, outcome);
  const winningAmount = calculateWinningAmount(winner, outcome);
  const newTotalNetWinningAmount = updateTotalNetWinningAmount(
    state.totalNetWinningAmount,
    winningAmount,
    state.playerBetPositions[0].amount,
  );

  return {
    ...state,
    currentGamePhase: GamePhase.Finished,
    currentGameWinner: winner,
    currentWinningAmount: winningAmount,
    totalNetWinningAmount: newTotalNetWinningAmount,
    balance: newBalance,
    winningChoice: winningChoice,
  };
}

export function handleTwoBetsResult(state: GameStateType): GameStateType {
  const bestPositionWinner: GameWinner = determineWinner(
    state.playerChoice!,
    state.computerChoice!,
  );

  const winningChoice: GameChoice | null = getWinningChoice(
    bestPositionWinner,
    state.computerChoice!,
    state.playerChoice!,
  );
  const totalBettingAmount = calculateTotalBettingAmount(
    state.playerBetPositions,
  );

  const outcome = calculateTwoBetsOutcome(
    state.playerBetPositions,
    state.computerChoice!,
  );
  const newBalance = updateBalance(state.balance, outcome);
  const newTotalNetWinningAmount = updateTotalNetWinningAmount(
    state.totalNetWinningAmount,
    outcome,
    totalBettingAmount,
  );

  return {
    ...state,
    currentGamePhase: GamePhase.Finished,
    currentWinningAmount: outcome,
    totalNetWinningAmount: newTotalNetWinningAmount,
    balance: newBalance,
    currentGameWinner: bestPositionWinner,
    winningChoice: winningChoice,
  };
}

export function handleStartGame(state: GameStateType): GameStateType {
  const computerChoice = generateRandomChoice();

  let playerChoice: GameChoice = null!;

  // player choice for one bet
  if (state.playerBetPositions.length === 1) {
    playerChoice = state.playerBetPositions[0].choice;
  }

  // player best choice for two bet
  if (state.playerBetPositions.length === 2) {
    playerChoice = getPlayerBestPosition(
      state.playerBetPositions,
      computerChoice!,
    );
  }

  return {
    ...state,
    playerChoice: playerChoice,
    currentGamePhase: GamePhase.Timeout,
    computerChoice: computerChoice,
  };
}

export function handlePlaceBet(
  state: GameStateType,
  betPosition: GameChoice,
): GameStateType {
  // check if player has insufficient balance
  if (!hasMinimumBalance(state.balance)) {
    return state;
  }

  // check if player already placed bet on this position
  if (isChoiceInBets(state.playerBetPositions, betPosition)) {
    const newBetPositions = updateBetAmount(
      state.playerBetPositions,
      betPosition,
      SINGLE_BET_AMOUNT,
    );
    return {
      ...state,
      playerBetPositions: newBetPositions,
      balance: state.balance - SINGLE_BET_AMOUNT,
    };
  }

  // check if player already placed maximum positions
  if (hasReachedMaximumPositions(state.playerBetPositions)) {
    return state;
  }

  // place bet on new position
  const newBetPositions = [
    ...state.playerBetPositions,
    {
      choice: betPosition,
      amount: SINGLE_BET_AMOUNT,
    },
  ];
  return {
    ...state,
    playerBetPositions: newBetPositions,
    balance: state.balance - SINGLE_BET_AMOUNT,
  };
}

export function handleClearBet(state: GameStateType) {
  return {
    ...INITIAL_GAME_STATE,
    balance: state.balance,
    totalNetWinningAmount: state.totalNetWinningAmount,
  };
}
