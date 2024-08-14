import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import GameChoicesResult from "./GameChoicesResult";
import GameBettingResult from "./GameBettingResult";
import { GamePhase } from "../enums";
import GameStatusMessage from "./GameStatusMessage";

export default function GameStatus() {
  const {
    gameState: {
      currentGamePhase,
      hasSufficientFundsToBet,
      computerChoice,
      playerChoice,
      currentGameWinner,
      winningChoice,
      currentWinningAmount,
    },
  } = useContext(GameContext);

  if (currentGamePhase === GamePhase.Initial) {
    return (
      <GameStatusMessage isSufficientFundsToBet={hasSufficientFundsToBet} />
    );
  }

  if (currentGamePhase === GamePhase.Timeout) {
    return (
      <GameChoicesResult
        computerChoice={computerChoice!}
        playerChoice={playerChoice!}
      />
    );
  }

  if (currentGamePhase === GamePhase.Finished) {
    return (
      <GameBettingResult
        winner={currentGameWinner!}
        currentWinningAmount={currentWinningAmount!}
        winningChoice={winningChoice}
      />
    );
  }

  return null;
}
