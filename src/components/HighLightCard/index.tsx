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


interface Props {
    title: string;
    amount: string;
    lastTransaction: string;
    type: 'up' | 'down' | 'total';
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
} 

export function HighLightCard({
    type,
    title,
    amount,
    lastTransaction
} : Props){
    return(
        <Container type={type}>
            <Header>
                <Title type={type}> {title} </Title>
                <Icon name={icon[type]} type={type}/>
            </Header>

            <Footer>
                <Amount type={type}> {amount} </Amount>
                <LastTransation type={type}> {lastTransaction} </LastTransation>
            </Footer>
        </Container>
    );
}