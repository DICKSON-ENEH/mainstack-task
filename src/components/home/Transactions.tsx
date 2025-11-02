import { Box, Flex, HStack, Popover, Text, VStack } from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbDownload } from "react-icons/tb";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useMemo } from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dates/styles.css";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { Checkbox } from "@chakra-ui/react";
import { Calendar } from "@mantine/dates";
import { useApi } from "../../utils/types/hooks/useApi";

const Transactions = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { useTransactions } = useApi();

  const { data: transactions } = useTransactions();

  const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>([
    "Store Transactions",
  ]);
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState<string[]>([
    "Successful",
    "Pending",
    "Failed",
  ]);
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(
    undefined
  );
  console.log(tempStartDate);
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(undefined);
  console.log(tempEndDate);
  const [tempSelectedFilter, setTempSelectedFilter] = useState<string>("");
  const [appliedSelectedTypes, setAppliedSelectedTypes] = useState<string[]>([
    "Store Transactions",
  ]);
  const [appliedSelectedStatuses, setAppliedSelectedStatuses] = useState<
    string[]
  >(["Successful", "Pending", "Failed"]);
  const [appliedStartDate, setAppliedStartDate] = useState<Date | undefined>(
    undefined
  );
  const [appliedEndDate, setAppliedEndDate] = useState<Date | undefined>(
    undefined
  );

  const transactionTypes = [
    "Store Transactions",
    "Get Tipped",
    "Withdrawals",
    "Chargebacks",
    "Cashbacks",
    "Refer & Earn",
  ];
  const transactionStatuses = ["Successful", "Pending", "Failed"];

  const handleTypeChange = (type: string) => {
    setTempSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleStatusChange = (status: string) => {
    setTempSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  const getTypeDisplayText = () => {
    if (tempSelectedTypes.length === 0) return "Select transaction types";
    if (tempSelectedTypes.length === transactionTypes.length)
      return "All transaction types";
    return tempSelectedTypes.join(", ");
  };

  const getStatusDisplayText = () => {
    if (tempSelectedStatuses.length === 0) return "Select transaction status";
    if (tempSelectedStatuses.length === transactionStatuses.length)
      return "All statuses";
    return tempSelectedStatuses.join(", ");
  };

  const handleClear = () => {
    setTempSelectedFilter("");
    setTempSelectedTypes([]);
    setTempSelectedStatuses([]);
    setTempStartDate(undefined);
    setTempEndDate(undefined);
  };

  const handleApply = () => {
    setAppliedSelectedTypes(tempSelectedTypes);
    setAppliedSelectedStatuses(tempSelectedStatuses);
    setAppliedStartDate(tempStartDate);
    setAppliedEndDate(tempEndDate);
    setSelectedFilter(tempSelectedFilter);

    setIsDrawerOpen(false);
  };

  const handleQuickFilter = (filter: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case "Today": {
        setTempStartDate(today);
        setTempEndDate(today);
        break;
      }
      case "Last 7 days": {
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        setTempStartDate(last7Days);
        setTempEndDate(today);
        break;
      }
      case "This month": {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setTempStartDate(startOfMonth);
        setTempEndDate(today);
        break;
      }
      case "Last 3 months": {
        const last3Months = new Date(today);
        last3Months.setMonth(today.getMonth() - 3);
        setTempStartDate(last3Months);
        setTempEndDate(today);
        break;
      }
    }
    setTempSelectedFilter(filter);
  };

  const getDataTypeFromUI = (uiType: string): string | null => {
    const mapping: Record<string, string> = {
      "Store Transactions": "deposit",
      Withdrawals: "withdrawal",
    };
    return mapping[uiType] || null;
  };

  const getDataStatusFromUI = (uiStatus: string): string => {
    return uiStatus.toLowerCase();
  };

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    return transactions.filter((transaction) => {
      if (
        appliedSelectedTypes.length > 0 &&
        appliedSelectedTypes.length < transactionTypes.length
      ) {
        const matchesType = appliedSelectedTypes.some((type) => {
          const dataType = getDataTypeFromUI(type);
          return dataType && transaction.type === dataType;
        });
        if (!matchesType) return false;
      }

      if (
        appliedSelectedStatuses.length > 0 &&
        appliedSelectedStatuses.length < transactionStatuses.length
      ) {
        const matchesStatus = appliedSelectedStatuses.some((status) => {
          return transaction.status === getDataStatusFromUI(status);
        });
        if (!matchesStatus) return false;
      }

      if (appliedStartDate || appliedEndDate) {
        const transactionDate = new Date(transaction.date);
        transactionDate.setHours(0, 0, 0, 0);

        if (appliedStartDate) {
          const start = new Date(appliedStartDate);
          start.setHours(0, 0, 0, 0);
          if (transactionDate < start) return false;
        }

        if (appliedEndDate) {
          const end = new Date(appliedEndDate);
          end.setHours(0, 0, 0, 0);
          if (transactionDate > end) return false;
        }
      }

      return true;
    });
  }, [
    transactions,
    appliedSelectedTypes,
    appliedSelectedStatuses,
    appliedStartDate,
    appliedEndDate,
    transactionStatuses.length,
    transactionTypes.length,
  ]);
  const handleManualDateChange = (date: Date, type: "start" | "end") => {
    if (type === "start") {
      setTempStartDate(date);
    } else {
      setTempEndDate(date);
    }

    const updatedStartDate = type === "start" ? date : tempStartDate;
    const updatedEndDate = type === "end" ? date : tempEndDate;

    if (updatedStartDate && updatedEndDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const startDate = new Date(updatedStartDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(updatedEndDate);
      endDate.setHours(0, 0, 0, 0);

      if (
        startDate.getTime() === today.getTime() &&
        endDate.getTime() === today.getTime()
      ) {
        setTempSelectedFilter("Today");
        return;
      }

      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 7);
      last7Days.setHours(0, 0, 0, 0);
      if (
        startDate.getTime() === last7Days.getTime() &&
        endDate.getTime() === today.getTime()
      ) {
        setTempSelectedFilter("Last 7 days");
        return;
      }

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0);
      if (
        startDate.getTime() === startOfMonth.getTime() &&
        endDate.getTime() === today.getTime()
      ) {
        setTempSelectedFilter("This month");
        return;
      }

      const last3Months = new Date(today);
      last3Months.setMonth(today.getMonth() - 3);
      last3Months.setHours(0, 0, 0, 0);
      if (
        startDate.getTime() === last3Months.getTime() &&
        endDate.getTime() === today.getTime()
      ) {
        setTempSelectedFilter("Last 3 months");
        return;
      }

      const customLabel = `${startDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })} - ${endDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}`;
      setTempSelectedFilter(customLabel);
    }
  };

  return (
    <Box color={"#000"} mt={6} w="85%" fontFamily="Degular">
      <Box>
        <Flex justifyContent="space-between">
          <Box lineHeight={"25px"}>
            <Box>
              <Text fontSize="24px" fontWeight="700">
                {filteredTransactions?.length} Transactions
              </Text>
            </Box>
            <Box>
              <Text color={"#56616B"}>
                Your Transaction for the last 7 days
              </Text>
            </Box>
          </Box>
          <Box w="280px">
            <Flex justifyContent="space-between">
              {/* <Button bg={"#EFF1F6"} borderRadius="3xl" color="#131316"> */}
              <Drawer.Root
                open={isDrawerOpen}
                onOpenChange={(e) => setIsDrawerOpen(e.open)}
              >
                <Drawer.Trigger asChild>
                  <Button
                    bg={"#EFF1F6"}
                    borderRadius="3xl"
                    color="#131316"
                    w="130px"
                    h="50px"
                  >
                    <Text fontFamily="Degular" fontWeight="500">
                      Filter
                    </Text>
                    <MdKeyboardArrowDown />
                  </Button>
                </Drawer.Trigger>
                <Portal>
                  <Drawer.Backdrop />
                  <Drawer.Positioner padding="4">
                    <Drawer.Content
                      rounded="2xl"
                      w="550px"
                      maxW="1000px"
                      bg="white"
                      color="#000"
                    >
                      <Drawer.Header>
                        <Drawer.Title>Filter</Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body>
                        <Box w="full">
                          <HStack mb={5} w="full">
                            {[
                              "Today",
                              "Last 7 days",
                              "This month",
                              "Last 3 months",
                            ].map((label) => (
                              <Button
                                key={label}
                                variant="outline"
                                borderRadius="full"
                                borderColor="#E6E8EB"
                                color={
                                  tempSelectedFilter === label
                                    ? "white"
                                    : "#131316"
                                }
                                fontWeight="500"
                                fontFamily="Degular"
                                w="120px"
                                fontSize="12px"
                                px={5}
                                bg={
                                  tempSelectedFilter === label
                                    ? "#131316"
                                    : "white"
                                }
                                _hover={{
                                  bg:
                                    tempSelectedFilter === label
                                      ? "#2a2a2a"
                                      : "#F9FAFB",
                                }}
                                onClick={() => handleQuickFilter(label)}
                              >
                                {label}
                              </Button>
                            ))}
                          </HStack>
                        </Box>

                        <Box
                          mt={8}
                          fontWeight="550"
                          fontFamily="Degular"
                          mb="10px"
                        >
                          Date Range
                        </Box>
                        <HStack w="500px">
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Popover.Root
                              open={isStartCalendarOpen}
                              onOpenChange={(details) =>
                                setIsStartCalendarOpen(details.open)
                              }
                            >
                              <Popover.Trigger asChild>
                                <Box
                                  borderRadius="12px"
                                  p={4}
                                  cursor="pointer"
                                  w="250px"
                                  bg="#EFF1F6"
                                  _hover={{ bg: "#F5F5F5" }}
                                  onClick={() =>
                                    setIsStartCalendarOpen(!isStartCalendarOpen)
                                  }
                                >
                                  <Flex justify="space-between" align="center">
                                    <Text
                                      fontSize="14px"
                                      fontWeight="500"
                                      color="#131316"
                                      overflow="hidden"
                                      textOverflow="ellipsis"
                                      whiteSpace="nowrap"
                                      fontFamily="Degular"
                                      flex={1}
                                    >
                                      {tempStartDate
                                        ? tempStartDate.toLocaleDateString(
                                            "en-GB",
                                            {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            }
                                          )
                                        : "Select Start Date"}
                                    </Text>
                                    {isStartCalendarOpen ? (
                                      <LuChevronUp size={20} />
                                    ) : (
                                      <LuChevronDown size={20} />
                                    )}
                                  </Flex>
                                </Box>
                              </Popover.Trigger>

                              <Portal>
                                <Popover.Positioner>
                                  <Popover.Content
                                    width="300px"
                                    borderRadius="12px"
                                    bg="white"
                                    ml={12}
                                    boxShadow="0 4px 12px rgba(0,0,0,0.1)"
                                    p={3}
                                  >
                                    <VStack align="stretch">
                                      <Calendar
                                        getDayProps={(date) => ({
                                          selected:
                                            tempStartDate?.toDateString() ===
                                            new Date(date).toDateString(),
                                          onClick: () => {
                                            console.log(
                                              "Start date clicked:",
                                              date
                                            );
                                            const newDate = new Date(date);
                                            handleManualDateChange(
                                              newDate,
                                              "start"
                                            );
                                            setIsStartCalendarOpen(false);
                                          },
                                        })}
                                        styles={{
                                          day: {
                                            borderRadius: "8px",
                                            color: "#131316",
                                            "&[data-selected]": {
                                              backgroundColor: "#131316",
                                              color: "white",
                                            },
                                          },
                                          month: {
                                            fontFamily: "Degular",
                                          },
                                          calendarHeader: {
                                            fontFamily: "Degular",
                                          },
                                        }}
                                        weekendDays={[]}
                                      />
                                    </VStack>
                                  </Popover.Content>
                                </Popover.Positioner>
                              </Portal>
                            </Popover.Root>
                          </Flex>

                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Popover.Root
                              open={isEndCalendarOpen}
                              onOpenChange={(details) =>
                                setIsEndCalendarOpen(details.open)
                              }
                            >
                              <Popover.Trigger asChild>
                                <Box
                                  borderRadius="12px"
                                  p={4}
                                  cursor="pointer"
                                  bg="#EFF1F6"
                                  w="250px"
                                  _hover={{ bg: "#F5F5F5" }}
                                  onClick={() =>
                                    setIsEndCalendarOpen(!isEndCalendarOpen)
                                  }
                                >
                                  <Flex justify="space-between" align="center">
                                    <Text
                                      fontSize="14px"
                                      fontWeight="500"
                                      color="#131316"
                                      overflow="hidden"
                                      textOverflow="ellipsis"
                                      whiteSpace="nowrap"
                                      fontFamily="Degular"
                                      flex={1}
                                    >
                                      {tempEndDate
                                        ? tempEndDate.toLocaleDateString(
                                            "en-GB",
                                            {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            }
                                          )
                                        : "Select End Date"}
                                    </Text>
                                    {isEndCalendarOpen ? (
                                      <LuChevronUp size={20} />
                                    ) : (
                                      <LuChevronDown size={20} />
                                    )}
                                  </Flex>
                                </Box>
                              </Popover.Trigger>

                              <Portal>
                                <Popover.Positioner>
                                  <Popover.Content
                                    width="300px"
                                    borderRadius="12px"
                                    bg="white"
                                    boxShadow="0 4px 12px rgba(0,0,0,0.1)"
                                    p={3}
                                    mr={6}
                                  >
                                    <VStack align="center" w={"100%"}>
                                      <Calendar
                                        getDayProps={(date) => ({
                                          selected:
                                            tempEndDate?.toDateString() ===
                                            new Date(date).toDateString(),
                                          onClick: () => {
                                            console.log(
                                              "End date clicked:",
                                              date
                                            );
                                            const newDate = new Date(date);
                                            handleManualDateChange(
                                              newDate,
                                              "end"
                                            );
                                            setIsEndCalendarOpen(false);
                                          },
                                        })}
                                        styles={{
                                          day: {
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            color: "#131316 !important",
                                            "&[data-selected]": {
                                              backgroundColor: "#000",
                                              color: "white !important",
                                            },
                                            "&[data-weekend]": {
                                              color: "#131316 !important",
                                            },
                                          },
                                          month: {
                                            fontFamily: "Degular",
                                          },
                                          calendarHeader: {
                                            fontFamily: "Degular",
                                          },
                                          weekday: {
                                            color: "#131316",
                                          },
                                        }}
                                        weekendDays={[]}
                                      />
                                    </VStack>
                                  </Popover.Content>
                                </Popover.Positioner>
                              </Portal>
                            </Popover.Root>
                          </Flex>
                        </HStack>

                        <Box w="100%" mt={"30px"}>
                          <Text
                            fontSize="16px"
                            fontWeight="600"
                            mb={3}
                            fontFamily="Degular"
                          >
                            Transaction Type
                          </Text>

                          <Popover.Root
                            open={isTypeOpen}
                            onOpenChange={(details) =>
                              setIsTypeOpen(details.open)
                            }
                          >
                            <Popover.Trigger asChild>
                              <Box
                                borderRadius="12px"
                                p={4}
                                cursor="pointer"
                                bg="#EFF1F6"
                                _hover={{ bg: "#F5F5F5" }}
                                onClick={() => setIsTypeOpen(!isTypeOpen)}
                              >
                                <Flex justify="space-between" align="center">
                                  <Text
                                    fontSize="14px"
                                    fontWeight="500"
                                    color="#131316"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                    fontFamily="Degular"
                                    flex={1}
                                  >
                                    {getTypeDisplayText()}
                                  </Text>
                                  {isTypeOpen ? (
                                    <LuChevronUp size={20} />
                                  ) : (
                                    <LuChevronDown size={20} />
                                  )}
                                </Flex>
                              </Box>
                            </Popover.Trigger>

                            <Portal>
                              <Popover.Positioner>
                                <Popover.Content
                                  width="500px"
                                  borderRadius="12px"
                                  bg="white"
                                  boxShadow="0 4px 12px rgba(0,0,0,0.1)"
                                  p={0}
                                >
                                  <VStack align="stretch" p={4}>
                                    {transactionTypes.map((type) => (
                                      <Box
                                        key={type}
                                        p="5px"
                                        _hover={{ bg: "#F9FAFB" }}
                                        fontSize="12px"
                                        cursor="pointer"
                                        ml={2}
                                        fontFamily={"Degular"}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleTypeChange(type);
                                        }}
                                      >
                                        <Checkbox.Root
                                          checked={tempSelectedTypes.includes(
                                            type
                                          )}
                                          onCheckedChange={() =>
                                            handleTypeChange(type)
                                          }
                                          size="sm"
                                          borderRadius="2xl"
                                        >
                                          <Checkbox.Control
                                            bg={
                                              tempSelectedTypes.includes(type)
                                                ? "#131316"
                                                : "white"
                                            }
                                            borderColor={
                                              tempSelectedTypes.includes(type)
                                                ? "#131316"
                                                : "#E6E8EB"
                                            }
                                            borderWidth="2px"
                                            _checked={{
                                              bg: "#131316",
                                              borderColor: "#131316",
                                            }}
                                          >
                                            <Checkbox.Indicator
                                              color={"#fff"}
                                            />
                                          </Checkbox.Control>
                                          <Checkbox.Label>
                                            <Text
                                              fontSize="15px"
                                              fontWeight="500"
                                              color="#131316"
                                              fontFamily="Degular"
                                              ml={2}
                                            >
                                              {type}
                                            </Text>
                                          </Checkbox.Label>
                                        </Checkbox.Root>
                                      </Box>
                                    ))}
                                  </VStack>
                                </Popover.Content>
                              </Popover.Positioner>
                            </Portal>
                          </Popover.Root>
                        </Box>

                        <Box mt={4} w="100%">
                          <Text
                            fontSize="16px"
                            fontWeight="600"
                            mb={3}
                            fontFamily="Degular"
                          >
                            Transaction Status
                          </Text>

                          <Popover.Root
                            open={isStatusOpen}
                            onOpenChange={(details) =>
                              setIsStatusOpen(details.open)
                            }
                          >
                            <Popover.Trigger asChild>
                              <Box
                                borderRadius="12px"
                                p={4}
                                cursor="pointer"
                                bg="#EFF1F6"
                                _hover={{ bg: "#F9FAFB" }}
                                onClick={() => setIsStatusOpen(!isStatusOpen)}
                              >
                                <Flex justify="space-between" align="center">
                                  <Text
                                    fontSize="14px"
                                    fontWeight="500"
                                    color="#131316"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                    fontFamily="Degular"
                                    flex={1}
                                  >
                                    {getStatusDisplayText()}
                                  </Text>
                                  {isStatusOpen ? (
                                    <LuChevronUp size={20} />
                                  ) : (
                                    <LuChevronDown size={20} />
                                  )}
                                </Flex>
                              </Box>
                            </Popover.Trigger>

                            <Portal>
                              <Popover.Positioner>
                                <Popover.Content
                                  width="500px"
                                  borderRadius="12px"
                                  bg="white"
                                  boxShadow="0 4px 12px rgba(0,0,0,0.1)"
                                  p={0}
                                >
                                  <VStack align="stretch" p={4}>
                                    {transactionStatuses.map((status) => (
                                      <Box
                                        key={status}
                                        p="5px"
                                        _hover={{ bg: "#F9FAFB" }}
                                        cursor="pointer"
                                        fontSize="12px"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleStatusChange(status);
                                        }}
                                      >
                                        <Checkbox.Root
                                          checked={tempSelectedStatuses.includes(
                                            status
                                          )}
                                          onCheckedChange={() =>
                                            handleStatusChange(status)
                                          }
                                          size="sm"
                                          borderRadius="2xl"
                                        >
                                          <Checkbox.Control
                                            bg={
                                              tempSelectedStatuses.includes(
                                                status
                                              )
                                                ? "#131316"
                                                : "white"
                                            }
                                            borderColor={
                                              tempSelectedStatuses.includes(
                                                status
                                              )
                                                ? "#131316"
                                                : "#E6E8EB"
                                            }
                                            borderWidth="2px"
                                            _checked={{
                                              bg: "#131316",
                                              borderColor: "#131316",
                                            }}
                                          >
                                            <Checkbox.Indicator
                                              color={"#fff"}
                                            />
                                          </Checkbox.Control>
                                          <Checkbox.Label>
                                            <Text
                                              fontSize="15px"
                                              fontWeight="500"
                                              color="#131316"
                                              fontFamily="Degular"
                                              ml={2}
                                            >
                                              {status}
                                            </Text>
                                          </Checkbox.Label>
                                        </Checkbox.Root>
                                      </Box>
                                    ))}
                                  </VStack>
                                </Popover.Content>
                              </Popover.Positioner>
                            </Portal>
                          </Popover.Root>
                        </Box>
                      </Drawer.Body>
                      <Drawer.Footer w="full">
                        <Flex justifyContent="space-between" w="full">
                          <Button
                            w="240px"
                            bg="white"
                            h="60px"
                            border="2px solid"
                            borderColor="#EFF1F6"
                            borderRadius="4xl"
                            fontFamily="Degular"
                            _hover={{ bg: "#F9FAFB" }}
                            onClick={handleClear}
                          >
                            Clear
                          </Button>
                          {/* <Drawer.CloseTrigger asChild> */}
                          <Button
                            w="240px"
                            bg="black"
                            h="60px"
                            borderRadius="4xl"
                            fontFamily="Degular"
                            color="#fff"
                            _hover={{ bg: "#2a2a2a" }}
                            onClick={handleApply}
                          >
                            Apply
                          </Button>
                          {/* </Drawer.CloseTrigger>÷ */}
                        </Flex>
                      </Drawer.Footer>
                      <Drawer.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Drawer.CloseTrigger>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              </Drawer.Root>
              {/* </Button> */}
              <Button
                bg={"#EFF1F6"}
                borderRadius="3xl"
                color="#131316"
                w="130px"
                h="50px"
              >
                <Text fontFamily="Degular" fontWeight="500">
                  Export list
                </Text>
                <TbDownload />
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box h="2px" bg="#EFF1F6" mt="20px">
        {""}
      </Box>
      <Box mt="30px">
        {filteredTransactions && filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <Box key={transaction.payment_reference || index} mb="20px">
              <Flex justifyContent="space-between">
                <Box>
                  <Flex>
                    <Box
                      w="50px"
                      h="50px"
                      bg={
                        transaction.type === "deposit" ? "#E3FCF2" : "#FFE5E5"
                      }
                      borderRadius="full"
                    >
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        h="full"
                      >
                        {transaction.type === "deposit" ? (
                          <GoArrowDownLeft color="#075132" />
                        ) : (
                          <GoArrowUpRight color="#8B0000" />
                        )}
                      </Flex>
                    </Box>
                    <Box ml="10px">
                      <Box
                        color="#131316"
                        fontWeight="500"
                        fontFamily="Degular"
                      >
                        {transaction.metadata?.product_name ||
                          (transaction.type === "withdrawal"
                            ? "Cash Withdrawal"
                            : "Transaction")}
                      </Box>
                      <Box
                        fontFamily="Degular"
                        color={`${
                          transaction?.type === "withdrawal"
                            ? "#0EA163"
                            : transaction.metadata?.product_name
                            ? "#56616B"
                            : "#A77A07"
                        }`}
                      >
                        {transaction.metadata?.name ||
                          (transaction.type === "withdrawal"
                            ? transaction.status
                            : "N/A")}
                      </Box>
                    </Box>
                  </Flex>
                </Box>
                <VStack align="left" w="120px">
                  <Box fontWeight="bold">
                    USD {transaction.amount.toFixed(2)}
                  </Box>
                  <Box color="#56616B">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </Box>
                </VStack>
              </Flex>
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={10}>
            <Text
              fontSize="18px"
              fontWeight="600"
              color="#56616B"
              fontFamily="Degular"
            >
              No transactions found
            </Text>
            <Text fontSize="14px" color="#8B92A3" fontFamily="Degular" mt={2}>
              Try adjusting your filters to see more results
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Transactions;
