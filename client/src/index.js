import { Request } from "./requests";
import {UI} from "./ui";


const portfolioItems = document.getElementById("portfolio").firstElementChild.children[1];
const pageSlider = document.getElementById("slider").firstElementChild;
const navbar = document.getElementById("navbar");
const Body = document.getElementsByTagName("BODY")[0];

const request = new Request("http://localhost:5000/api/");
const ui = new UI();

let albums;

eventListener();

function eventListener(){
    document.addEventListener("DOMContentLoaded", getAllAlbums);
    pageSlider.addEventListener("click", slidePage);
    portfolioItems.addEventListener("click", clickItem);
    navbar.addEventListener("click", clickLoginPage);
    Body.addEventListener("click", loggedIn);
    Body.addEventListener("click", posting);

}

function getAllAlbums(){
    request.get("album/?page=1")
    .then(album => {
        ui.addAllAlbumToUI(album);
        ui.addAlbumSlider(album);
        albums = album;
    })
    .catch(err => console.log(err));
};

function slidePage(e){
    request.get("album/?page=" + Number(e.target.textContent))
    .then(album => {
        ui.addAllAlbumToUI(album);
        ui.setCurrentSlider(e.target);
        albums = album;
        console.log(albums)
    })
    .catch(err => console.log(err));

};

function clickItem(e){
    if(e.target.textContent && albums){
        albums.data.forEach(el => {
            if(el.title === e.target.textContent){
                ui.setAlbumDetailsToUI(el);
                window.location = ("#portfolio");
            };
        });
    };
};

function clickLoginPage(e){
    if(e.target.textContent === "Giriş"){
        ui.loginPageToUI();
    };
};

function loggedIn(e){
    if(e.target.textContent === "Giriş Yap"){
        const emailInput = document.getElementById("loginName");
        const passwordInput = document.getElementById("loginPassword");
        let url = "auth/login";

        let data = {
            email:emailInput.value.trim().toString(),
            password:passwordInput.value.trim().toString()
        }

        // let data = {
        //     email:"ucankaravan@gmail.com",
        //     password:"123456"
        // }

        request.post(data, url).then(el =>{
            if(el.succes){
                document.cookie = "access_token: " + el.acces_token;
                ui.adminPanelToUI();
            }
            else{
                ui.displayMessages(el.message, "warning")
            }
        } 
        ).catch(err => console.log(err))
        
        
    };
    
};

function posting(e){
    if(e.target.name === "addItem"){

        const title = document.getElementById("title");
        const content = document.getElementById("content");
        const video = document.getElementById("video");
        const images = document.getElementById("images");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer: " + document.cookie.split(":")[1].trim());

        var formdata = new FormData();
        

        for(let i = 0; i<images.files.length; i++){
            formdata.append("album_images", images.files[i]);
        };
        

        formdata.append("title", title.value);
        formdata.append("content", content.value);
        formdata.append("videoUrl", video.value);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/album/addalbum", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    };
    
};