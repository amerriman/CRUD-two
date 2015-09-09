$(document).on('ready', function() {
  listStudents();
});

//get info from form

$('form').on('submit', function(e){
  e.preventDefault();

  $('#message').html('');

  var payload = {
    name: $('#name').val(),
    age: $('#age').val(),
    homeroom:$('#homeroom').val()
  };

  $.post('/students', payload, function(data){
    $('#message').html('Student added');
    $('#name').val("");
    $('#age').val("");
    $('#homeroom').val("");

    listStudents();
  });

});


//make function for posting students
function listStudents (){
  $('#student-list').html("");
  $.get('/students', function(data){
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      $("#student-list").append("<tr><td>"+ data[i].name+"</td><td>"+data[i].age+"</td><td>"+data[i].homeroom+"</td></tr>");
    }
  });
}

 // $("#student-list").append("<tr>"+ data[i].name+data[i].age+data[i].homeroom+"</tr>");
