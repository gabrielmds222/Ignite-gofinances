import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer, 
    FooterWrapper,
} from './styles';

export function SignIn() {
    const { singInWithGoogle } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await singInWithGoogle();

        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possivel conectar a conta google')
        }
    }
    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'} finaças
                        de forma {'\n'} muito simples.
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {'\n'} uma das
                    contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton 
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />

                    <SignInSocialButton 
                        title="Entrar com Apple"
                        svg={AppleSvg}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}