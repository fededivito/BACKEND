const express = require('express')

const app = express()
app.use(express.json())
app.listen(8080, () => console.log('8080'))

const Contenedor = require('./container.js')
const productos = new Contenedor('productos.txt')


app.get( '/productos', async (req, res) => {
  const allProducts = await productos.getAll()
  res.json( allProducts )
})


app.get( '/productoRandom', async (req, res) => {
  const allProducts = await productos.getAll()
  const randomNumber = Math.floor(Math.random() * allProducts.length )
  res.json( allProducts[randomNumber] )
})