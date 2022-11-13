
let searchUrl =
  'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl =
  'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
let linkListUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=links&rvprop=content&format=json&titles=';
// https://en.wikipedia.org/w/api.php?action=query&prop=links&rvprop=content&format=json&titles=minecraft
let randomPageUrl = 'https://en.wikipedia.org/api/rest_v1/page/random/summary'

let userInput;

let randPage1;
let randPage2;
let originalPage;
let originToDestPage;

let countMax = 6;
let counter = 0;
let divCount = 0;


let choiceButton1;
let choiceButton2;
let choiceButton3;

let pages = [originalPage, randPage1, randPage2];

let titles  = [];

let path = "";


function setup() {
  noCanvas();
  shuffle(pages, true);

  console.log("test");
  let chosen = floor(random(0,3));

  let button = createButton('new hint');
  button.position(500,68);
  button.mousePressed(startSearch);

  let guessButton = createButton('make guess');
  guessButton.position(400,68);
  guessButton.mousePressed(makeGuess);

  let newGameButton = createButton('new start');
  newGameButton.position(600,68);
  newGameButton.mousePressed(newGame);

  let input = createInput();
  input.position(800,800);

  choiceButton1 = createButton("");
  choiceButton2 = createButton("");
  choiceButton3 = createButton("");
  choiceButton1.position(750,30);
  choiceButton2.position(750,60);
  choiceButton3.position(750,90);
  choiceButton1.mousePressed(buttonGuessOne);
  choiceButton2.mousePressed(buttonGuessTwo);
  choiceButton3.mousePressed(buttonGuessThree);



  genPages();
  
  console.log(chosen);


  function newGame() 
  {
    window.location.reload();

    // console.log("rand page 1: " + randPage1.title);
    // console.log("rand page 2: " + randPage2.title);
    // console.log("original page: " + originalPage.title);
    // choiceButton1.html('das64dsa9da4d');

    // setup();
  }

  function makeGuess(inp) {
    let guess = input.value().toLowerCase();
    if(inp != null) 
    {
      guess = inp.toLowerCase();
    }
    console.log(originalPage.title);
    let correct = originalPage.title.toLowerCase();
    let correctstate = correct.includes(guess);
    console.log(correctstate);
    console.log("guess: " + guess);
    console.log("originalpagetitle: " + correct);

    if (correctstate) {
      createDiv("you are correct yaye!");
      createDiv(path);

    }
    else 
    {
      createDiv("you are incorrect, not yaye!");
    }
    
  }

  function startSearch() {
    console.log(originalPage.title);
    counter = 0;

    choiceButton1.html(titles[0]);
    choiceButton2.html(titles[1]);
    choiceButton3.html(titles[2]);



    goWiki(originalPage.title);
  }

  function buttonGuessOne () {
    console.log(titles[0]);
    makeGuess(titles[0].substring(0,4));
  }

  function buttonGuessTwo () {
    console.log(titles[1]);
    makeGuess(titles[1].substring(0,4));

  }

  function buttonGuessThree () {
    console.log(titles[2]);
    makeGuess(titles[2].substring(0,4));

  }


  function genPages() 
  {
    randPage1 = getRandomTitle(0);
    randPage2 = getRandomTitle(1);
    originalPage = getRandomTitle(2);

  //   switch (chosen) 
  // {
  //   case 2:
  //     console.log("case 2 hit");
  //     randPage1 = getRandomTitle(0);
  //     randPage1.number = 0;
  //     randPage2 = getRandomTitle(1);
  //     randPage2.number = 1;
  //     originalPage = getRandomTitle(2);
  //     originalPage.number = 2;

  //   break;
  //   case 1:
  //     console.log("case 1 hit");

  //     randPage2 = getRandomTitle(0);
  //     randPage2.number = 0;
  //     originalPage = getRandomTitle(1);
  //     originalPage.number = 1;
  //     randPage1 = getRandomTitle(2);
  //     randPage1.number = 2;
  //   break;
  //   case 0:
  //     console.log("case 0 hit");

  //     originalPage = getRandomTitle(0);
  //     originalPage.number = 0;
  //     randPage1 = getRandomTitle(1);
  //     randPage1.number = 1;
  //     randPage2 = getRandomTitle(2);
  //     randPage2.number = 2;
  //   break;
  //   }
  }

  function goWiki(term) {
    if (counter == 0) 
    {
      path = term + "  -->  ";
    }
    counter = counter + 1;
    
    // path += term + "  -->  "

    if (counter < countMax) {
      //let term = userInput.value();
      let url = searchUrl + term;
      // path += "<br>";
      loadJSON(url, gotSearch, 'jsonp');
    }
  }

  function gotSearch(data) {
    // console.log(data);
    let len = data[1].length;
    let index = floor(random(len));
    let title = data[1][index];
    if(title == null) {
      console.log("unable to crawl");
      return;
    }
    title = title.replace(/\s+/g, '_');

    // createDiv(title);
    if (counter > (countMax-2)) {
      createDiv(title);
    }
    // console.log('Querying: ' + title);
    let url = contentUrl + title;
    getLinks(title);
    // loadJSON(url, gotContent, 'jsonp');
  }

  function getRandomTitle(data) {
    // console.log("hit");
    let number = data;
    // console.log(number);
    // createDiv(number);
    let p = loadJSON("https://en.wikipedia.org/api/rest_v1/page/random/summary" ,addDiv , 'json');
    // createDiv(p.title);
    return p;
  }

  function addDiv(data) {
    createDiv(data.title);
    titles.push(data.title);
    divCount++;
  }

  function gotSearchRandom(data) {
    // if(counter == 0) 
    // {
    //   path = "";
    // }
    
    console.log(data);
    let len = data[1].length;
    let index = floor(random(len));
    let title = data[1][index];
    title = title.replace(/\s+/g, '_');
    createDiv(title);
    path += title + "  -->  ";
    // console.log('Querying: ' + title);
    let url = contentUrl + title;
    // getLinks(title);
    // return title;
    // loadJSON(url, gotContent, 'jsonp');
  }

  function getLinks(title) 
  {
    let url = linkListUrl + title;
    loadJSON(url, gotLinks, 'jsonp')
  }

  function gotLinks(data) 
  {
    let page = data.query.pages;
    let pageId = Object.keys(data.query.pages)[0];
    let content = page[pageId].links;
    // console.log("content of links: ");
    // console.log(content);
    let chosenLink = random(content);
    // console.log("thing to search next: " + chosenLink.title);
    // if(counter == 0 )
    // {
    //   path = "";
    // }
    if(counter < countMax) 
    {
      console.log("hit 1");
      console.log(counter - countMax);
      if((counter - countMax) != -1)
      {
        path += chosenLink.title + " -->  ";
      }
      else
      {
        path += chosenLink.title;
      }

    }
    // else 
    // {
    //   console.log("hit 2");

    //   path += chosenLink.title;
    // }
    goWiki(chosenLink.title);

  }

  function gotContent(data) {
    let page = data.query.pages;
    let pageId = Object.keys(data.query.pages)[0];
    // console.log(pageId);
    let content = page[pageId].revisions[0]['*'];
    // console.log(content);
    let wordRegex = /\b\w{4,}\b/g;
    let words = content.match(wordRegex);
	  // console.log(words);
    let word = random(words);
	  // console.log(word);
    // goWiki(word);
    // console.log(word);
  }

}