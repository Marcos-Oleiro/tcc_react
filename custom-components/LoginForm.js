import { Box, Button, Center, FormControl, Input, Stack, WarningOutlineIcon, Alert, Text, View, VStack, HStack } from "native-base";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { makeLogin } from "../util/Utils.js";
import LogoComp from "./LogoComp.js";




export default function LoginForm({ navigation }) {
    const [email, setEmail] = useState("spellzito@oleirosoftware.com.br");
    const [passwd, setPasswd] = useState("1aA9!ss");


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
                                onPress={
                                    async () => makeLogin(email, passwd, navigation)}
                            >
                                Enviar
                            </Button>
                            <FormControl.ErrorMessage
                                leftIcon={<WarningOutlineIcon size="xs" />}>
                                Atleast 6 characters are required.
                            </FormControl.ErrorMessage>
                        </Stack>

                    </FormControl>
                </Box >
            </Center >
        </SafeAreaProvider>
    );
};