const R = require('ramda')

const writeJson = require('./writeJson')
/*
  writeJson prends deux arguments:
    * le nom du fichier
    * un objet ou une liste JSON
  
  ex:
    writeJson('asylumByCountry.json', list)
*/
const data = require('./asylum.json')
// asylum.json doit être créé avec prepareData
const pays = R.uniq(data.map(d=>d.country_asylum))

const calcSomme = (resultat, d) => {
  return resultat + d
}

const somme = pays => {
  return data.filter(d => d.country_asylum === pays)
  .map(d => d.affected)
  .reduce(calcSomme, 0)
}

const list = pays.map(p => ({p, somme:somme(p)}))

writeJson('asylumByCountry.json', list)
