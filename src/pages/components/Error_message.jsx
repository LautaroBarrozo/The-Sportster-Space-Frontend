import React from 'react'



export const Error_message = ({value}) => {

  const errores = {vacio: "los datos son obligatorios", error: "uno de los datos es incorrecto"}
  
  return (
    <>
        <small name='error_small' className="error" >{value === "" ? errores.vacio : errores.error   }</small>
    </>
  )
}
