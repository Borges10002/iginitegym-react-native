import { Center, ScrollView, Skeleton, VStack } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";

const PHOTO_SIZE = 33;

export function Profile() {
  const [phtoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          {phtoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: "https://github.com/Borges10002.png" }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
        </Center>
      </ScrollView>
    </VStack>
  );
}
