"use client";
import { updateName } from "@/lib/features/user/usersSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button, TextField } from "@radix-ui/themes";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export const CreateUser = ({
  username, setUsername,
}: {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}) => {
  const dispatch = useAppDispatch();

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(updateName(username));
    setUsername("");
  }

  return (
    <>
      <TextField.Root className="w-[70%] lg:w-[25rem] m-auto p-2">
        <TextField.Input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Fill Name"
          variant="soft"
          color="indigo"
          radius="full" />
        {username && (
          <Button onClick={handleSubmit} radius="full" color="tomato">
            Start
          </Button>
        )}
      </TextField.Root>
    </>
  );
};
