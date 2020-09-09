// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:3025/todos
// e fare le 4 operazioni Create, Read, Update e Delete.

$(document).ready(function(){

  getData();

});


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
    var context = {
      text: data[i].text,
      id: data[i].id
    };
    var html = template(context); // Da mettere necessariamente all'interno del ciclo, fuori andrebbe poi ad appendere solo l'ulitmo risultato del ciclo.
    $(".todos").append(html);  // Inserisco/appendo nel DOM.
  }
}




// var context = risposta[i]; // il mio context, rappresentato dalle i di risposta, che sono degli oggetti.
