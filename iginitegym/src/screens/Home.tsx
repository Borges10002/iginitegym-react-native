import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  HStack,
  Heading,
  Text,
  Toast,
  VStack,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState([
    "Puxada fontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamentos terras",
  ]);

  const [groupSelected, setGroupSelected] = useState("costa");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  async function fetchGroups() {
    try {
      const responde = await api.get("/groups");
      setGroups(responde.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel carregar os grupo nesse momento";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              String(groupSelected).toLocaleUpperCase() ===
              String(item).toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercicios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
