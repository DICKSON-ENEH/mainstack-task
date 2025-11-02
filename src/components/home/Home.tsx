import { Box, VStack } from "@chakra-ui/react";

import Header from "./Header";
import HeroSection from "./HeroSection";
import Transactions from "./Transactions";

const Home = () => {
  return (
    <Box
      bg="#FFFFFF"
      w="100vw"
      minH="100vh"
      m={0}
      p={0}
      // overflow="hidden"
      // maxW="1440px"
      // mx="auto"
    >
      {/* <Flex justifyContent="center" direction="column" alignItems={"center"}> */}
      <VStack>
        <Header />
        <HeroSection />
        <Transactions />
      </VStack>

      {/* </Flex> */}
    </Box>
  );
};

export default Home;
