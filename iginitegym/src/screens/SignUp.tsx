import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { api } from "@services/api";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Infome a senha.")
    .min(6, "A senha deve ter pelo menos 6 digitos."),

  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password"), null], "A confirmação da senha não confere"),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { singIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) as any });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp(data: FormDataProps) {
    try {
      setIsLoading(true);

      await api.post("/users", { ...data });
      await singIn(data.email, data.password);
    } catch (error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel criar a conta. Tente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }

    /*const response = await fetch("http://192.168.3.11:3333/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    const result = await response.json();
    console.log(result);*/
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          mt={12}
          title="Volta para o login"
          variant="outline"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
