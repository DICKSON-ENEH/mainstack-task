import { Box, Flex, Text } from "@chakra-ui/react";
import { GrHomeRounded } from "react-icons/gr";
import Revenue from "../icons/Revenue";
import Crm from "../icons/Crm";

import Mainstack from "../icons/Mainstack";
import type { NavItem } from "../../utils/types/types";
import Analytics from "../icons/Analytics";
import Bell from "../icons/Bell";
import Message from "../icons/Message";
import ProfileMenu from "./ProfileMenu";
import AppsPopover from "./AppsPopover";

const Header = () => {
  const navItems: NavItem[] = [
    { name: "Home", icon: GrHomeRounded },
    { name: "Analytics", icon: Analytics },
    { name: "Revenue", icon: Revenue },
    { name: "CRM", icon: Crm },
  ];

  return (
    <Box
      w="100vw"
      bg="#fff"
      h="70px"
      position="fixed"
      zIndex="100"
      alignItems="center"
    >
      <Flex justifyContent="center" w="full">
        <Box
          bg="#fff"
          color="#56616B"
          h="64px"
          w="95%"
          borderRadius="30px"
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
          mt={3}
        >
          <Flex
            justifyContent="center"
            w="100%"
            alignItems="center"
            h="100%"
            fontFamily="Degular"
            fontWeight="500"
          >
            <Flex justifyContent="space-between" w="95%" alignItems="center">
              <Box>
                <Mainstack />
              </Box>
              <Box w="600px">
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {navItems.map(({ name, icon: Icon }, index) => (
                    <Box
                      key={index}
                      bg={`${name === "Revenue" ? "#000" : "#fff"} `}
                      color={`${name === "Revenue" ? "#fff" : "#000"} `}
                      p={2}
                      borderRadius="30px"
                      w="110px"
                      cursor="pointer"
                    >
                      <Flex alignItems="center" gap={2} justifyContent="center">
                        <Icon />
                        <Box>
                          <Text fontSize="14px">{name}</Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}

                  <AppsPopover />
                </Flex>
              </Box>

              <Box w="150px">
                <Flex justifyContent="space-between" alignItems="center">
                  <Box cursor="pointer">
                    <Bell />
                  </Box>
                  <Box cursor="pointer">
                    <Message />
                  </Box>
                  <Box>
                    <ProfileMenu />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
