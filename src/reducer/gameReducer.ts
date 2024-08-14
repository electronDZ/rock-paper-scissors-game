import { INITIAL_BALANCE } from "../constants";
import { GameActionKind, GameChoice, GamePhase, GameWinner } from "../enums";
import { GameAction, GameStateType, PlayerBet } from "../types";
import {
  handleClearBet,
  handlePlaceBet,
  handleSingleBetResult,
  handleStartGame,
  handleTwoBetsResult,
} from "../utils/gameHandlers";

const INITIAL_GAME_STATE: GameStateType = {
  balance: INITIAL_BALANCE,
  totalNetWinningAmount: 0,
  playerBetPositions: [] as PlayerBet[],
  currentGamePhase: GamePhase.Initial,
  currentGameWinner: null as GameWinner | null,
  currentWinningAmount: 0 as number,
  computerChoice: null as GameChoice | null,
  playerChoice: null as GameChoice | null,
  winningChoice: null as GameChoice | null,
};

const gameReducer = (
  state: GameStateType,
  action: GameAction,
): GameStateType => {
  switch (action.type) {
    case GameActionKind.PLACE_BET:
      return handlePlaceBet(state, action.betPosition);

    case GameActionKind.START_GAME:
      return handleStartGame(state);

    case GameActionKind.SHOW_BET_RESULT:
      if (state.playerBetPositions.length === 1) {
        return handleSingleBetResult(state);
      }
      if (state.playerBetPositions.length === 2) {
        return handleTwoBetsResult(state);
      }

      return state;

    case GameActionKind.CLEAR_BET:
      return handleClearBet(state);

    default:
      return state;
  }
};

export { INITIAL_GAME_STATE, gameReducer };
