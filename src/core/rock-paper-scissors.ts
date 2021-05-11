export const PLAYS = ["rock", "paper", "scissors"] as const;

export type Play = typeof PLAYS[number];
export interface Player {
  name?: string;
  play: Play;
}
interface PlayerResult extends Player {
  winner: boolean;
}

const rules: Record<Play, Record<"beats", Play>> = {
  scissors: { beats: "paper" },
  paper: { beats: "rock" },
  rock: { beats: "scissors" },
};

const getComputerPlayer = (name = "CPU"): Player => {
  const randomIndex = Math.floor(Math.random() * PLAYS.length);

  return { play: PLAYS[randomIndex], name };
};

type FnWin = (
  p: Record<"winner" | "loser", Player>
) => PlayRockPaperScissorsReturnValue;

const win: FnWin = ({ winner, loser }) => ({
  outcome: "win",
  players: [
    { ...winner, winner: true },
    { ...loser, winner: false },
  ],
});

type PlayRockPaperScissorsReturnValue =
  | { outcome: "draw"; players: Player[] }
  | {
      outcome: "win";
      winMessage?: string;
      players: PlayerResult[];
    };

type PlayRockPaperScissors = (
  player1: Player,
  player2?: Player
) => PlayRockPaperScissorsReturnValue;

export const playRockPaperScissors: PlayRockPaperScissors = (
  player1,
  player2 = getComputerPlayer()
) => {
  const players = [player1, player2];

  if (player1.play === player2.play) {
    return { outcome: "draw", players };
  }

  if (rules[player1.play].beats === player2.play) {
    return win({ winner: player1, loser: player2 });
  }

  return win({ winner: player2, loser: player1 });
};
