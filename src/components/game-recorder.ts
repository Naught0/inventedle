import type { GameResultCreateInput } from "@/db/prisma/generated/models";

export type LocalGame = Omit<
  GameResultCreateInput,
  "user_id" | "created_at" | "num_guesses" | "guesses"
> & { guesses: number[] };
interface ResultRecorder {
  record: (win: boolean) => void;
  recordGuess: (guess: number) => void;
}

export class LocalRecorder implements ResultRecorder {
  public storageKey = "inventedle-game-results";
  public games: Record<string, LocalGame> = {};
  public game: LocalGame;
  constructor(
    public iotdId: number,
    public inventionId: number,
  ) {
    this.games = JSON.parse(localStorage.getItem(this.storageKey) || "{}");
    this.game = this.games[this.iotdId] || {
      invention_id: this.inventionId,
      iotd_id: iotdId,
      guesses: [],
    };
  }

  private syncStorage() {
    this.games[this.iotdId] = this.game;
    localStorage.setItem(this.storageKey, JSON.stringify(this.games));
    console.log(this.games);
  }

  public recordGuess(guess: number) {
    this.game.guesses.push(guess);
    this.syncStorage();
  }

  public record(win: boolean) {
    if (
      !Array.isArray(this.game.guesses) ||
      !this.game.guesses.every(Number.isInteger)
    )
      throw new Error(`Invalid guesses: ${this.game.guesses}`);

    this.game.win = win;
    this.syncStorage();
  }
}
