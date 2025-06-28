var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = []

  if (typeof startEl === 'undefined') {
    startEl = document.body
  }
  console.log(startEl)

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  function recorrerDOM(nodo) {
    const match = matchFunc(nodo)
    if (match) {
      resultSet.push(nodo)
    }
    const childrens = nodo.children
    for (let children of childrens) {
      recorrerDOM(children)
    }
  }

  recorrerDOM(startEl)
  return resultSet
}

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  const selectorSplit = selector.split('')
  if (selectorSplit[0] === '#') {
    return 'id'
  } else if (selectorSplit[0] === '.') {
    return 'class'
  } else if (selectorSplit.includes('.')) {
    return 'tag.class'
  }
  return 'tag'
}

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector)
  var matchFunction
  if (selectorType === 'id') {
    matchFunction = element => {
      return element.id === selector.slice(1)
    }
  } else if (selectorType === 'class') {
    matchFunction = element => {
      return element.classList.contains(selector.slice(1))
    }
  } else if (selectorType === 'tag.class') {
    matchFunction = element => {
      const selectorSplit = selector.split('.')
      return (
        element.tagName &&
        element.tagName.toLowerCase() === selectorSplit[0].toLowerCase() &&
        element.classList.contains(selectorSplit[1])
      )
    }
  } else if (selectorType === 'tag') {
    matchFunction = element => {
      return (
        element.tagName &&
        element.tagName.toLowerCase() === selector.toLowerCase()
      )
    }
  }
  return matchFunction
}

var $ = function (selector) {
  var elements
  var selectorMatchFunc = matchFunctionMaker(selector)
  elements = traverseDomAndCollectElements(selectorMatchFunc)
  return elements
}
