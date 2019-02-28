
let config = {
    apiKey: "AIzaSyAOrrJKoINWvF4IPH17uO2otEGsYhsXXg8",
    authDomain: "infinity-10b48.firebaseapp.com",
    databaseURL: "https://infinity-10b48.firebaseio.com",
    projectId: "infinity-10b48",
    storageBucket: "infinity-10b48.appspot.com",
    messagingSenderId: "105185888418"
  };
  firebase.initializeApp(config);

    let db = firebase.firestore();

    function write(nombre, decisionTomada, callback){
        // Definimos primero el nombre de la bdd que usaremos (nombre del documento), en este caso sera el de la variable nombre
        let docRef = db.collection("answers").doc(nombre);
        // Aqui guardaremos la información que exista por si es necesario actualizarla
        let allData = null;

        // Esta función llama a la base de datos y nos regresa el documento
        docRef.get().then(function(doc){
            // Si el documento existe entonces agregaremos o actualizaremos información
            if(doc.exists){
                // Guardamos la inforamción, usamos esta variable si quisieramos actualizar su información
                allData=doc.data();
                let valorActual = 0;
                if(isNaN(allData[decisionTomada])){
                    valorActual = 1;
                }
                else{
                    valorActual = allData[decisionTomada] + 1;
                }
                docRef.update({
                    // Nombre del dato que queremos cambiar
                    [decisionTomada]:valorActual
                    // Si quisieramos cambiar más de un valor a la vez separamos por comas cada linea
                })
                .then(function() {
                    // Lo que sucederá si se guardo exitosamente
                    console.log("Document successfully updated!");
                    callback();
                })
                .catch(function(error) {
                    // Lo que sucederá si hubo algún tipo de error
                    console.error("Error updating document: ", error);
                    callback();
                });
            }
            else{
                // Si no existe el documento entonces lo crea
                docRef.set({
                    [decisionTomada]:1
                }, { merge: true })
                .then(function() {
                    // Lo que sucederá si se guardo exitosamente
                    console.log("Document written");
                    callback();
                })
                .catch(function(error) {
                    // Lo que sucederá si hubo algún tipo de error
                    console.error("Error adding document: ", error);
                    callback();
                });
            }
        });
    }


    function read(callback){
        // Seleccionamos la base de datos que queremos (documento) en este caso "answers"
        db.collection("answers")
        .get()
        .then(function(querySnapshot) {
            // Si se obtuvo exitosamente la variable querySnapshot tiene toda la información
            callback(querySnapshot)
        })
        .catch(function(error) {
            // En caso de error
            console.log("Error getting documents: ", error);
        });
    }

    /* Obtenemos el valor de la decisión actual, lo obtenemos aqui para obtenerlo solo una vez en vez de dos veces*/
    let decisionActual = document.getElementById("timeline").value;

    // Obtenemos el id opc1 y le creamos una funcion onclick
    document.getElementById("opc1").onclick= function(){
        // Obtenemos el texto que esta en el id txt1
        let decisionTomada = document.getElementById("txt1").innerHTML;
        // escribimos en la base de datos, usamos el callback para redirigir la página
        write(decisionActual, decisionTomada, function(){window.location.href = "#"})
    };

    document.getElementById("opc2").onclick = function(){
        let decisionTomada = document.getElementById("txt2").innerHTML;
        write(decisionActual, decisionTomada, function(){window.location.href = "#"})
    };
