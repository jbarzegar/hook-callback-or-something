import { playRockPaperScissors, Player } from "./rock-paper-scissors";

type PlayerTuple = [Player, Player];

const getPlayers = (winnerName: string, loserName: string): PlayerTuple => {
  const players: PlayerTuple = [
    { name: winnerName, play: "rock" },
    { name: loserName, play: "scissors" },
  ];
  return players;
};

describe("Rock paper Scissors", () => {
  const playGame = (winnerName: string, loserName = "Computer") => {
    const players = getPlayers(winnerName, loserName);

    return (
      expected = {
        outcome: "win",
        players: players.map((x) => ({ ...x, winner: x.name === winnerName })),
      }
    ) => {
      const game = playRockPaperScissors(...players);

      expect(game.outcome).toEqual(expected.outcome);
      expect(game.players).toEqual(expected.players);
    };
  };

  it("should let the human win", () => {
    const test = playGame("Human");

    test();
  });

  it("should let the computer win", () => {
    const test = playGame("Computer", "Human");

    test();
  });

  it("should draw", () => {
    const players = getPlayers("Human", "Computer").map((x) => ({
      ...x,
      play: "paper",
    })) as PlayerTuple;

    const { outcome, ...game } = playRockPaperScissors(...players);

    expect(outcome).toEqual("draw");
    expect(game.players).toEqual(players);
  });
});
