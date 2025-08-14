import { useState, useEffect } from "react";

export default function App() {
  const generateTiles = () => {
    const tilesArray = [];
    for (let i = 0; i < 10; i++) {
      const randNum = Math.floor(Math.random() * 10) + 1;
      tilesArray.push({
        id: i,
        value: randNum,
        onHold: false,
      });
    }
    return tilesArray;
  };

  const [gameOver, setGameOver] = useState(false);
  const [tiles, setTiles] = useState(() => generateTiles());

  useEffect(() => {
    checkGameOver();
  }, [tiles]);

  function toggle(id) {
    setTiles((prev) =>
      prev.map((tile) =>
        tile.id === id ? { ...tile, onHold: !tile.onHold } : tile
      )
    );
  }

  function getNewTiles() {
    setTiles((prev) =>
      prev.map((tile) =>
        tile.onHold === false
          ? { ...tile, value: Math.floor(Math.random() * 10) + 1 }
          : tile
      )
    );
  }

  function checkGameOver() {
    if (tiles.every((tile) => tile.value === tiles[0].value && tile.onHold)) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
  }

  function newGame() {
    setGameOver(false);
    setTiles(generateTiles());
  }

  return (
    <>
      {gameOver && <h1 style={{ textAlign: "center" }}>You win!</h1>}
      <br />
      <div className="container">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            style={{ backgroundColor: tile.onHold ? "red" : "" }}
            onClick={() => toggle(tile.id)}
            disabled={gameOver}
          >
            {tile.value}
          </button>
        ))}
      </div>
      <br />
      <button onClick={getNewTiles} disabled={gameOver}>
        Get New Tiles
      </button>
      <br />
      {gameOver && <button onClick={newGame}>New Game</button>}
    </>
  );
}
