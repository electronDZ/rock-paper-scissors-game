import { cva } from "class-variance-authority";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { GameActionKind, GameChoice, GamePhase } from "../enums";
import {
  isChoiceInBets,
  hasReachedMaximumPositions,
  hasMinimumBalance,
} from "../utils/gameUtils";

interface Props {
  position: GameChoice;
}
export default function BettingPosition({ position }: Props) {
  const {
    gameDispatch,
    gameState: { playerBetPositions, balance, currentGamePhase, winningChoice },
  } = useContext(GameContext);

  const bettingAmount =
    playerBetPositions.find((betPosition) => betPosition.choice === position)
      ?.amount || 0;

  const disableForMaximumEnteries = (): boolean => {
    if (hasReachedMaximumPositions(playerBetPositions)) {
      return !isChoiceInBets(playerBetPositions, position);
    }
    return false;
  };

  const betPositionDisabled =
    currentGamePhase !== GamePhase.Initial ||
    !hasMinimumBalance(balance) ||
    disableForMaximumEnteries();

  return (
    <button
      className={BetPositionButtonVariants({
        position,
        disabled: betPositionDisabled,
        highlighted: winningChoice === position,
      })}
      disabled={betPositionDisabled}
      onClick={() =>
        gameDispatch({ type: GameActionKind.PLACE_BET, betPosition: position })
      }
    >
      <div className={bettingAmountVriants({ hidden: bettingAmount === 0 })}>
        {bettingAmount}
      </div>
      <p className="text-2xl font-semibold uppercase">{position}</p>
    </button>
  );
}

const BetPositionButtonVariants = cva(
  `focus:outline-none h-32 w-40 rounded-md border-2`,
  {
    variants: {
      position: {
        rock: "border-rock-main bg-rock-bg text-rock-main",
        paper: "border-paper-main bg-paper-bg text-paper-main",
        scissors: "border-scissors-main bg-scissors-bg text-scissors-main",
      },
      highlighted: {
        true: "border-[5px]",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer transition duration-150 hover:scale-[101%]",
      },
    },
  },
);

const bettingAmountVriants = cva(
  "mx-auto mb-3 grid h-10 w-10 place-content-center rounded-full border-[4px] border-blue-500 bg-white text-sm font-semibold text-black",
  {
    variants: {
      hidden: {
        true: "opacity-0",
      },
    },
  },
);
