import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TouchableOpacity } from "react-native";

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { HighLightCard } from '../../components/HighLightCard/index';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/index';

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
    TransactionList,
    LoadContainer
} from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string;
  }

  interface HighLightProps {
      amount: string;
      lastTransaction: string;
  }

  interface HighlightData {
      entries: HighLightProps;
      expensives: HighLightProps;
      total: HighLightProps;
  }

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();


    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
        ){

        const lastTransaction = new Date( 
        Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime()))
            )
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
            'pt-BR',
            { month: 'long' }
          )}`
    }


    async function loadTransaction() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactonsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

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


        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransactionExpensives}`;

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: totalInterval,
            }
        });
        // console.log(transactonsFormatted);
        setIsLoading(false);
    }

    useEffect(() => {
        loadTransaction();

    },[]);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    }, []));

    return(
    <Container>
    {
        isLoading ? 
        <LoadContainer>
                <ActivityIndicator color={theme.colors.primary} size="large"/>
        </LoadContainer>  :
        <>
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
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
            />

            <HighLightCard 
            type="down"
            title="Saídas"
            amount={highlightData.expensives.amount}
            lastTransaction={highlightData.expensives.lastTransaction}
            />

            <HighLightCard 
            type="total"
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
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
        </>
}
        </Container>
    );
}
