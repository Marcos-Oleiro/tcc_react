import { Center, Image } from "native-base";
import React from "react";
import logo from "../img/logo-branco.png";


const LogoComp = () => {
    return (
        <Center paddingBottom={5}>
            <Image
                source={logo}
                alt="Alternate Text"
                size="xl"
            />
        </Center>
    )
}

export default LogoComp;