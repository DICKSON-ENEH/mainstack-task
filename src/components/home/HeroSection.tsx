import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import type { iBal } from "../../utils/types/types";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  // YAxis,
  ResponsiveContainer,
} from "recharts";
import Alert from "../icons/Alert";
import { useApi } from "../../utils/types/hooks/useApi";
import { useMemo, useState } from "react";
import BioLink from "../icons/BioLink";
import Store from "../icons/store";
import MediaKit from "../icons/MediaKit";
import Invoicing from "../icons/Invoicing";
// import { useStateHistory } from "@mantine/hooks";

const HeroSection = () => {
  const { useWallet, useTransactions } = useApi();
  const { data: wallet } = useWallet();
  const { data: transactions } = useTransactions();
  const [isBioLinkHovered, setIsBioLinkHovered] = useState(false);
  const [isStoreHovered, setIsStoreHovered] = useState(false);
  const [isMediaKitHovered, setIsMediaKitHovered] = useState(false);
  const [isInvoicingHovered, setIsInvoicingHovered] = useState(false);

  const items: iBal[] = [
    {
      name: "Ledger Balance",
      amount: wallet?.ledger_balance ?? 0,
    },
    {
      name: "Total Payout",
      amount: wallet?.total_payout ?? 0,
    },
    {
      name: "Total Revenue",
      amount: wallet?.total_revenue ?? 0,
    },
    {
      name: "Pending Payout",
      amount: wallet?.pending_payout ?? 0,
    },
  ];

  const chartData = useMemo(() => {
    if (!transactions) return [];

    const dailyTotals = transactions.reduce((acc, transaction) => {
      const amount =
        transaction.type === "deposit"
          ? transaction.amount
          : -transaction.amount;
      acc[transaction.date] = (acc[transaction.date] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

    let balance = 0;

    return Object.entries(dailyTotals)
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateA).getTime() - new Date(dateB).getTime()
      )
      .map(([date, dailyAmount]) => {
        balance += dailyAmount;

        return {
          date: new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          }),
          value: balance,
        };
      });
  }, [transactions]);

  return (
    <Box
      w="85%"
      mt="100px"
      color="black"
      h="500px"
      fontFamily="Degular"
      position="relative"
    >
      <Box
        h="180px"
        bg="#fff"
        w="45px"
        boxShadow="0 4px 12px rgba(0,0,0,0.1)"
        position="fixed"
        left={10}
        bottom={300}
        borderRadius="3xl"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          h="100%"
          flexDirection="column"
          gap="10px"
        >
          <Box
            cursor="pointer"
            onMouseEnter={() => setIsBioLinkHovered(true)}
            onMouseLeave={() => setIsBioLinkHovered(false)}
          >
            <BioLink isHovered={isBioLinkHovered} />
          </Box>

          <Box
            cursor="pointer"
            onMouseEnter={() => setIsStoreHovered(true)}
            onMouseLeave={() => setIsStoreHovered(false)}
          >
            <Store isHovered={isStoreHovered} />
          </Box>

          <Box
            cursor="pointer"
            onMouseEnter={() => setIsMediaKitHovered(true)}
            onMouseLeave={() => setIsMediaKitHovered(false)}
          >
            <MediaKit isHovered={isMediaKitHovered} />
          </Box>

          <Box
            cursor="pointer"
            onMouseEnter={() => setIsInvoicingHovered(true)}
            onMouseLeave={() => setIsInvoicingHovered(false)}
            mt="5px"
          >
            <Invoicing isHovered={isInvoicingHovered} />
          </Box>
        </Flex>

        {/* <Invoicing /> */}
      </Box>

      <Flex justifyContent="center">
        <Box w="70%" h="300px">
          <Box w="530px" alignItems="center" ml={10} mb="50px">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <VStack align="left">
                  <Text color="#56616B" fontSize="14px">
                    Available Balance
                  </Text>
                  <Text fontSize="38px" fontWeight="bold">
                    USD {wallet?.balance}
                  </Text>
                </VStack>
              </Box>
              <Box ml="30px">
                <Button
                  bg="black"
                  w="200px"
                  h="55px"
                  borderRadius="30px"
                  color="white"
                  fontSize="16px"
                >
                  Withdraw
                </Button>
              </Box>
            </Flex>
          </Box>
          <ResponsiveContainer width="90%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 0, left: 0, bottom: 20 }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB", strokeWidth: 2 }}
                tick={{ fontSize: 12, fill: "#666" }}
                padding={{ left: 10, right: 10 }}
                interval="preserveStartEnd"
                minTickGap={0}
                dy={15}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [
                  `$${value.toFixed(2)}`,
                  "Balance",
                ]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FF5403"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box w="30%" h="300px">
          <VStack align="stretch">
            {items.map(({ name, amount }, index) => (
              <Box key={index} p={4}>
                <Box w="100%">
                  <Flex justifyContent="space-between">
                    <Text fontSize="14px" color="gray.600" mb="12px">
                      {name}
                    </Text>
                    <Alert />
                  </Flex>
                </Box>

                <Text color="#131316" fontSize="28px" fontWeight="700">
                  USD {amount}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default HeroSection;
