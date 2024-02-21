import { Container, Heading } from "@radix-ui/themes";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[var(--red-a10)] p-4">
      <Container>
        <Heading as="h4">Footer</Heading>
      </Container>
    </div>
  );
};

export default Footer;
