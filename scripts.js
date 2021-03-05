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
    console.log(`${data.star} from star`)

    for (i=0; i < 5; i++) {
        if (i + 1 <= data.star) {
            $(`#star-${data.id}`).last().append('<img class="star" src="/assets/images/images/star_on.png">');
        } else {
            $(`#star-${data.id}`).last().append('<img class="star" src="/assets/images/images/star_off.png">');
        }
    };
}

function cardMake(data, id) {
    $(`#addCard-${id}`).append(`<div class='col-lg-3 col-md-6 col-sm-12'>
    <div class="card border-0">
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




function stary(data) {
    console.log(`${data.star} from star`)
    
    let i;

    for (i=0; i < 5; i++) {
        if (i + 1 <= data.star) {
            $(`#stary-${data.id}`).last().append('<img class="star" src="/assets/images/images/star_on.png">');
        } else {
            $(`#stary-${data.id}`).last().append('<img class="star" src="/assets/images/images/star_off.png">');
        }
    };
}

function cardThrow(data) {
    $(`#add-here`).append(`<div class='col-lg-3 col-md-4 col-sm-12'>
    <div class="card border-0">
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
                <div id='stary-${data.id}'>
                    
                </div>
                <small class="popular">${data.duration}</small>
            </div>
        </div>
    </div>
    </div>`);
    stary(data);
}


function search(sValue, sTopic, sSort) {
    loader = `<div class="loader mt-5 mb-5" id='load'></div>`
    $('#create-here').append(loader)

    $.ajax({
        url: "https://smileschool-api.hbtn.info/courses",
        type: "get", //send it through get method
        data: { 
          q: sValue,
          topic: sTopic,
          sort: sSort
        },
        success: function(response) {
            $('#add-here').remove()
            $('#create-here').append(`<div id='add-here' class="row text-dark p-5">
            </div>`)

            console.log("here")
            console.log(response);
            for (i of response.courses) {
                console.log(i)
                cardThrow(i);
            }
            $('#load').remove();

        },
        error: function(xhr) {
          console.log("ERROOR!!!! NOT WORK!! FIND HELP!! DESTRUCTION EMMINANT")
        }
      });
}



// console.log("lol")
// window.onload(dynLoad());

window.onload = function() {


    dynLoad();
    carLoader();
    search();

    let sTal = '';
    let sTop = '';
    let sSort = '';

    $("#keyboard").on('keyup', function () {
        sTal = this.value;
        search(sTal, sTop, sSort);
        console.log(this.value)
    });

    $(".topic .dropdown-item").on('click', function () {
        sTop = this.text;
        $("#top").text(this.text);
        search(sTal, sTop, sSort);
        
    });

    $(".sort-by .dropdown-item").on('click', function () {
        sSort = this.text;
        $("#sort").text(this.text);

        sSort = sSort.replace(' ', '_');
        search(sTal, sTop, sSort);

    });
}