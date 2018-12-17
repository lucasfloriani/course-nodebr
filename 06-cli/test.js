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
const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanterna Verde',
  poder: 'Energia do Anel',
  id: 2
}


describe('Suite de manipulação de Herois', () => {
  before(async () => {
    await database.remover();
    await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
  })
  it('deve cadastrar um heroi, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRADO
    await database.cadastrar(DEFAULT_ITEM_CADASTRADO)

    const [actual] = await database.listar(expected.id)
    deepEqual(actual, expected)
  })
  it('deve pesquisar um heroi usando arquivos', async () =>  {
    const expected = DEFAULT_ITEM_CADASTRADO
    // Usa-se [] em variaveis que recebem arrays para pegar o primeiro valor
    // neste array adicionado a variavel
    // const [resultado, posicao2, posicao3] = await database.listar(expected.id)
    const [resultado] = await database.listar(expected.id)
    deepEqual(resultado, expected)
  })

  it('deve atualizar um heroi pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
    deepEqual(resultado, expected)
  })

  it('deve remover um heroi por id', async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRADO.id)
    deepEqual(resultado, expected)
  })
})