$(window).ready(() => {
    let wHeight = $(window).height();
    $('.mainContainer').css('height', wHeight - 100);
    $('.loading').css('visibility', 'visible');
});

$(document).ready(() => {
    var query = localStorage.getItem('querySearched');
    $.get('http://localhost:3000/Search/queries/'+query, (data) => {
        console.log(data);
        data.map((pics) => {
            $('.imageContainer').append('<img src="'+ pics +'" class="col s8 m5 l4">');
        });
        $('.loading').css('visibility', 'hidden');
    })
});

const closeWindow = () => {
    window.close();
}