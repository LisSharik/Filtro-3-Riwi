//Traer la data de la base de datos
export async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error en cargar los datos");
    return [];
  }
}

//Agregar datos a la base de datos
export async function addData(data, url) {
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("Error al mandar los datos");
  }
}

export async function verifyData(URL, tipeDate, input) {
  let verify;
  const response = await fetch(`${URL}?${tipeDate}=${input}`);
  const data = await response.json();

  if (data.length == 0) {
    verify = false;
  } else {
    verify = true;
  }

  return verify;
}


export async function updateData(URL,id,data){
     try {
       await fetch(`${URL}/${id}`,{
         method: "PUT",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
       })
   
     } catch (error) {
       console.log("No se pudo eliminar el elemento");
     }
   }
   
export async function deleteData(URL,id){
     try {
       await fetch(`${URL}/${id}`,{
         method: "DELETE"
       })
   
    } catch (error) {
     console.log("Datos no encontrados");
    }
   }
   

export function cleanContainer(container){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
}