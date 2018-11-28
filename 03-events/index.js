const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function(click) {
  console.log('Um usuario clicou', click)
})

// ===== Exemplo 1 =====
// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0
// setInterval(function() {
//   meuEmissor.emit(nomeEvento, 'no ok' + (count++))
// }, 1000)


// ===== Exemplo 2 =====
// const stdin = process.openStdin()
// stdin.addListener('data', function (value) {
//   console.log(`Você digitou: ${value.toString().trim()}`)
// })

// ===== Exemplo 3 =====
// Com a utilização de promise, a execução do event listener
// vai ser executada somente uma vez, pois a promise serve para ações
// que serão executadas uma vez só e não para ações continuas
//
// EventEmitter é usado para ações de clique, alterações de arquivo, etc
const stdin = process.openStdin()
function main() {
  return new Promise(function (resolve, reject) {
    stdin.addListener('data', function (value) {
      // console.log(`Você digitou: ${value.toString().trim()}`)
      return resolve(value)
    })
  })
}
main().then(function (resultado) {
  console.log('resultado', resultado.toString())
})