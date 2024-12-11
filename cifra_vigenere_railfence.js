// Grupo: 
// GIOVANE NILMER DE OLIVEIRA SANTOS
// GIOVANE MACHADO AGUIAR
// BRUNO
// MARCOS

// Para testar, basta ter o Node.js instalado e, na mesma pasta do arquivo, rodar o comando:
// node cifra_vigenere_railfence.js

// Alterar os textos e chaves na função main();

class Fila {
    constructor() {
        this.elementos = [];
    }

    // Adicionar à fila
    enqueue(elemento) {
        this.elementos.push(elemento);
    }

    // Remover da fila
    dequeue() {
        this.elementos.shift();
    }

    isEmpty() {
        return this.elementos.length === 0;
    }
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
        } else {
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
    // Textos para cifrar + chaves / número de trilhas:

    // 2 - Cifra de Vigenere
    const textoVigenere = "wearediscoveredsaveyourself";
    const chaveVigenere = "deceptive";

    // 3 - Cifra Rail Fence
    const textoRailFence = "meetmeafterthetogaparty";
    const numTrilhas = 2;

    // Testes das cifras:
    console.log("1 - O texto \"", textoVigenere, "\" cifrado na Cifra de Vigenère é \"", vigenereCypher(textoVigenere, chaveVigenere), "\"");
    console.log("2 - O texto \"", textoRailFence, "\" cifrado na Cifra Rail Fence é \"", railFenceCypher(textoRailFence, numTrilhas), "\"");

    // Teste simultâneo: Vigenère + Rail Fence
    const textoCifradoVigenere = vigenereCypher(textoVigenere, chaveVigenere);
    const textoCifradoCombinado = railFenceCypher(textoCifradoVigenere, numTrilhas);

    console.log("\nO texto \"", textoVigenere, "\" cifrado na Cifra de Vigenère é \"", textoCifradoVigenere, 
        "\" e, aplicado o Rail Fence, é \"", textoCifradoCombinado, "\"");
}

main();
