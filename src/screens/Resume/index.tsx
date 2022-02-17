import React, { useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';

import { categories } from '../../utils/categories';
import { 
    Container,
    Header,
    Title,
    Content,
    ChartContainer, 
} from './styles';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: String;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
        .filter((expensive: TransactionData) => expensive.type === 'negative')


        

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                });
            }
        });

        setTotalByCategories(totalByCategory);
    }

    useEffect(() => {
        loadData();
    },[]);

    return (
    <Container>
        <Header>
            <Title> Resum por categoria </Title>
        </Header>

       <Content>
           <ChartContainer>
            <VictoryPie 
                data={totalByCategories}
                x="name"
                y="total"
            />
            </ChartContainer>

        {totalByCategories.map(item => (
                <HistoryCard 
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                />
            ))
        }
       </Content>
    </Container>
    )
}
