import { createContext, ReactNode, useReducer } from "react";
import { gameReducer, INITIAL_GAME_STATE } from "../reducer/gameReducer";
import { GameAction, GameStateType } from "../types";
import { isSufficientFundsToBet } from "../helpers/bettingHelpers";

interface ContextProps {
  gameState: GameStateType & { hasSufficientFundsToBet: boolean };
  gameDispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<ContextProps>(null!);

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);

  const hasSufficientFundsToBet = isSufficientFundsToBet(
    gameState.balance,
    gameState.currentGamePhase,
    gameState.playerBetPositions,
  );

  return (
    <GameContext.Provider
      value={{
        gameState: {
          ...gameState,
          hasSufficientFundsToBet,
        },
        gameDispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };
