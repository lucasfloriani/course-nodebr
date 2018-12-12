const {
  deepEqual,
  ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRADO = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
}

describe('Suite de manipulação de Herois', () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
  })
  it('deve pesquisar um heroi usando arquivos', async () =>  {
    const expected = DEFAULT_ITEM_CADASTRADO
    // Usa-se [] em variaveis que recebem arrays para pegar o primeiro valor
    // neste array adicionado a variavel
    // const [resultado, posicao2, posicao3] = await database.listar(expected.id)
    const [resultado] = await database.listar(expected.id)
    deepEqual(resultado, expected)
  })

  it('deve cadastrar um heroi, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRADO
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRADO.id)

    deepEqual(actual, expected)
  })
})