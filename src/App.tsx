import Header from "./components/Header";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <main className="h-screen overflow-hidden bg-gradient-to-b from-[#484848] to-[#1D1D1D]">
      <Header />
      <GameBoard />
    </main>
  );
}

export default App;
