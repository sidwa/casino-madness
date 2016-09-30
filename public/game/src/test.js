
var temp = null;
function getData () {  
    $.ajax({
        url: "src/test.json",
        dataType: 'json',
        async: false,
        success: function(data) {
            temp = JSON.stringify(data);
        }
    });
}
getData();
alert(temp);