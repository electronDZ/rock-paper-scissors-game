import { GameChoice } from "../enums";

interface Props {
  playerChoice: GameChoice;
  computerChoice: GameChoice;
}

export default function GameChoicesResult({
  playerChoice,
  computerChoice,
}: Props) {
  return (
    <p className="mb-20 animate-fade text-center text-4xl font-semibold uppercase text-white">
      <span>{computerChoice}</span>
      <span className="mx-12 text-2xl font-bold text-primary">VS</span>
      <span>{playerChoice}</span>
    </p>
  );
}
