"use client";
import { updateName } from "@/lib/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Avatar, Button, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPizzaSlice } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { status, data: session } = useSession();
  const user = useAppSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentPath = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
    { label: "Orders", href: "/order" },
  ];

  useEffect(() => {
    if (status !== "authenticated") setUsername(user.username);
    if (status === "authenticated" && session?.user?.name) {
      setUsername(session.user.name);
      dispatch(updateName(session.user.name));
      setIsAuthenticated(true);
    }
  }, [status, session, user.username, dispatch]);

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/api/auth/signout")
  }

  return (
    <nav className="bg-[var(--tomato-a10)] p-4">
      <Container>
        <Flex justify="between">
          <Link href="/" className="flex items-center gap-4">
            <FaPizzaSlice size="32" />
            {username && <><Text weight="bold">Hi, {username}</Text><Avatar
              src={session?.user?.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            /></>}
          </Link>
          <div className="flex justify-between items-center gap-4">
            <ul className="hidden lg:flex justify-center items-center gap-4 font-bold text-xl">
              {links.map((link) => (
                <li
                  key={link.href}
                  className={`${
                    link.href === currentPath ? "py-1 border-b-2" : ""
                  }`}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              {isAuthenticated ? (
                <li>
                  <Button onClick={handleLogout} size="3">
                    Logout
                  </Button>
                </li>
              ) : (
                <li>
                  <Link href="/api/auth/signin">
                    <Button size="3">Login</Button>
                  </Link>
                </li>
              )}
            </ul>
            <div className="lg:hidden">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button>
                    <GiHamburgerMenu size="24" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  {links.map((link) => (
                    <DropdownMenu.Item key={link.href}>
                      <Link href={link.href} className="font-bold text-lg">
                        {link.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                  {isAuthenticated ? (
                    // <DropdownMenu.Item className="my-2">
                      <Link href="/api/auth/signout" >
                        <Button onClick={handleLogout} size="3" radius="large">Logout</Button>
                      </Link>
                    // </DropdownMenu.Item>
                  ) : (
                    // <DropdownMenu.Item className="my-2">
                      <Link href="/api/auth/signin">
                        <Button size="3" radius="large">Login</Button>
                      </Link>
                    // </DropdownMenu.Item>
                  )}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
