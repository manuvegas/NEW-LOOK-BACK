const propiedadesNecesarias = ["titulo", "precio", "descripcion", "img", "cuotas", "colores", "categoria"]

const VALIDACIONES = {
  'precio': {
    validacion: (valor) => {
      return Boolean(valor) && !isNaN(valor) && valor > 1;
    },
    errorText: 'Precio es un valor nulo o no es un número positivo mayor que 1'
  },
  'titulo': {
    validacion: (valor) => {
      return Boolean(valor) && (typeof (valor) === 'string') && valor.length > 3;
    },
    errorText: 'Título debe ser un valor verdadero con una longitud mayor a 3 caracteres'
  },
  'descripcion': {
    validacion: (valor) => {
      return (Boolean(valor) && isNaN(valor) && valor.length > 20 && typeof (valor) === 'string');
    },
    errorText: 'La descripción debe ser un string de más de 20 caracteres'
  },
  'img': {
    validacion: (valor) => {
      return Boolean(valor) && (typeof (valor) === 'string');
    },
    errorText: 'La imagen debe ser un string no vacío'
  },
  'cuotas': {
    validacion: (valor) => {
      return Boolean(valor) && !isNaN(valor) && valor > 0;
    },
    errorText: 'Las cuotas deben ser un número positivo mayor que 0'
  },
  'colores': {
    validacion: (valor) => {
      return Array.isArray(valor) && valor.length > 0 && valor.every(color =>
        typeof color === 'object' && color.nombre && typeof color.nombre === 'string' &&
        Array.isArray(color.talles) && color.talles.length > 0 && color.talles.every(talle =>
          typeof talle === 'object' && talle.nombre && typeof talle.nombre === 'string' &&
          !isNaN(talle.stock) && talle.stock >= 0
        )
      );
    },
    errorText: 'Colores debe ser un array de objetos con propiedades nombre (string) y talles (array de objetos con nombre y stock)'
  },
  'categoria': {
    validacion: (valor) => {
      const categoriasValidas = ['buzo', 'remera', 'pantalon', 'campera'];
      return Boolean(valor) && categoriasValidas.includes(valor);
    },
    errorText: 'Categoría debe ser uno de los valores permitidos'
  }
};

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