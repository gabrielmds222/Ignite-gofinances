import React, { useCallback, useEffect, useState } from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import { HighLightCard } from '../../components/HighLightCard/index';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/index';

export interface DataListProps extends TransactionCardProps {
    id: string;
  }


  interface HighLightProps {
      amount: string;
  }

  interface HighLightData {
      entries: HighLightProps;
      expensives: HighLightProps;
      total: HighLightProps;
  }

export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighLightData>({} as HighLightData);

    async function loadTransaction() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactonsFormatted: DataListProps[] = transactions.
        map((item: DataListProps) => {

            if(item.type === 'positive') {
                entriesTotal += Number(item.amount);
            } else {
                expensiveTotal += Number(item.amount)
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return { 
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });

        setTransactions(transactonsFormatted);

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'curency',
                    currency: 'BRL'
                }),
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'curency',
                    currency: 'BRL'
                }),
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'curency',
                    currency: 'BRL'
                }),
            }
        });
        console.log(transactonsFormatted);
    }

    useEffect(() => {
        loadTransaction();

    },[]);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    }, []));

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
            amount={highlightData?.entries?.amount}
            lastTransaction="Última entrada dia 13 de abril"
            />

            <HighLightCard 
            type="down"
            title="Saídas"
            amount={highlightData?.expensives?.amount}
            lastTransaction="Última saída dia 3 de abril"
            />

            <HighLightCard 
            type="total"
            title="Total"
            amount={highlightData?.total?.amount}
            lastTransaction="01 à 06 de abril"
            />

        </HighLightCards>

        <Transactions>
            <Title>Listagem</Title>

            <TransactionList 
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}           
            />    
        </Transactions>
        </Container>
    );
}
