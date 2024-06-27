
const propiedadesNecesarias = ["titulo", "precio", "stock", "descripcion", "codigo"]
const VALIDACIONES = {
  'precio': {
    validacion: (valor) => {
      return Boolean(valor) && !isNaN(valor) && valor > 1
    },
    errorText: 'Precio es un valor nulo o no es un numero positivo mayor que 1'
  },
  'titulo': {
    validacion: (valor) => {
      return Boolean(valor) && (typeof (valor) === 'string') && valor.length > 3
    },
    errorText: 'Titulo debe ser un valor verdadero con una longitud mayor a 3 caracteres'
  },
  'stock': {
    validacion: (valor) => {
      return (Boolean(valor) && !isNaN(valor) && valor >= 1)
    },
    errorText: 'El stock debe ser un numero valido mayor a 1'
  },
  'descripcion': {
    validacion: (valor) => {
      return (Boolean(valor) && isNaN(valor) && valor.length > 20 && typeof (valor) === 'string')
    },
    errorText: 'El la descripcion debe ser un string de mas de 20 caracteres'
  },
  'codigo': {
    validacion: (valor) => {
      return (Boolean(valor) && valor.length > 3)
    },
    errorText: 'El codigo debe ser un string de mas de 3 caracteres'
  }
}

const validarPropiedadesProducto = (producto) => {
  try {
    const propiedadesProducto = Object.keys(producto)
    const propiedadesFaltantes = []
    const propiedadSobrantes = []
    for (let propiedadNecesaria of propiedadesNecesarias) {
      if (!propiedadesProducto.includes(propiedadNecesaria)) {
        propiedadesFaltantes.push(propiedadNecesaria)
      }
    }
    if (propiedadesFaltantes.length > 0) {
      throw { status: 400, message: "faltan las propiedades [" + propiedadesFaltantes.join(",") + "]" }
    }
    for (let propiedad of propiedadesProducto) {
      if (!propiedadesNecesarias.includes(propiedad)) {
        propiedadSobrantes.push(propiedad)
      }
    }
    if (propiedadSobrantes.length > 0) {
      throw { status: 400, message: "sobran las propiedades [" + propiedadSobrantes.join(",") + "]" }
    }
    for (let propiedad in VALIDACIONES) {
      let valor = producto[propiedad]
      VALIDACIONES[propiedad].validacion(valor)
      if (!VALIDACIONES[propiedad].validacion(valor)) {
        throw { status: 400, message: VALIDACIONES[propiedad].errorText }
      }
    }
    return true
  }
  catch (error) {
    throw (error)
  }
}


module.exports = { validarPropiedadesProducto }