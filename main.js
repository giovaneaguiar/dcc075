// grupo: 
// GIOVANE NILMER DE OLIVEIRA SANTOS
// GIOVANE
// BRUNO
// MARCOS

// Para testar, basta ter o node instalado e, na mesma pasta do arquivo rodar o comando:
// node main.js

// Alterar os textos e chaves na função main();

class Fila {
    constructor() {
        this.elementos = []
    }

    // adicionar à fila
    enqueue(elemento) {
        this.elementos.push(elemento);
    }

    // remover da fila
    dequeue() {
        this.elementos.shift()
    }

    isEmpty() {
        return this.elementos.length === 0;
    }
}

function caesarCypher(texto, chave) {
    const fila = new Fila();
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < alfabeto.length; i++) {
        fila.enqueue(alfabeto[i])
    }

    let textoCifrado = '';

    for (let i = 0; i < texto.length; i++) {
        const caractere = texto[i].toLowerCase();
        const indice = alfabeto.indexOf(caractere);
        if (indice !== -1) {
            const novoIndice = (indice + chave) % alfabeto.length;
            textoCifrado += alfabeto[novoIndice];
        } else {
            textoCifrado += caractere;
        }
    }

    return textoCifrado;
}


function vigenereCypher(texto, chave) {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    let textoCifrado = '';
    let indiceChave = 0;
   
    for (let i = 0; i < texto.length; i++) {
        const caractere = texto[i].toLowerCase();
        const indiceCaractere = alfabeto.indexOf(caractere);
   
        if (indiceCaractere !== -1) {
            const indiceChaveAtual = alfabeto.indexOf(chave[indiceChave]);
            const novoIndice = (indiceCaractere + indiceChaveAtual) % alfabeto.length;
            textoCifrado += alfabeto[novoIndice];
   
        indiceChave = (indiceChave + 1) % chave.length;
    }       
        else {
            textoCifrado += caractere;
        }
    }
   
    return textoCifrado;
}

function railFenceCypher(texto, numTrilhas) {
    const trilhas = Array(numTrilhas).fill('').map(() => []);
    let direcao = 1; // 1 = para baixo, -1 = para cima
    let trilhaAtual = 0;
   
    for (let i = 0; i < texto.length; i++) {
        const caractere = texto[i];
        trilhas[trilhaAtual].push(caractere);
    
        if (trilhaAtual === 0) {
            direcao = 1;
        } else if (trilhaAtual === numTrilhas - 1) {
            direcao = -1;
        }
    
        trilhaAtual += direcao;
    }
   
    const textoCifrado = trilhas.flat().join('');
    return textoCifrado;
}

function main() {
    // textos para cifrar + chaves / número de trilhas:

    // 1 - Cifra de César
    const textoCesar = "meet me after the toga party";
    chave = 3;

    // 2 - Cifra de Vigenere
    const textoVigenere = "wearediscoveredsaveyourself";
    chaveVigenere = "deceptive";

    // 3 - Cifra Rail Fence
    const textoRailFence = "meetmeafterthetogaparty";
    numTrilhas = 2;

    // testes cifras:

    console.log("1 - O texto \"", textoCesar, "\" cifrado na cifra de cesar é ", caesarCypher(textoCesar, chave));
    console.log("2 - O texto \"", textoVigenere, "\" cifrado na cifra de vigenere é ", vigenereCypher(textoVigenere, chaveVigenere));
    console.log("3 - O texto \"", textoRailFence, "\" cifrado na cifra rail fence é ", railFenceCypher(textoRailFence, numTrilhas));

    // teste simultâneo vigenere + railFence;

    const textoCifradoVigenere = vigenereCypher(textoVigenere, chaveVigenere);

    console.log("O texto ", textoVigenere, " cifrado na cifra de vigenere é ", textoCifradoVigenere, " e aplicado o Rail Fence é ", railFenceCypher(textoCifradoVigenere, numTrilhas))
}

main();