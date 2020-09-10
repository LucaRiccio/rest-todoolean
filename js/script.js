// Completare l’esercizio iniziato a lezione sulla todo-list.
// Utilizzare l’API di esempio http://157.230.17.132:3025/todos
// e fare le 4 operazioni Create, Read, Update e Delete.

$(document).ready(function(){

  getData();

  $(document).on('click', '.delete', function(){  // Utilizzato on Click perchè gli elementi sui quali operiamo sono creati dinamicamente.
    var elemento = $(this); // Salvo in una variabile il this (facoltativo, non è necessario).
    var idToDo = elemento.parent().attr('data-id'); // Sull'elemento cliccato (this), risalgo al genitore (<li>) e ne prendo l'attributo (data-id).
    deleteElement(idToDo); // Invoco una funzione in cui passo come argomento la variabile idToDo (che per come è stata creata contiene l'id).
  });

  $(".inserisci").click(function(){ // Al click del pulsante inserisci
    var newElement = $("#nuova-voce").val(); // Prendo il valore della casella input
    createElement(newElement); // Invoco una funzione che ha per argomento il valore della casella input salvato in var.
  })

  $(document).on('click', 'span.testo', function(){
    var questo = $(this);
    $(".testo").removeClass("hidden");
    questo.addClass("hidden");
    $(".testo").next().addClass("hidden");
    questo.next().removeClass("hidden");
  });

  $(document).on('keydown','.sovrascrivi',function(){
    var idNewElement = $(this).parent().attr('data-id');
    if (event.which == 13 || event.keyCode == 13){
      var newElement = $(this).val();
      updateElement(idNewElement,newElement);
    }
  });

});


// *** FUNZIONI ***

function updateElement(id,elemento){ // chiamata AJAX per modificare i dati "trasformata" in funzione
  $.ajax(
    {
      url: 'http://157.230.17.132:3025/todos/' + id,
      method: 'PUT',
      data:{
        text:elemento
      },
      success: function(risposta){
        $(".todos").html('');
        getData(); //
      },
      error: function(){
        alert("Errore");
      }
    }
  );
}


function createElement(elemento){

  $.ajax(
    {
      url: 'http://157.230.17.132:3025/todos',
      method: 'POST',
      data:{        // <---- necessario il data
        text: elemento
      },
      success: function(risposta){
        $(".todos").html('');
        getData();
      },
      error: function(){
        alert("Errore");
      }
    }
  );
}

function deleteElement(id){
  $.ajax(
    {
      url: 'http://157.230.17.132:3025/todos/' + id,
      method: 'DELETE',
      success: function(risposta){
        $(".todos").html(''); // Svuoto il contenuto...
        getData(); // e richiamo nuovamente la funzione per ottenere i dati.
      },
      error: function(){
        alert("Errore");
      }
    }
  );
}


function getData(){ // chiamata AJAX per ottenere i dati "trasformata" in funzione
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

function getElement(data){                  // <---- Ciò che generalmente inserisco nella function del success della chiamata, ma tradotto in funzione.
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < data.length; i++){ // Ciclo For per scorrere l'array.
    var context = {       // Avrei potuto usare var context = risposta[i];
      text: data[i].text,
      id: data[i].id
    };
    var html = template(context); // Da mettere necessariamente all'interno del ciclo, fuori andrebbe poi ad appendere solo l'ulitmo risultato del ciclo.
    $(".todos").append(html);  // Inserisco/appendo nel DOM.
  }
}
