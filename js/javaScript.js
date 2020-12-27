function editarDatos(id){
	 var estudiante;

    for (var i = 0; i < localStorage.length; i++) {

    var clave = localStorage.key(i);
  		if (clave == id) {

   		 estudiante = $.parseJSON(localStorage.getItem(clave));

    	$("#id").val(estudiante.id);
    	$("#nombre").val(estudiante.nombre);
   		$("#nota").val(estudiante.nota);

    	}

}
}
 function listarEstudiantes() {

        var tabla = "";
        var parrafo1 = $("#p1");

        tabla += '<table id="lista" border="5" align="center">';
        tabla += '<tr>';
        tabla += '<th>Id de la foto</th>';
        tabla += '<th>Nombre</th>';
        tabla += '<th>Calificación</th>';
        tabla += '<th>Editar</th>';
        tabla += '<th>Eliminar</th>';
        tabla += '</tr>';

        for (var i = 0; i < localStorage.length; i++) {

            var clave = localStorage.key(i);
            var estudiante = $.parseJSON(localStorage.getItem(clave));


            tabla += '<tr>';
            tabla += '<td>' + estudiante.id + '</td>';
            tabla += '<td>' + estudiante.nombre + '</td>';
            tabla += '<td>' + parseFloat(estudiante.nota) + '</td>';
            tabla += '<td><button onclick="editarDatos(\'' + estudiante.id + '\');">Editar</button></td>';
            tabla += '<td><button onclick="eliminarEstudiante(\'' + estudiante.id + '\');">Eliminar</button></td>';
            tabla += '</tr>';
        }

        tabla += '</table>';

        $(parrafo1).html(tabla);
    }

 function eliminarEstudiante(id) {
       	localStorage.removeItem(id);
      	listarEstudiantes();
        listarEstudiantes();
    }
  $(document).ready(function() {


        $("#boton1").click(function() {
            var id = $("#id").val();
            var nombre = $("#nombre").val();
            var nota = $("#nota").val();

            var estudiante = {
                id: id,
                nombre: nombre,
                nota: nota
            };
            localStorage.setItem(id, JSON.stringify(estudiante));
            contador = localStorage.length + 1;
            listarEstudiantes()
            reestablecer();
        });


        $("#boton2").click(function() {
            reestablecer();
        });
        function reestablecer() {
            $("#id").val("");
            $("#nombre").val("");
            $("#nota").val("");
        }
        listarEstudiantes();

 
          $("#boton3").click(function() {
  			var acumulador = 0.0,
   		    key, data, estudiante;
 			for (var i = 0; i < localStorage.length; i++) {
    			key = localStorage.key(i); 
    			data = localStorage.getItem(key); 
    			estudiante = JSON.parse(data); 
    			acumulador += parseFloat(estudiante.nota, 10);
  			}
  			var promedio = acumulador / localStorage.length;

  			alert("La nota votación es: " + promedio);

});

        $("#boton4").click(function() {

			var alta = [];
			for(var i= 0; i < localStorage.length; i++){
			var clave = localStorage.key(i);
			estudiantes = $.parseJSON(localStorage.getItem(clave));
			alta[i] = estudiantes.nota;
			}
			alert("La Calificación mas alta es de: " + Math.max.apply(null, alta));
			});
          $("#boton5").click(function() {

			var alta = [];
			for(var i= 0; i < localStorage.length; i++){
			var clave = localStorage.key(i);
			estudiantes = $.parseJSON(localStorage.getItem(clave));
			alta[i] = estudiantes.nota;
			}
			alert("La Calificación mas alta es de: " + Math.min.apply(null, alta) );
			});
    });