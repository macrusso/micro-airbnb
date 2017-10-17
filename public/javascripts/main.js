$(document).ready(function(e){

    $(".button-collapse").sideNav();

    $('#search-icon').click(function(e){
        $('#search-icon').hide();
        $('#search-div').fadeIn();
        $('#search-txt').focus();
    });

    $('#search-txt').blur(function(e) {
        $('#search-div').hide();
        $('#search-icon').fadeIn();
    });

    $(document).ready(function(){
    $('.materialboxed').materialbox();
  });
        

});
