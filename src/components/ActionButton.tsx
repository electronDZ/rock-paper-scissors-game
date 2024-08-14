import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { cva } from "class-variance-authority";
import { GAME_RESULTS_TIMEOUT } from "../constants";
import { GameActionKind, GamePhase } from "../enums";

export default function ActionButton() {
  const {
    gameDispatch,
    gameState: { currentGamePhase, playerBetPositions, hasSufficientFundsToBet },
  } = useContext(GameContext);

  const buttonText = currentGamePhase === GamePhase.Finished ? "clear" : "play";

  const disabled =
    currentGamePhase === GamePhase.Timeout ||
    playerBetPositions.length <= 0 ||
    !hasSufficientFundsToBet;

  const handleActionButtonClick = () => {
    if (currentGamePhase === GamePhase.Initial) {
      gameDispatch({ type: GameActionKind.START_GAME });
      setTimeout(() => {
        gameDispatch({ type: GameActionKind.SHOW_BET_RESULT });
      }, GAME_RESULTS_TIMEOUT);
    }
    if (currentGamePhase === GamePhase.Finished) {
      gameDispatch({ type: GameActionKind.CLEAR_BET });
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleActionButtonClick}
      className={actionButtonVariants({
        disabled,
      })}
    >
      {buttonText}
    </button>
  );
}

const actionButtonVariants = cva(
  "h-[68px] w-40 rounded-full border-2 border-primary bg-[#070707] text-2xl font-semibold text-primary uppercase",
  {
    variants: {
      disabled: {
        true: "opacity-40 pointer-events-none",
        false: "transition duration-150 hover:scale-[101%]",
      },
    },
  },
);
