$(window).ready(() => {
    let wHeight = $(window).height();
    $('.mainContainer').css('height', wHeight - 100);
    $('.loading').css('visibility', 'visible');
});

$(document).ready( () => {
    $.get('http://localhost:3000/Search/queries', (results) => {
        console.log(results[0].query);
        results.map((result) => {
            $('#buttonContainer').append('<button class="waves-effect waves-light btn" id="nextPage" onclick="fetchNextPage(\''+result.query+'\');">'+result.query+'</button>')
        })
        $('.loading').css('visibility', 'hidden');
    })
});

const fetchNextPage = (query) => {
    console.log(query);
    localStorage.setItem("querySearched", query);
    window.open('nextPage.html');
};