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
import { useCallback, useEffect, useState } from "react";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
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
        : "Não foi possivel carregar os grupo musculares";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function fetchExerciseByGroup() {
    try {
      const responde = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(responde.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel carregar os exercícios";

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

  useEffect(
    useCallback(() => {
      fetchExerciseByGroup();
    }, [groupSelected])
  );

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
