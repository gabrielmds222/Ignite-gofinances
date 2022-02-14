import React from 'react';
import { TouchableOpacity } from "react-native";
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
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/index';

export interface DataListProps extends TransactionCardProps {
    id: string;
  }

export function Dashboard() {
    const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
            name:'Vendas',
            icon: 'dollar-sign'
        },
        date: "13/01/2022"
    },
    {
        id: '2',
        type: 'negative',
        title: "Hamburgueria Pizzy",
        amount: "R$ 59,00",
        category: {
            name:'Alimentação',
            icon: 'coffee'
        },
        date: "10/01/2022"
    },
    {
        id: '3',
        type: 'negative',
        title: "Aluguel",
        amount: "R$ 1.200,00",
        category: {
            name:'Casa',
            icon: 'home'
        },
        date: "05/01/2022"
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

                    <TouchableOpacity onPress={() => {}}>
                     <Icon name="power" />
                    </TouchableOpacity>
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
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}           
            />    
        </Transactions>
        </Container>
    );
}
