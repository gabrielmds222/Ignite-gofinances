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
    Icon,
    HighLightCards,
    Transactions,
    Title, 
    TransactionList
} from "./styles";

import { HighLightCard } from '../../components/HighLightCard/index';
import { TransactionCard } from '../../components/TransactionCard/index';

export function Dashboard() {
    const data = [
    {
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
            name:'vendas',
            icon: 'dollar-sign'
        },
        date: "13/01/2022"
    },
    {
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
            name:'vendas',
            icon: 'dollar-sign'
        },
        date: "13/01/2022"
    },
    {
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
            name:'vendas',
            icon: 'dollar-sign'
        },
        date: "13/01/2022"
    }
];

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

        <HighLightCards>
            <HighLightCard 
            type="up"
            title="Entradas"
            amount="R$ 17.400,00"
            lastTransaction="Última entrada dia 13 de abril"
            />

            <HighLightCard 
            type="down"
            title="Saídas"
            amount="R$ 1.259,00"
            lastTransaction="Última saída dia 3 de abril"
            />

            <HighLightCard 
            type="total"
            title="Total"
            amount="R$ 16.141,00"
            lastTransaction="01 à 06 de abril"
            />

        </HighLightCards>

        <Transactions>
            <Title>Listagem</Title>

            <TransactionList 
            data={data}
            renderItem={({ item }) => <TransactionCard data={item}/>}
            />
        </Transactions>
        </Container>
    );
}
