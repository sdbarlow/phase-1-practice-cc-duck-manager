// write your code here!
let currentDuck;
fetch("http://localhost:3000/ducks")
.then((response) => response.json())
.then((ducks) => {
    //display duck images in nav bar
    renderDuckImages(ducks);
    //displays details of clicked duck
    renderDuckDetails(ducks[0]);
    //increment likes
    likeIncrementor();
    renderNewDuck();

})

function renderDuckImages(obj){
    obj.forEach(element => {
        let img = document.createElement("img");
        let navBar = document.querySelector("#duck-nav");
        navBar.appendChild(img);
        img.src = element.img_url;
        img.addEventListener("click", () => {
            renderDuckDetails(element)
        })
    });
}

function renderDuckDetails(obj){
    currentDuck = obj;
    let name = document.querySelector("#duck-display-name");
    let duckImg = document.querySelector("#duck-display-image");
    let numOfLikes = document.querySelector("#duck-display-likes");
    name.textContent = currentDuck.name;
    duckImg.src = currentDuck.img_url;
    numOfLikes.textContent = currentDuck.likes;
}

function likeIncrementor(){
    let btn = document.querySelector("#duck-display-likes");
    btn.addEventListener("click", (e) => {
        btn.textContent++
        currentDuck.likes = btn.textContent;
        renderDuckDetails(currentDuck);
    })
}

function renderNewDuck(){
    let form = document.querySelector("#new-duck-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let nameQuery = document.querySelector("#duck_name_input");
        let imgQuery = document.querySelector("#duck-image-input");
        currentDuck.name = nameQuery.value;
        currentDuck.img_url = imgQuery.value;
        currentDuck.likes = 0;
        let newDuck = 
            {
              "name": currentDuck.name,
              "img_url": currentDuck.img_url,
              "likes": currentDuck.likes,
            };
        renderDuckDetails(currentDuck);
        renderNewestDuck(newDuck);

    })
}

function renderNewestDuck(element){
        let imgNew = document.createElement("img");
        let navBar = document.querySelector("#duck-nav");
        //navBar.appendChild(imgNew);
        imgNew.src = element.img_url;
        imgNew.addEventListener("click", (e) => {
            console.log(element);
            renderDuckDetails(element)
        })
        navBar.appendChild(imgNew);
}


