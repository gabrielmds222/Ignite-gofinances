import React from 'react';

import { Input } from '../../components/Form/Input/index';
import { Button } from '../../components/Form/Button/index';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton/index';
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

export function Register() {
    return(
        <Container>
            <Header>
                <Title> Cadastro </Title>
            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder="Nome"
                    />

                    <Input 
                        placeholder="Preço"
                    />

                    <TransactionsTypes>
                        <TransactionTypeButton 
                        type="up"
                        title="Income"
                        />

                        <TransactionTypeButton 
                        type="down"
                        title="Outcome"
                        />
                    </TransactionsTypes>
                </Fields>

                <Button title="Enviar"/>
            </Form>
        </Container>
    );
}