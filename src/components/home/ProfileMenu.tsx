import { Box, Flex, HStack, Portal, Text, VStack } from "@chakra-ui/react";
import { Popover } from "@chakra-ui/react";

import ProfileAvatar from "../icons/ProfileAvatar";
import { FiSettings } from "react-icons/fi";
import {
  MdOutlineCardGiftcard,
  MdOutlineReceiptLong,
  MdOutlineSwitchAccount,
} from "react-icons/md";
import Apps from "../icons/Apps";
import { GrBug } from "react-icons/gr";
import { PiSignOut } from "react-icons/pi";
import { useApi } from "../../utils/types/hooks/useApi";

const ProfileMenu = () => {
  const { useUser } = useApi();
  const { data: user } = useUser();
  return (
    <Box cursor="pointer" fontFamily="Degular">
      <Popover.Root>
        <Popover.Trigger asChild>
          <Box>
            <ProfileAvatar />
          </Box>
        </Popover.Trigger>

        <Portal>
          <Popover.Positioner>
            <Popover.Content
              width="350px"
              height="470px"
              overflow="auto"
              mt={5}
              color={"#000"}
              bg="white"
              mr={20}
              boxShadow="0 2px 8px rgba(0,0,0,0.08)"
              borderRadius="15px"
              border="none"
            >
              <Popover.Body>
                <Box p={3}>
                  <Flex alignItems="center">
                    <Box
                      w="40px"
                      h="40px"
                      bgGradient="linear(to-br, #4a5568, #1a202c)"
                      borderRadius={"100%"}
                      textAlign="center"
                      alignItems="center"
                      color="white"
                      bg="black"
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        h={"100%"}
                      >
                        <Text fontFamily="Degular">
                          {user?.first_name?.charAt(0)}
                          {user?.last_name?.charAt(0)}
                        </Text>
                      </Flex>
                    </Box>
                    <Box ml={2} fontFamily="Degular">
                      <Box fontWeight="semibold" fontSize={"16px"}>
                        {user?.first_name} {user?.last_name}
                      </Box>
                      <Box>{user?.email}</Box>
                    </Box>
                  </Flex>
                </Box>
                <VStack align="stretch" fontFamily="Degular" fontWeight="500">
                  <Box p={3}>
                    <HStack>
                      {" "}
                      <FiSettings />
                      <Text> Settings</Text>
                    </HStack>
                  </Box>
                  <Box p={3}>
                    <HStack>
                      <MdOutlineReceiptLong />

                      <Text>Purchase History</Text>
                    </HStack>
                  </Box>
                  <Box p={3}>
                    <HStack>
                      <MdOutlineCardGiftcard />

                      <Text>Refer and Earn</Text>
                    </HStack>
                  </Box>
                  <Box p={3}>
                    <HStack>
                      <Apps />
                      <Text>Integrations</Text>
                    </HStack>
                  </Box>
                  <Box p={3}>
                    <HStack>
                      <GrBug />
                      <Text>Report Bug</Text>
                    </HStack>
                  </Box>
                  <Box p={3}>
                    <HStack>
                      <MdOutlineSwitchAccount />
                      <Text>Switch Account</Text>
                    </HStack>
                  </Box>
                  <Box p={3}>
                    <HStack>
                      <PiSignOut />
                      <Text>Sign Out</Text>
                    </HStack>
                  </Box>
                </VStack>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Box>
  );
};

export default ProfileMenu;
