import React from 'react';
import { 
    Container, 
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon 
} from "./styles";

import { HighLightCard } from '../../components/HighLightCard/index';

export function Dashboard() {
    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>

                        <Photo source={{uri: 'https://avatars.githubusercontent.com/u/57078227?v=4'}}/>

                        <User>
                            <UserGreeting> Olá,</UserGreeting>
                            <UserName>Gabriel</UserName>
                        </User>

                    </UserInfo>

                    <Icon name="power"/>
                </UserWrapper>
            </Header>

            <HighLightCard />
        </Container>
    );
}
