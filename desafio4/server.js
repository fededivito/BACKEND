const express = require('express')
const { Router } = express

const app = express()

const apiRouter = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


const Contenedor = require('./contenedor.js')
const productos = new Contenedor('productos.txt')

app.use('/api', apiRouter)

apiRouter.get('/productos', async (req, res) => {
  const allProducts = await productos.getAll()
  res.json( allProducts )
})


apiRouter.get('/productos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const producto = await productos.getById( id )
  producto ? res.json( producto )
    : res.status(404).send({ error: 'producto no encontrado'})
})


apiRouter.post('/productos', async (req, res) => {
  const productoToAdd = req.body
  const idNew = await productos.save( productoToAdd )
  res.send({ idNew })
})

apiRouter.put('/productos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const productoToModify = req.body

  if(await productos.getById( id )){
    let allProducts = await productos.getAll()
    allProducts[ id - 1 ] = {"id": id, ...productoToModify}
    productos.saveFile( allProducts )
    res.send({ productoToModify })
  } else {
    res.status(404).send({ error: 'id no valido'})
  }
})


apiRouter.delete('/productos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const productoToDelete = await productos.getById( id )

  if (productoToDelete) {
    await productos.deleteById( id )
    res.send({ borrado: productoToDelete})
  } else {
    res.status(404).send({ error: 'producto no encontrado'})
  }
})

app.listen(8080, () => console.log('8080'))