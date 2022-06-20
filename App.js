import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

export default function App() {

  //Estados de Controle
  const [tela,setTela] = useState('Menu')
  const [jogadorAtual,setJogadorAtual] = useState('')
  const [tabuleiro,setTabuleiro] = useState([]);
  const [jogadasRestantes,setJogadasRestantes] = useState(0)
  const [ganhador,setGanhador] = useState('')


  //Navegação
  switch(tela){
    case 'Menu':
      return getTelaMenu();
    case 'Jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

  //Verifica Quem Joga
  function jogar(linha,coluna){

    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')

    verificarGanhador(tabuleiro,linha,coluna);

  }

  //Verificar Vencedor
  function verificarGanhador(tabuleiro,linha,coluna){

    //LINHAS
    if(tabuleiro[linha][0] != ''&& tabuleiro[linha][0]=== tabuleiro[linha][1] && tabuleiro[linha][1] == tabuleiro[linha][2]){
      return finalizarJogo(tabuleiro[linha][0])
    }
    
    //COLUNAS
    if(tabuleiro[0][coluna] != ''&& tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] == tabuleiro[2][coluna]){
      return finalizarJogo(tabuleiro[0][coluna])
    }

    //DIAGONAL 1
    if(tabuleiro[0][0] != ''&&tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] == tabuleiro[2][2]){
      return finalizarJogo(tabuleiro[0][0])
    }

    //DIAGONAL 2
    if(tabuleiro[0][2] != ''&&tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] == tabuleiro[2][0]){
      return finalizarJogo(tabuleiro[0][2])
    }

    //NENHUM GANHADOR
    if(jogadasRestantes -1 === 0){
      return finalizarJogo('');
    }

    //JOGO NÂO FINALIZADO
    setJogadasRestantes((jogadasRestantes - 1));
  }

  
  function finalizarJogo(Jogador){
    setGanhador(Jogador);
    setTela('ganhador')
  }



  function iniciarJogo(Jogador){
    setJogadorAtual(Jogador);

    setJogadasRestantes(9);
    setTabuleiro([
              ['','',''],
              ['','',''],
              ['','','']
    ]);

    setTela('Jogo')

  }


  function getTelaMenu(){
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.titulo}>Jogo da Velha</Text>
          <Text style={styles.subTitulo}>Selecione o Primeiro Jogador</Text>

          <View style={styles.containerItem}>
             <TouchableOpacity
              onPress={() => iniciarJogo('X')}
             style={styles.boxJogador}>
            <Text style={styles.jogadorX}>
              X
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => iniciarJogo('O')}
          style={styles.boxJogador}>
            <Text style={styles.jogadorO}>
              O
            </Text>
          </TouchableOpacity>
          </View>
         
        </View>
      );
  }

  function getTelaJogo(){
    return (
      <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Jogo da Velha</Text>

        {
          tabuleiro.map((linha,numeroLinha) =>{
            return(
              <View style={styles.containerItem}key={numeroLinha}>

                {
                  linha.map((coluna,numeroColuna) => {
                    return(
                      <TouchableOpacity
                        onPress={()=> jogar(numeroLinha,numeroColuna)}
                        key={numeroColuna}
                        style={styles.boxJogador}
                        disabled={coluna !==''}>
                        <Text style={coluna ==='X' ?styles.jogadorX : styles.jogadorO}>
                         {coluna}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                }

              </View>
            )
          })
        }

        <TouchableOpacity
          style={styles.BotaoMenu}
          onPress={()=> setTela('Menu')}
        >
          <Text style={styles.TextoMenu}>Menu</Text>
        </TouchableOpacity>
     
      </View>
      );
  }

  function getTelaGanhador(){
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.titulo}>Jogo da Velha</Text>
          <Text style={styles.subTitulo}>Resultado</Text>

          {
            ganhador === '' && 
            <Text style={styles.ganhador}>Nenhum Ganhador</Text>
          }

          {
            ganhador !== '' &&
            <>
            <Text style={styles.ganhador}>Ganhador</Text>
              <View
                style={styles.boxJogador}>
                <Text style={ganhador ==='X' ?styles.jogadorX : styles.jogadorO}>
                  {ganhador}
                </Text>
              </View>
            </>
          }

          <TouchableOpacity
          style={styles.BotaoMenu}
          onPress={()=> setTela('Menu')}>
          <Text style={styles.TextoMenu}>Menu</Text>
        </TouchableOpacity>
          
         
        </View>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo :{
    fontSize:30,
    fontWeight:'bold',
    color:'#222'
  },
  subTitulo :{
    fontSize:20,
    color:'#555',
    marginTop:20,
  },
  boxJogador :{
    height:80,
    width:80,
    backgroundColor:'#ddd',
    alignItems:'center',
    justifyContent:'center',
    margin:5,
    borderRadius:15,
    marginTop:20,
    elevation:10
  },
  jogadorX :{
    fontSize:40,
    color:'#553fda',
  },
  jogadorO :{
    fontSize:40,
    color:'#da3f3f',
  },
  containerItem :{
    flexDirection:'row',
  },
  BotaoMenu:{
    marginTop:20,
    backgroundColor:'#222',
    width:150,
    height:50,
    borderRadius:15,
    elevation:10
  },
  TextoMenu :{
    fontSize:24,
    fontWeight:'bold',
    color:'#fff',
    textAlign:'center',
    marginTop:5
  },
  ganhador:{
    fontSize:20,
    marginVertical:10,
    fontWeight:'bold',
    color:'#333'
  }
});
