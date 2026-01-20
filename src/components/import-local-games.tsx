"use client";
import { useBackfillResults } from "./hooks/use-backfill-results";
import { Stack } from "./ui/stack";
import { Button } from "./ui/button";
import { BiSolidCloudUpload } from "react-icons/bi";
import { GoHomeButton } from "./go-home-button";
import { FaCircleInfo } from "react-icons/fa6";

export function ImportLocalGames({ userId }: { userId: string }) {
  const {
    backfill,
    localGamesToImport,
    data,
    error,
    isPending,
    isSuccess,
    isError,
  } = useBackfillResults({ userId });

  const noGamesToImport = !isSuccess && localGamesToImport.length === 0;

  const gameOrGames = localGamesToImport.length === 1 ? "game" : "games";

  return (
    <Stack className="items-center">
      <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
        {noGamesToImport ? (
          <span>No local games to import</span>
        ) : (
          <span>
            You have{" "}
            <span className="text-primary font-mono font-extrabold">
              {localGamesToImport.length}
            </span>{" "}
            local {gameOrGames} to import
          </span>
        )}
      </h2>
      <Stack
        className="bg-accent mb-6 max-w-sm rounded-lg px-4 py-2 sm:max-w-lg"
        gap
      >
        <Stack gap={false} horizontal>
          <div>
            <FaCircleInfo className="fill-primary xs:text-2xl my-1 mr-2 text-xl" />
          </div>
          <Stack gap={"gap-1"}>
            <p className="text-muted-foreground text-base sm:text-lg">
              Import games played before you signed up or while you were signed
              out
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              Only puzzles you have not played on this account will be imported
              - existing results will not be overwritten
            </p>
          </Stack>
        </Stack>
        <p className="text-muted-foreground pb-3 text-center text-lg font-bold">
          You can&apos;t undo this action
        </p>
      </Stack>
      {noGamesToImport ? (
        <GoHomeButton />
      ) : (
        <Button
          className="w-fit text-xl font-semibold"
          onClick={backfill}
          isLoading={isPending}
          disabled={isPending || localGamesToImport.length === 0}
        >
          <BiSolidCloudUpload className="text-3xl" />
          Import {gameOrGames}
        </Button>
      )}
      {isError && !!error && (
        <Stack className="gap-0">
          <p className="text-lg font-bold">Failed to import</p>
          <pre className="bg-accent text-primary rounded-lg px-4 py-2 text-left text-sm">
            Error: {error.message}
          </pre>
        </Stack>
      )}
      {isSuccess && (
        <p className="text-status-success-foreground bg-status-success rounded-lg px-4 py-2 text-lg font-bold">
          Successfully imported {data?.length} {gameOrGames}
        </p>
      )}
    </Stack>
  );
}
