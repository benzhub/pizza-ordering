"use client";
import { useAppSelector } from "@/lib/hooks";
import { Button, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPizzaSlice } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const user = useAppSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const currentPath = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
    { label: "Orders", href: "/order" },
  ];

  useEffect(() => {
    setUsername(user.username);
  }, [user.username]);

  return (
    <nav className="bg-[var(--tomato-a10)] p-4">
      <Container>
        <Flex justify="between">
          <Link href="/" className="flex items-center gap-4">
            <FaPizzaSlice size="32" />
            {username && <Text weight="bold">Hi, {username}</Text>}
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
