$(document).ready(function(){
  $("#buscar").on("click", function(){
    $("table>body").remove();
    var id = $("#inputID").val();
    $.ajax({

      url: "https://andreihelo-restful-api.herokuapp.com/students/" + id,
      type: 'GET',
      dataType: 'json',
      error: function(){alert("Lo siento, no se ha encontrado un alumno para el id " + id + ".\n\n\t\t\tPor favor, intente de nuevo.");},
      success: function(data){
        $("table").append(  "<tbody><tr><td>" + data.id +"</td><td>"+ data.registration_number +
        "</td><td>" + data.name + "</td><td>" + data.last_name + "</td><td>" + data.status + "</td></tr></tbody>");
      }
    });
  });
  $("#todos").on("click", function(){
    $("table>body").remove();
    $.ajax({
      url: "https://andreihelo-restful-api.herokuapp.com/students",
      type: 'GET',
      dataType: 'json',
      success: function(data){
        $.each(data, function(index, item) {
          $("table").append(

            "<tbody><tr><td>" + item.id +"</td><td>"+ item.registration_number +
            "</td><td>" + item.name + "</td><td>" + item.last_name + "</td><td>" + item.status + "</td></tr></tbody>");
          });
        }
      });
    });
    $("#subir").on("click", function(){
      var idRegistro = $("#regnum").val();
      var firstName = $("#fname").val();
      var lastName = $("#lname").val();
      var statusCode = $("#status").val();
      if (idRegistro.length < 6) {
        alert("La matricula tiene que ser de al menos 6 numeros");
      }
      $.ajax({
        type: "POST",
        url: "https://andreihelo-restful-api.herokuapp.com/students/",
        data: {registration_number: idRegistro, name:firstName, last_name:lastName, status:statusCode },
        dataType: 'json',
        error: function(data){
          alert("Error agregando ID " + idRegistro + ".\n\n\t\t\tPor favor, intente de nuevo.");
        },
        success: function(){
          $.ajax({
            url: "https://andreihelo-restful-api.herokuapp.com/students",
            type: 'GET',
            dataType: 'json',
            success: function(data){
              $.each(data, function(index, item) {
                $("table tbody").append(

                  "<tr><td>" + item.id +"</td><td>"+ item.registration_number +
                  "</td><td>" + item.name + "</td><td>" + item.last_name + "</td><td>" + item.status + "</td></tr>"
                );
              });
            }
          });
        }
      });
    });
  });
