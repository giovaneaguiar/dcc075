function vigenereCypher(texto, chave) {
    let resultado = "";

    // Ajusta a chave para o mesmo tamanho da mensagem, ignorando caracteres não alfabéticos
    let chaveExpandida = "";
    let indiceChave = 0;
    for (let i = 0; i < texto.length; i++) {
        if (/[a-zA-Z]/.test(texto[i])) {
            chaveExpandida += chave[indiceChave % chave.length];
            indiceChave++;
        } else {
            chaveExpandida += " "; // Mantém espaços para alinhamento
        }
    }

    // Encripta o texto
    let indiceChaveExpandida = 0;
    for (let i = 0; i < texto.length; i++) {
        const caractere = texto[i];

        if (/[a-zA-Z]/.test(caractere)) {
            const inicio = caractere === caractere.toUpperCase() ? 65 : 97;
            const deslocamento = chaveExpandida[indiceChaveExpandida].toUpperCase().charCodeAt(0) - 65;

            const novoCaractere = String.fromCharCode(((caractere.charCodeAt(0) - inicio + deslocamento) % 26) + inicio);
            resultado += novoCaractere;

            indiceChaveExpandida++;
        } else {
            resultado += caractere;
        }
    }

    return resultado;
}

function railFenceCypher(texto, numTrilhas) {
    const trilhas = Array(numTrilhas).fill('').map(() => []);
    let direcao = 1; // 1 = para baixo, -1 = para cima
    let trilhaAtual = 0;

    for (let i = 0; i < texto.length; i++) {
        trilhas[trilhaAtual].push(texto[i]);

        if (trilhaAtual === 0) {
            direcao = 1;
        } else if (trilhaAtual === numTrilhas - 1) {
            direcao = -1;
        }

        trilhaAtual += direcao;
    }

    return trilhas.flat().join('');
}

function main() {
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Digite o texto para encriptação: ", (texto) => {
        rl.question("Digite a chave para Vigenère (string): ", (chave) => {
            rl.question("Digite o número de trilhas para Rail Fence: ", (numTrilhas) => {
                numTrilhas = parseInt(numTrilhas);

                // Cifra Vigenère
                const resultadoCifradoVigenere = vigenereCypher(texto, chave);
                console.log("\nTexto cifrado em Vigenère: ", resultadoCifradoVigenere);

                // Cifra Rail Fence
                const resultadoCifradoRailFence = railFenceCypher(texto, numTrilhas);
                console.log("Texto cifrado em Rail Fence: ", resultadoCifradoRailFence);


                rl.question("Digite o numero sucessivamente a cifra de Vigenére e Rail Fence ao mesmo texto: ", (num) => {
                    num = parseInt(num);

                    if (isNaN(num)) {
                        console.error("Deve ser número inteiro.");
                        rl.close();
                        return;
                    }

                    let textoCifradoRailFence = texto;
                    let textoCifradoVigenere = texto;
                    for (let i = 0; i < num; i++) {
                        textoCifradoVigenere = vigenereCypher(textoCifradoVigenere, chave)
                        textoCifradoRailFence = railFenceCypher(textoCifradoRailFence, numTrilhas);
                    }

                    console.log("\nTexto cifrado em Vigenère: ", textoCifradoVigenere);
                    console.log("Texto cifrado em Rail Fence: ", textoCifradoRailFence);

                    rl.close();

                })


            });
        });
    });
}

main();
