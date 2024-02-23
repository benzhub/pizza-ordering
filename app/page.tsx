"use client";
import { Skeleton } from "@/app/components";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const { status, data: session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      setIsAuthenticated(true);
      setUsername(session.user.name);
    }
  }, [session?.user?.name, status]);

  if (status === "loading") return <HomePageSkeleton />;

  return (
    <Container>
      <Flex direction="column" gap="2" align="center">
        <Heading as="h1" align="center" size={{ initial: "7" }}>
          The Best Pizza.
        </Heading>
        <Heading as="h3" align="center" size={{ initial: "4" }}>
          Straight out of the oven, straight to you.
        </Heading>
        <div className="my-5">
          {isAuthenticated && (
            <Button radius="full" size="4">
              <Link href="/product">Continue Ordering, {username}</Link>
            </Button>
          )}
          {!isAuthenticated && (
            <>
              <Text align="center">
                &#128400; Welcome! Please Login to select your pizza.
              </Text>
              <Link href="/api/auth/signin">
                <Button size="4" radius="full">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </Flex>
    </Container>
  );
}

const HomePageSkeleton = () => {
  return (
    <Container>
      <Flex direction="column" gap="2" align="center" className="my-3">
        <Skeleton height="3rem" width="12rem" />
        <Skeleton height="1.5rem" width="20rem" />
        <Skeleton
          height="3.5rem"
          width="16rem"
          style={{ borderRadius: "50px" }}
          className="my-4"
        />
      </Flex>
    </Container>
  );
};
