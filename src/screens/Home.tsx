import { HStack, VStack } from "native-base";
import { useState } from "react";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("costa");

  return (
    <VStack flex={1}>
      <HomeHeader />
      <HStack>
        <Group
          name="costa"
          isActive={groupSelected === "consta"}
          onPress={() => setGroupSelected("consta")}
        />
        <Group
          name="ombro"
          isActive={groupSelected === "ombro"}
          onPress={() => setGroupSelected("ombro")}
        />
      </HStack>
    </VStack>
  );
}
