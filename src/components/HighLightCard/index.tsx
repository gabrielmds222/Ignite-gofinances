import React from 'react';
import { 
    Container, 
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransation 
} from "./styles";

export function HighLightCard(){
    return(
        <Container>
            <Header>
                <Title> Entrada </Title>
                <Icon name="arrow-up-circle"/>
            </Header>

            <Footer>
                <Amount> R$ 17.400,00 </Amount>
                <LastTransation> Última entrada dia 13 de abril </LastTransation>
            </Footer>
        </Container>
    );
}