export const getClassName = function(a){
  return Object.prototype.toString.call(a)
}

export const isArray = function(a){
  return getClassName(a) === '[object Array]'
}
