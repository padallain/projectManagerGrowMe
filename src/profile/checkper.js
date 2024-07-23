function hasAccess(modulo, clase, metodo, perfilId, permissionsMap) {
    const key = `${modulo}_${clase}_${metodo}_${perfilId}`;
    return permissionsMap.get(key) || false;
  }
  
  // Ejemplo de uso
  const modulo = 'Modulo1';
  const clase = 'Clase1';
  const metodo = 'Metodo1';
  const perfilId = 1; // ID del perfil del usuario autenticado
  
  loadPermissions().then(permissionsMap => {
    if (hasAccess(modulo, clase, metodo, perfilId, permissionsMap)) {
      console.log('Acceso permitido');
    } else {
      console.log('Acceso denegado');
    }
  });


  module.exports= loadPermissions