import { PropsWithChildren, FC, useState } from "react";
import {
  Button,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { useRockPaperScissorsSolo } from "./use-rock-paper-scissors";
import { PLAYS, Play } from "./core/rock-paper-scissors";

const ContentContainer: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Container maxW="container.lg" p={["8", "16", "24"]}>
    {children}
  </Container>
);

type GameState = "DRAW" | "WIN" | "LOSS" | "RUNNING" | "IDLE";
function App() {
  const [gameState, setGameState] = useState<GameState>("IDLE");
  const [playerName, setPlayerName] = useState<string>();
  const [play, setPlay] = useState<Play>("rock");
  const runGame = useRockPaperScissorsSolo({
    onDraw: () => setGameState("DRAW"),
    onWin: () => setGameState("WIN"),
    onLoss: () => setGameState("LOSS"),
  });

  const start = () => {
    setGameState("RUNNING");
    setTimeout(() => runGame({ name: playerName, play }), 500);
  };

  return (
    <ContentContainer>
      {gameState === "IDLE" && (
        <>
          <Heading>Play some rock paper scissors</Heading>

          <FormControl id="name">
            <FormLabel>Player name</FormLabel>
            <Input
              placeholder="TheLegend27"
              onChange={(e) => setPlayerName(e.currentTarget.value)}
            />
          </FormControl>

          <FormControl id="play" mb={4}>
            <FormLabel>Player name</FormLabel>
            <Select onChange={(e) => setPlay(e.currentTarget.value as Play)}>
              {PLAYS.map((p) => (
                <option key={p} defaultChecked={p === play} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button type="button" onClick={start}>
            Start game
          </Button>
        </>
      )}

      {gameState === "RUNNING" && (
        <>
          <Heading>Running game...</Heading>
          <Spinner />
        </>
      )}

      {gameState === "DRAW" && <Heading>It's a draw :o</Heading>}

      {gameState === "WIN" && (
        <>
          <Heading>You win!</Heading>
        </>
      )}

      {gameState === "LOSS" && (
        <>
          <Heading>You lost :(</Heading>
        </>
      )}

      {!["RUNNING", "IDLE"].includes(gameState) && (
        <Button
          type="button"
          onClick={() => {
            setGameState("IDLE");
          }}
        >
          Replay
        </Button>
      )}
    </ContentContainer>
  );
}

export default App;
