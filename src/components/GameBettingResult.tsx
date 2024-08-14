import { cva } from "class-variance-authority";
import { GameChoice, GameWinner } from "../enums";

interface Props {
  winner: GameWinner;
  currentWinningAmount: number;
  winningChoice: GameChoice | null;
}

export default function GameBettingResult({
  winner,
  currentWinningAmount,
  winningChoice,
}: Props) {
  const StatusMessage =
    winner === GameWinner.Tie ? "TIE" : `${winningChoice} WON`;

  return (
    <div className="mb-12 animate-fade text-center uppercase">
      <h3
        className={StatusMessageVariants({
          textColorVariant: winningChoice ?? "tie",
        })}
      >
        {StatusMessage}
      </h3>
      <h4 className="text-xl font-semibold text-primary">
        YOU WIN: <span className="text-white">{currentWinningAmount}</span>
      </h4>
    </div>
  );
}

const StatusMessageVariants = cva("text-4xl font-semibold mb-1", {
  variants: {
    textColorVariant: {
      rock: "text-rock-main",
      paper: "text-paper-main",
      scissors: "text-scissors-main",
      tie: "text-white",
    },
  },
});
