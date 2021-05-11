import { playRockPaperScissors, Player } from "./core/rock-paper-scissors";

type UseRockPaperScissorsSoloCallbacks = {
  onDraw(players: Player[]): void;
  onWin(players: Player[]): void;
  onLoss(players: Player[]): void;
};
export const useRockPaperScissorsSolo = ({
  onDraw,
  onWin,
  onLoss,
}: UseRockPaperScissorsSoloCallbacks) => {
  return (playerInfo: Player) => {
    const game = playRockPaperScissors(playerInfo);

    console.log(game);
    switch (game.outcome) {
      case "draw":
        return onDraw(game.players);
      case "win":
        const winner = game.players.find((x) => x.winner);

        if (winner?.name === playerInfo.name) return onWin(game.players);
        else return onLoss(game.players);
    }
  };
};
