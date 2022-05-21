import { Box, Button, Center, FormControl, Input, Stack, WarningOutlineIcon, Alert, Text, View, VStack, HStack, IconButton, CloseIcon } from "native-base";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { makeLogin } from "../util/Utils.js";
import LogoComp from "./LogoComp.js";


export default function LoginForm({ navigation, routes }) {
    const [email, setEmail] = useState("spellzito@oleirosoftware.com.br");
    const [passwd, setPasswd] = useState("1aA9!ss");
    const [erro, setErro] = useState("");
    const [showErro, setShowErro] = useState(false);
    // const [error] = routes.params;

    const login = () => {
        makeLogin(email, passwd, navigation).then(({ token, id, radius, nickname }) => {
            navigation.navigate('Home', { token, id, radius, nickname })
        }).catch(erro => {
            console.log(erro)
            setErro(erro)
            setShowErro(true)
            // <Alert w="100%" status="error" />;
        });
    };

    return (
        <SafeAreaProvider>
            <Center flex={2} bg="#101938">
                <Box w={{ base: "100%" }}>
                    <LogoComp />
                    <FormControl >
                        <Stack mx="4" bg="#cffafe" p={10} borderRadius={11}>
                            <Center _text={{ fontWeight: "bold" }}>E-mail!</Center>
                            <Input
                                type="email"
                                defaultValue={email}
                                placeholder="email"
                                onChangeText={(value) => setEmail(value)}
                            />
                            <Center _text={{ fontWeight: "bold" }}>Senha</Center>
                            <Input
                                type="password"
                                defaultValue={passwd}
                                placeholder="password"
                                onChangeText={(value) => setPasswd(value)}
                            />
                            <FormControl.HelperText>
                                {/* TODO -> Colocar o padrão de senha */}
                            </FormControl.HelperText>

                            <Button
                                onPress={login}
                            >
                                Enviar
                            </Button>

                            <FormControl.ErrorMessage
                                leftIcon={<WarningOutlineIcon size="xs" />}>
                                Atleast 6 characters are required.
                            </FormControl.ErrorMessage>

                            {showErro &&
                                <Alert w="100%" status="error" my="4">
                                    <VStack space={2} flexShrink={1} w="100%">
                                        <HStack flexShrink={1} space={2} justifyContent="space-between">
                                            <HStack space={2} flexShrink={1}>
                                                <Alert.Icon mt="1" />
                                                <Text fontSize="md" color="coolGray.800">
                                                    {erro}
                                                </Text>
                                            </HStack>
                                            <IconButton variant="unstyled" onPress={() => setShowErro(false)} _focus={{
                                                borderWidth: 0
                                            }} icon={<CloseIcon size="3" color="coolGray.600" />} />
                                        </HStack>
                                    </VStack>
                                </Alert>
                            }
                        </Stack>

                    </FormControl>
                </Box >
            </Center >
        </SafeAreaProvider>
    );
};