interface Props {
  isSufficientFundsToBet: boolean;
}

export default function GameStatusMessage({ isSufficientFundsToBet }: Props) {
  return (
    <div className="flex h-full flex-col justify-end">
      <h3
        className={`${!isSufficientFundsToBet ? "text-red-500" : "text-primary"} animate-fade text-center text-sm font-bold`}
      >
        {!isSufficientFundsToBet ? "INSUFFICIENT FUNDS" : "PICK YOUR POSITIONS"}
      </h3>
    </div>
  );
}
