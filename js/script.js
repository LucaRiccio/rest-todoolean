// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:3025/todos
// e fare le 4 operazioni Create, Read, Update e Delete.

$(document).ready(function(){

  getData();

  $(document).on('click', '.delete', function(){
    var elemento = $(this); // Salvo in una variabile il this (facoltativo, non è necessario).
    var idToDo = elemento.parent().attr('data-id'); // Sull'elemento cliccato (this), risalgo al genitore (<li>) e ne prendo l'attributo (data-id)
    deleteElement(idToDo);
  });

});

function deleteElement(id){
  $.ajax(
    {
      url: 'http://157.230.17.132:3025/todos/' + id,
      method: 'DELETE',
      success: function(risposta){
        console.log(risposta);
        $(".todos").html('');
        getData();
      },
      error: function(){
        alert("Errore");
      }
    }
  );
}


function getData(){ // chiamata AJAX "trasformata" in funzione
  $.ajax(
    {
      url: 'http://157.230.17.132:3025/todos', // URL dell' API
      method: 'GET', // Metodo GET
      success: function(risposta){
        getElement(risposta) // Richiamata un'altra funzione
      },
      error: function(){
        alert("Errore")
      }
    }
  );
}

function getElement(data){                  // <---- Ciò che generalmente inserisco nella funcrion del success della chiamata ma tradotta in funzione
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < data.length; i++){
    var context = {       // Avrei potuto usare var context = risposta[i];
      text: data[i].text,
      id: data[i].id
    };
    var html = template(context); // Da mettere necessariamente all'interno del ciclo, fuori andrebbe poi ad appendere solo l'ulitmo risultato del ciclo.
    $(".todos").append(html);  // Inserisco/appendo nel DOM.
  }
}
