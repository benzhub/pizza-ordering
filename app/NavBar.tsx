"use client";
import { updateName } from "@/lib/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Avatar,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPizzaSlice } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/product" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Orders", href: "/order" },
];

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { status, data: session } = useSession();
  const user = useAppSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") setUsername(user.username);
    if (status === "authenticated" && session?.user?.name) {
      setUsername(session.user.name);
      dispatch(updateName(session.user.name));
      setIsAuthenticated(true);
    }
  }, [status, session, user.username, dispatch]);

  function handleSignout() {
    localStorage.removeItem("user");
    signOut({ callbackUrl: process.env.NEXTAUTH_URL });
  }

  return (
    <nav className="bg-[var(--tomato-a10)] p-4">
      <Container>
        <Flex justify="between">
          <Link href="/" className="flex items-center gap-4">
            <FaPizzaSlice size="32" />
            {username && <Text weight="bold">Hi, {username}</Text>}
          </Link>
          <div className="flex justify-between items-center gap-4">
            <Desktop
              image={session?.user?.image!}
              isAuthenticated={isAuthenticated}
              handleSignout={handleSignout}
            />
            <Mobile
              image={session?.user?.image!}
              isAuthenticated={isAuthenticated}
              handleSignout={handleSignout}
            />
          </div>
        </Flex>
      </Container>
    </nav>
  );
};

const Mobile = ({
  isAuthenticated,
  handleSignout,
  image,
}: {
  isAuthenticated: boolean;
  handleSignout: () => void;
  image: string;
}) => {
  return (
    <div className="lg:hidden">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button>
            <GiHamburgerMenu size="24" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {isAuthenticated && (
            <DropdownMenu.Item className="m-auto my-4">
              <Avatar
                src={image}
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
          {isAuthenticated ? (
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

const Desktop = ({
  isAuthenticated,
  handleSignout,
  image,
}: {
  isAuthenticated: boolean;
  handleSignout: () => void;
  image: string;
}) => {
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
      {!isAuthenticated && (
        <li>
          <Link href="/api/auth/signin">
            <Button size="3">Login</Button>
          </Link>
        </li>
      )}
      {isAuthenticated && (
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={image}
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

export default NavBar;
