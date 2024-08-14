import { GameChoice } from "../enums";
import BettingPosition from "./BettingPosition";
import ActionButton from "./ActionButton";
import GameStatus from "./GameStatus";

export default function GameBoard() {
  return (
    <section className="grid h-full place-content-center">
      <div className="flex flex-col justify-between">
        <div className="mb-6 h-32">
          <GameStatus />
        </div>

        <div>
          {/* POSITIONS */}
          <div className="flex justify-center gap-5">
            <BettingPosition position={GameChoice.Rock} />
            <BettingPosition position={GameChoice.Paper} />
            <BettingPosition position={GameChoice.Scissors} />
          </div>

          <div className="mt-16 flex justify-center">
            <ActionButton />
          </div>
        </div>
      </div>
    </section>
  );
}
