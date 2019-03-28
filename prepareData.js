const fetch = require('node-fetch')
const d3 = require('d3')
const R = require('ramda')

const writeJson = require('./writeJson')

/*
  writeJson prends deux arguments:
    * le nom du fichier
    * un objet ou une liste JSON
  
  ex:
    writeJson('asylum.json', data)
*/

const URL = 'https://raw.githubusercontent.com/idris-maps/heig-datavis-2019/master/20190322-node/exercice_node/ch_asylum_demands.csv'
// le lien vers le fichier CSV

fetch(URL).then(r=>r.text()) 
.then(d3.csvParse)
.then(r=>r.filter(t => t.affected !=="*"))
.then(data => data.map(d =>({...d,year:Number(parseInt(d.year, 10)),affected:Number(parseInt(d.affected, 10)) }))) //Destruction de tableau 
.then(data => data.map(d =>({...d,country_asylum: d.country_asylum.includes("USA") ? "USA" : d.country_asylum}))) //Recherche si includ USA, si oui il met USA et sinon il laisse le truc de base
.then(data => writeJson('asylum.json', data))

