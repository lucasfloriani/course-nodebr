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


const usuarioPromise = obterUsuario();
// Para manipular com sucesso usamos a função .then
// Para manipular erros usamos o .catch
//
// Usuario -> Telefone -> Telefone
usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id)
    .then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id
        },
        telefone: result
      }
    })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function (resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `)
  })
  .catch(function (error) {
    console.error('DEU RUIM', error)
  })


// obterUsuario(function resolverUsuario(error, usuario) {
//   if(error) {
//     console.error('DEU RUIM em USUARIO', error)
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if(error1) {
//       console.error('DEU RUIM em TELEFONE', error1)
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if(error2) {
//         console.error('DEU RUIM em TELEFONE', error2)
//         return;
//       }

//       console.log(`
//         Nome: ${usuario.nome},
//         Endereço: ${endereco.rua},${endereco.numero}
//         Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `)
//     });
//   });
// });
