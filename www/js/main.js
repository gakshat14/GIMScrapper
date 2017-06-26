let query;

$(window).ready(() => {

    let wHeight = $(window).height();
    $('.mainContainer').css('height', wHeight - 100);
    $('.loading').css('visibility', 'hidden');
    
});

$('#fetchButton').prop('disabled', true);
// $('#SearchQuery').focusout(()=>{
//     if($('#SearchQuery').val() == null || $('#SearchQuery').val() == undefined || $('#SearchQuery').val() == ""){
//         $('#fetchButton').prop('disabled', true); 
//     }
// });

$('#SearchQuery').change(() => {

    query = $('#SearchQuery').val();

    console.log(query);
    
    if(query != ""){
        $('#fetchButton').prop('disabled', false);
    } else if (query == ""){
        $('#fetchButton').prop('disabled', true);
    }

});

const fetch = () => {

    $('.imageContainer').empty();

    $('.loading').css('visibility', 'visible');

    $.post('http://localhost:3000/Search/queries/'+query, (data) => {

        $('.loading').css('visibility', 'hidden');
        $('#SearchQuery').val(undefined);
        $('#fetchButton').prop('disabled', true);

        console.log(data);

        data.map((pics) => {
            $('.imageContainer').append('<img src="'+ pics +'" class="col s8 m5 l4">');
        })

    })
}