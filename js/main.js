

// selektujemo element u koji cemo stavljati rase pasa
var select = document.querySelector('#breeds');

// selektujemo dugme koje ce kreirati EVENT
// pomocu kojeg cemo izbaciti 5 nasumicnih slika za datu rasu pasa
var searchButton = document.querySelector('#button-load');

// selektujemo element u koji cemo smestati slike
var imagesContainer = document.querySelector(".image");

// selektujemo element kojim pokrecemo slike na svakih 5 sekundi
var randomButton = document.querySelector('#random-button');

// selektujemo element kako bi dodali rasu pasa u naslov,
// svaki put kada izaberemo odredjenu rasu
var breedName = document.querySelector("#breed-name");

// selektujemo element koji se prikazuje dok se ne ucita slika
var loader = document.querySelector('#load');

// selektujemo element koji cemo koristiti za naslov
var breedName = document.querySelector(".breed-name");

// funkcija kojom saljemo REQVEST na API DOG
function reqDog() {
    // URL uzimamo iz DOG API dokumentacije
    var url = 'https://dog.ceo/api/breeds/list/all';

    var request = new XMLHttpRequest();

    request.open('GET', url);

    request.onload = function() {
        var response = (JSON.parse(request.responseText).message)
        // ako dobijemo objekat, da bi pretvorili u NIZ
        listBreeds(Object.keys(response));
    }

    request.send();
}

// f-ja kojom prolazimo kroz niz koji dobijemo slanjem REQUESTA
// i pozivamo f-ju kojom cemo da pravimo elemente
function listBreeds(breeds) {
    breeds.forEach(function(breed) {
        addBreed(breed);
    })
}

// f-ja kojom pravimo elemente gde cemo da smestamo rase pasa i slike
function addBreed(name) {
    // kreiramo element <option> koji cemo dodati
    // u element <select> koji smo kreirali u HTML
    var option = document.createElement('option');
    option.classList.add('breed');
    option.value = name;
    option.innerHTML = name;

    // na element SELECT dodajemo element OPTION
    select.appendChild(option);
}

// f-ja koja salje REQUEST za slike pasa kada kliknemo na dugme
function reqImageDog(breed) {
      // selektujemo da dobijemo vrednost koju cemo koristiti
      // da spojimo rasu pasa sa slikama
      var breed = document.querySelector("#breeds").value;
      // selektujemo element odakle uzimamo vrednost za slike
      var imageCount = document.querySelector("#image-count").value;
      // url dobijamo iz DOG API dokumentacije
      var url = 'https://dog.ceo/api/breed/' + breed + '/images/random/' + imageCount;
      var newReq = new XMLHttpRequest();

      newReq.open("GET", url);

      newReq.onload = function() {
          listImagesBreeds(JSON.parse(this.responseText).message);
          // var data = JSON.parse(this.responseText).message;
          // console.log(data)
      };

      newReq.send();
}

// f-ja kojom prolazimo kroz niz sa slikama,
// koje dobijemood poslatog REQUESTA i pozivamo f-ju,
// kojom pravimo elemente za slike
function listImagesBreeds(images) {
      // koristimo da nam se slike ne bi dodavale jedna ispod druge,
      // vec posle svakog novog SEARCH-a dobijamo neve slike iz pretrage
      imagesContainer.innerHTML = "";
      images.forEach(function(image) {
          addImage(image);
      })
}


function addImage(url) {
    // podesavamo ime rase u naslovu, kada kliknemo na odredjenu rasu
    // njeno ime se pojavi u naslovu
    breedName.innerHTML = select.value;

    //  kreiramo elemenat <img src="url" /> koji ce biti ska psa
    var img = document.createElement("img");
    img.classList.add('dog')
    img.src = url;

    // na imageContainer koji smo definisali u HTML-u,
    // dodajemo polje element koji je primio 5 random slika
    imagesContainer.appendChild(img);


    // ukoliko zelimo da ukljucimo LOADER
    //   imagesContainer.style.display = "none";
    //   loader.style.display = "block";
    //
    //   setTimeout(() => {
    //     loader.style.display = "none";
    //     imagesContainer.style.display = "block";
    // }, 1000)
}


function randomImage(images) {
    setInterval(function() {
        reqImageDog(images)
    }, 10000)
}



reqDog();
randomImage();

// init
searchButton.addEventListener('click', reqImageDog);
