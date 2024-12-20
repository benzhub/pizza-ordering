"use client";
import { Skeleton } from "@/app/components";
import {
  updateAddress,
  updateName,
  updatePhone,
} from "@/lib/features/user/usersSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FaPizzaSlice } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { SkeletonTheme } from "react-loading-skeleton";
import { Session } from "next-auth";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/product" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Orders", href: "/order" },
];

interface ModifiedSession extends Session {
  user: Session["user"] & {
    name: string;
    phone: string;
    address: string;
    image: string;
  };
}

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { status, data: session } = useSession();
  const typedSession = session as ModifiedSession;

  useEffect(() => {
    if (status === "authenticated" && typedSession?.user) {
      const { name, phone, address } = typedSession.user;
      if (name) dispatch(updateName(name));
      if (phone) dispatch(updatePhone(phone));
      if (address) dispatch(updateAddress(address));
    }
  }, [status, typedSession?.user, dispatch]);

  if (status === "loading") return <NavSkeleton />;
  return (
    <nav className="bg-[var(--tomato-a10)] p-4">
      <Container>
        <Flex justify="between">
          <Link href="/" className="flex items-center gap-4">
            <FaPizzaSlice size="32" />
            {status === "authenticated" && (
              <Text weight="bold">Hi, {typedSession?.user?.name}</Text>
            )}
          </Link>
          <div className="flex justify-between items-center gap-4">
            <Desktop />
            <Mobile />
          </div>
        </Flex>
      </Container>
    </nav>
  );
};

function handleSignout() {
  localStorage.removeItem("user");
  signOut({ callbackUrl: "/" });
}

const Mobile = () => {
  const { status, data: session } = useSession();
  const typedSession = session as ModifiedSession;
  return (
    <div className="lg:hidden">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button>
            <GiHamburgerMenu size="24" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {status === "authenticated" && (
            <DropdownMenu.Item className="m-auto my-4">
              <Avatar
                src={typedSession?.user?.image || ""}
                fallback="?"
                size="3"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </DropdownMenu.Item>
          )}
          {links.map((link) => (
            <DropdownMenu.Item key={link.href}>
              <Link href={link.href} className="font-bold text-lg">
                {link.label}
              </Link>
            </DropdownMenu.Item>
          ))}
          {status === "authenticated" ? (
            <DropdownMenu.Item className="my-4">
              <Button onClick={handleSignout} size="3" radius="large">
                Logout
              </Button>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item className="my-4">
              <Link href="/api/auth/signin">
                <Button size="3" radius="large">
                  Login
                </Button>
              </Link>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

const Desktop = () => {
  const { status, data: session } = useSession();
  const typedSession = session as ModifiedSession;
  const currentPath = usePathname();
  return (
    <ul className="hidden lg:flex justify-center items-center gap-4 font-bold text-xl">
      {links.map((link) => (
        <li
          key={link.href}
          className={`${link.href === currentPath ? "py-1 border-b-2" : ""}`}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
      {status === "unauthenticated" && (
        <li>
          <Link href="/api/auth/signin">
            <Button size="3">Login</Button>
          </Link>
        </li>
      )}
      {status === "authenticated" && (
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={typedSession?.user?.image || ""}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Button onClick={handleSignout} size="3" radius="large">
                Logout
              </Button>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>
      )}
    </ul>
  );
};

const NavSkeleton = () => {
  return (
    <nav className="bg-[var(--tomato-a10)] p-4">
      <Container>
        <Flex justify="between">
          <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
            <Flex align="center" gap="4">
              <FaPizzaSlice size="32" />
              <Skeleton height="1.4rem" width="7rem" />
            </Flex>
            <Box className="lg:hidden">
              <Skeleton height="2rem" width="2.5rem" />
            </Box>
            <ul className="hidden lg:flex justify-center items-center gap-4 font-bold text-xl">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <Skeleton width="2.5rem" height="2rem" />
            </ul>
          </SkeletonTheme>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
