// les librairies
// pour les échelles:
const d3 = require('d3')
// pour écrire le fichier:
const fs = require('fs')

// charger le fichier JSON créé avec "node run.js"
const data = require('./asylumByCountry.json')

// configuration du graphique
const WIDTH = 500
const HEIGHT = 500
const BAR_SPACE = HEIGHT / data.length
const BAR_HEIGHT = BAR_SPACE * 0.7
const BAR_COLOR = 'aquamarine'
const NAME_MARGIN_LEFT = -100
const NAME_COLOR = 'black'
const SUM_MARGIN_RIGHT = -15
const SUM_COLOR = 'black'

// l'échelle pour retourner une valeur en fonction du nombre de chansons
const scale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.somme)])
  .range([0, WIDTH])

// dessiner un bâton
const drawBar = (somme, index) =>
  `<rect
    y="${index * BAR_SPACE}"
    height="${BAR_HEIGHT}"
    width="${scale(somme)}" 
    fill="${BAR_COLOR}"/>`

// dessiner tous les bâtons
const drawBars = data =>
  data
    // pour chaque élément de la liste nous passons la clé "somme" et l'index à "drawBar"
    .map((d, i) => drawBar(d.somme, i))
    // "drawBar" retourne une chaîne de charactères que nous joignons avec "\n" (à la ligne)
    .join('\n')

// écrire le nom d'un pays sur le bâton
const writeCountryName = (p, index) =>
  `<text
    x="${NAME_MARGIN_LEFT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${NAME_COLOR}">
    ${p}
  </text>`

// écrire tous les noms des pays
const writeNames = data =>
  data
    .map((d, i) => writeCountryName(d.p, i))
    .join('\n')

// écrire le nombre de chansons
const writeNumberOfSongs = (somme, index) =>
  `<text
    x="${scale(somme) - SUM_MARGIN_RIGHT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${SUM_COLOR}"
    text-anchor="end">
    ${somme}
    </text>`

// écrire le nombre de chansons sur tous les bâtons
const writeNumbersOfSongs = data =>
  data
    .map((d, i) => writeNumberOfSongs(d.somme, i))
    .join('\n')

// pour créer un fichier SVG
// nous ajoutons l'attribut "xmlns" pour dire quel dialecte XML nous utilisons
// et une viewBox pour définir le système de coordonnées
// puis nous appelons les fonctions créées plus haut pour ajouter les éléments
const svg = data => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${drawBars(data)}
    ${writeNames(data)}
    ${writeNumbersOfSongs(data)}
  </svg>
`

// écrire le fichier "graph.svg"
fs.writeFileSync('graph.svg', svg(data), 'utf-8')