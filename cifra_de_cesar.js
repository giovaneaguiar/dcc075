// Grupo: 
// GIOVANE NILMER DE OLIVEIRA SANTOS
// GIOVANE MACHADO AGUIAR
// BRUNO
// MARCOS MATEUS OLIVEIRA DOS SANTOS - MATRICULA: 201835019

// Para testar, basta ter o Node.js instalado e, na mesma pasta do arquivo, rodar o comando:
// node cifra_de_cesar.js


function caesarCypher(texto, chave) {

    let textoCifrado = '';

    for (let i = 0; i < texto.length; i++) {
        const caractere = texto[i];

        if (/[a-zA-Z]/.test(caractere)) {
            let inicio = caractere === caractere.toUpperCase() ? 65 : 97;

            let novoCaractere = String.fromCharCode(((caractere.charCodeAt(0) - inicio + chave) % 26) + inicio);
            textoCifrado += novoCaractere;
        } else {
            textoCifrado += caractere;
        }

    }

    return textoCifrado;
}

function calcularFrequencia(texto) {
    const frequencia = {};

    // Contar frequência de cada caractere
    for (const char of texto) {
        frequencia[char] = (frequencia[char] || 0) + 1;
    }

    // Transformar em array e ordenar por frequência decrescente
    const ranking = Object.entries(frequencia)
        .sort((a, b) => b[1] - a[1]);

    return ranking;
}



function main() {

    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Digite o texto para encriptação: ", (TEXTO_CIFRA) => {
        console.log("Texto: ", TEXTO_CIFRA)
        rl.question("Digite o valor do deslocamento (chave): ", (CHAVE) => {

            CHAVE = parseInt(CHAVE);

            if (isNaN(CHAVE)) {
                console.error("A chave deve ser um número inteiro.");
                rl.close();
                return;
            }

            const textoCifrado = caesarCypher(TEXTO_CIFRA, CHAVE);
            console.log("Texto: ", TEXTO_CIFRA)
            console.log("Cifra de César: ", textoCifrado)

            const frequencia = calcularFrequencia(textoCifrado);

            // Exibir ranking de frequência
            console.log("\nRanking de frequência dos caracteres:");
            frequencia.forEach(([char, count], index) => {
                console.log(`${index + 1} - '${char}' - ${count}x`);
            });

            rl.close();
        });
    });

}

main();
