import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Feather } from "@expo/vector-icons";

import BodySvg from "@assets/body.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import { Button } from "@components/Button";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Contas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXR_uYpe56xVLueXC-p6GlnxfX6k9GOU5JQA&usqp=CAU",
            }}
            alt="Nome do exercicios"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  3 Séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar com realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
