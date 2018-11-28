/*
 0- Obter um usuário
 1- Obter o número de telefone de um usuário a partir de seu ID
 2- Obter o endereço do usuário pelo ID
*/
// Importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  // Quando der algum problema -> reject(ERRO)
  // Quando sucess -> resolve()
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      // return reject(new Error('DEU RUIM DE VERDADE!'))

      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date(),
      })
    }, 1000)
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '1199002',
        ddd: 11
      });
    }, 2000)
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000)
}

// 1º Passo = adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // Execução um após o outro, porem desnecessário pois uma função não depende da outra
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)

    // Executa ambos ao mesmo tempo pois não dependem uma da outra, ganhando assim performance
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const telefone = resultado[0]
    const endereco = resultado[1]

    console.log(`
      Nome: ${usuario.nome}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereço: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}
