const fs = require('fs');
const csv = require('csvtojson');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function recuperaDado(nomeTabela) {
    return csv({
        delimiter:';'
      })
      .fromFile(nomeTabela)    
}

async function criaTabela() {
    const tabela1 = await recuperaDado('antigo.csv')
    const tabela2 = await recuperaDado('novo.csv')
    console.log(tabela1)
    console.log(tabela2)
    const dfmerged = tabela1.filter(item1 => {
        const item2 = tabela2.find(item2 => item1['Produto'] === item2['Produto']);
        return item2 !== undefined;
      }).map(item1 => {
        const item2 = tabela2.find(item2 => item1['Produto'] === item2['Produto']);
        return { ...item1, ...item2 };
      });
      // Escrevendo os dados em um arquivo CSV
      const csvWriter = createCsvWriter({
        path: 'Ruptura.csv',
        header: Object.keys(dfmerged[0]).map(column => ({ id: column, title: column })),
        encoding: 'utf8',
      });
      csvWriter.writeRecords(dfmerged)
        .then(() => console.log('Arquivo Ruptura.csv salvo com sucesso!'));
};
criaTabela();