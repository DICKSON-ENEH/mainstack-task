import { Box, Flex, Popover, Portal, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Apps from "../icons/Apps";
import AppsWhite from "../icons/AppsWhite";
import BioLink from "../icons/BioLink";
// import Store from "../icons/Store";
import MediaKit from "../icons/MediaKit";
import Invoicing from "../icons/Invoicing";
import Store from "../icons/store";

const AppsPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBioLinkHovered, _setIsBioLinkHovered] = useState(true);
  const [isStoreHovered] = useState(true);
  const [isMediaKitHovered] = useState(true);
  const [isInvoicingHovered] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const apps = [
    {
      name: "Link in Bio",
      description: "Manage your Link in Bio",
      icon: <BioLink isHovered={isBioLinkHovered} />,
    },
    {
      name: "Store",
      description: "Manage your Store activities",
      icon: <Store isHovered={isStoreHovered} />,
    },
    {
      name: "Media Kit",
      description: "Manage your Media Kit",
      icon: <MediaKit isHovered={isMediaKitHovered} />,
    },
    {
      name: "Invoicing",
      description: "Manage your Invoices",
      icon: <Invoicing isHovered={isInvoicingHovered} />,
    },
  ];

  return (
    <Popover.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Popover.Trigger asChild>
        <Flex
          align="center"
          cursor="pointer"
          h="40px"
          w={`${isOpen ? "190px" : ""}`}
          justifyContent="center"
          borderRadius="3xl"
          bg={isOpen ? "#131316" : "transparent"}
          color={isOpen ? "white" : "#131316"}
          _hover={{ bg: isOpen ? "#131316" : "#F5F5F5" }}
          transition="all 0.2s"
          fontSize="14px"
        >
          {isOpen ? <AppsWhite /> : <Apps />}

          <Text fontSize="14px" fontWeight="500" fontFamily="Degular" ml={2}>
            Apps
          </Text>
          {isOpen && (
            <Box ml={2} borderLeft="1px solid #202329">
              <Flex>
                <Text ml={2}>Link in Bio</Text>
                <MdKeyboardArrowDown
                  size={18}
                  style={{
                    marginLeft: 4,
                    marginTop: 2,
                  }}
                />
              </Flex>
            </Box>
          )}
        </Flex>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            width="380px"
            borderRadius="12px"
            bg="white"
            boxShadow="0 4px 20px rgba(0,0,0,0.1)"
            border="1px solid #E5E7EB"
            p={0}
            marginTop="30px"
            marginLeft="200px"
            overflow="hidden"
          >
            <Popover.Body p={2}>
              <VStack align="stretch">
                {apps.map((app, index) => (
                  <Flex
                    key={index}
                    align="center"
                    justify="space-between"
                    p={3}
                    borderRadius="8px"
                    cursor="pointer"
                    position="relative"
                    transition="all 0.2s ease"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    fontFamily="Degular"
                    borderWidth="1px"
                    borderColor="transparent"
                    _hover={{
                      bg: "#F9FAFB",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                      borderColor: "#ffffff0",
                    }}
                  >
                    <Flex align="center" gap={3} flex={1}>
                      <Flex
                        w="40px"
                        h="40px"
                        borderRadius="8px"
                        align="center"
                        justify="center"
                        fontFamily="Degular"
                        fontSize="20px"
                        borderWidth="1px"
                        borderColor="#E5E7EB"
                        boxShadow="0 4px 12px rgba(0, 0, 0, 0.06)"
                      >
                        {app.icon}
                      </Flex>

                      <Box>
                        <Text
                          fontSize="14px"
                          fontWeight="600"
                          color="#131316"
                          mb={0.5}
                        >
                          {app.name}
                        </Text>
                        <Text fontSize="12px" color="#6B7280" lineHeight="1.3">
                          {app.description}
                        </Text>
                      </Box>
                    </Flex>

                    <Box
                      opacity={hoveredIndex === index ? 1 : 0}
                      transform={
                        hoveredIndex === index
                          ? "translateX(0)"
                          : "translateX(-4px)"
                      }
                      transition="all 0.2s ease"
                    >
                      <FiChevronRight size={16} color="#9CA3AF" />
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default AppsPopover;
