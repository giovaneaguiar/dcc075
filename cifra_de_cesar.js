// Grupo: 
// GIOVANE NILMER DE OLIVEIRA SANTOS
// GIOVANE MACHADO AGUIAR
// BRUNO
// MARCOS

// Para testar, basta ter o Node.js instalado e, na mesma pasta do arquivo, rodar o comando:
// node cifra_de_cesar.js

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

function caesarCypher(texto, chave) {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
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

function main() {

    // 1 - Cifra de César
    const textoCesar = "meet me after the toga party";
    const chaveCesar = 3;

    // Teste da cifra:
    console.log("1 - O texto \"", textoCesar, "\" cifrado na Cifra de César é \"", caesarCypher(textoCesar, chaveCesar), "\"");

}

main();