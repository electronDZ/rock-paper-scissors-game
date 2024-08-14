import { useContext, useMemo } from "react";
import { GameContext } from "../context/GameContext";

export default function Header() {
  const {
    gameState: { totalNetWinningAmount, playerBetPositions, balance },
  } = useContext(GameContext);

  const currentBettingAmount = useMemo(() => {
    return playerBetPositions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
  }, [playerBetPositions]);

  return (
    <header className="flex w-full items-center justify-center gap-14 bg-[#161616] py-px">
      <HeaderItem title="BALANCE" value={balance} />
      <HeaderItem title="BET" value={currentBettingAmount} />
      <HeaderItem title="WIN" value={totalNetWinningAmount} />
    </header>
  );
}

const HeaderItem = ({ title, value }: { title: string; value: number }) => {
  return (
    <p>
      <span className="font-bold text-primary">{title}:</span>
      <span className="ml-2 font-semibold text-white">{value}</span>
    </p>
  );
};
