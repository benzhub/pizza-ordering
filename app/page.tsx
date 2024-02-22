"use client";
import { useAppSelector } from "@/lib/hooks";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CreateUser } from "./CreateUser";

export default function Home() {
  const [username, setUsername] = useState("");
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.username) {
      setUsername(user.username);
    }
  }, [user.username]);

  return (
    <Container>
      <Flex direction="column" gap="2" align="center">
        <Heading as="h1" align="center" size={{ initial: "7" }}>
          The Best Pizza.
        </Heading>
        <Heading as="h3" align="center" size={{ initial: "4" }}>
          Straight out of the oven, straight to you.
        </Heading>
        {user.username ? (
          <Button radius="full" size="4">
            <Link href="/product">Continue Ordering, {username}</Link>
          </Button>
        ) : (
          <>
            <Text align="center">
              &#128400; Welcome! Please start by telling us your name:
            </Text>
            <CreateUser username={username} setUsername={setUsername} />
          </>
        )}
      </Flex>
    </Container>
  );
}
