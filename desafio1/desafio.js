class User{
    
    constructor ( nombre, apellido, libros, mascotas ){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return (`${this.nombre} ${this.apellido}`)
    }
    
    addMascota( Mascota ){
        this.mascotas.push(Mascota)
    }
  
    countMascotas(){
        return (this.mascotas).length
    }
  
    addBook( Nombre, Autor ){
        this.libros.push({ nombre:Nombre, autor:Autor })
    }
  
    getBookNames(){
        return this.libros.map( libro => libro.nombre )
    }
  
  }
  
  
  /*********************************************/
  
  const usuario = new User('Federico', 'Di Vito', [{ nombre:'El señor de los anillos', autor: 'J. R. R. Tolkien' }], ['perro'])
  
  
  console.log('Nombre de usuario: ', usuario.getFullName())
  usuario.addMascota('gato')
  console.log('Cantidad de mascotas: ', usuario.countMascotas())
  usuario.addBook('Harry Potter y la piedra filosofal', 'J. K. Rowling')
  console.log('Libros: ', usuario.getBookNames())