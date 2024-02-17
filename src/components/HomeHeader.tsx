import { HStack, Heading, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{ uri: "https://avatars.githubusercontent.com/u/32522338?v=4" }}
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />

      <VStack>
        <Text color="gray.100">Olá,</Text>

        <Heading color="gray.100">Diego</Heading>
      </VStack>
    </HStack>
  );
}
