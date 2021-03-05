function dynLoad() {
    $.get( "https://smileschool-api.hbtn.info/quotes", function( data ) {
        $( ".result" ).html( data );
        for (i of data) {
            createSlide(i);
        }

        $('#slide-1').addClass('active');
        $('#load-slide').remove();
      });
}

function createSlide(data) {
    id = data.id;
    named = data.name;
    title = data.title;
    quote = data.text;
    url = data.pic_url

    $('#slide-add').append(`<div class='carousel-item carousel1-item' id='slide-${id}'><div class='d-flex p-5 align-items-center justify-content-around flex-md-nowrap flex-wrap'><img class='rounded-circle mr-5 ml-5' id='picture' src='${url}' alt='First slide'><div class='mr-auto'><h4 class='mb-3' id='quote'>${quote}</h4><p class='name mb-0 mt-2' id='name'>${named}</p><p class='sub' id='title'>${title}</p></div></div></div>`);

}





function stars(data) {
    
    for (i=1; i <= 5; i++) {
        if (i < data.star) {
            $(`#star-${data.id}`).last().append('<img class="star" src="/assets/images/images/star_on.png">');
        } else {
            $(`#star-${data.id}`).last().append('<img class="star" src="/assets/images/images/star_off.png">');
        }
    };
}

function cardMake(data, id) {
    $(`#addCard-${id}`).append(`<div class='col-lg-3 col-md-6 col-sm-12'>
    <div class="card">
        <img class="card-img-top holder" src="${data.thumb_url}">
        <img class="rounded-circle overlay" src="assets/images/images/play.png">
    
        <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data['sub-title']}</p>
        </div>
        <div class="card-footer border-0 bg-transparent">
            <div>
                <img class="rounded-circle w-25 footer-img pr-2" src="${data.author_pic_url}">
                <small class="popular">${data.author}</small>
            </div>
    
            <div class="mt-2 d-flex justify-content-between">
                <div id='star-${data.id}'>
                    
                </div>
                <small class="popular">${data.duration}</small>
            </div>
        </div>
    </div>
    </div>`);

    stars(data);

    
}

function carLoader() {
    $.get( "https://smileschool-api.hbtn.info/popular-tutorials", function( data ) {
        $( ".result" ).html( data );

        let x = 1;
        let numItem = 0;
        $('#inner').append(`<div class="carousel-item active">
                <div class="container">
                    <div id="addCard-${numItem}" class="row">
                    </div>
                </div>
            </div>`);

        for (i of data) {
            cardMake(i, numItem);
            if (((parseInt(x)) % 4) == 0) {
                console.log(x + 1);
                numItem += 1;
                $('#inner').append(`<div class="carousel-item">
                <div class="container">
                    <div id="addCard-${numItem}" class="row">
                    </div>
                </div>
                </div>`);

            }
            x += 1;
        }
        $('#c-load-slide').remove();

    });


}






// console.log("lol")
// window.onload(dynLoad());

window.onload = function() {
    dynLoad();
    carLoader();
}