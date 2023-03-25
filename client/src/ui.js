export class UI{
    constructor(){
        this.updateEmployeeButton = document.getElementById("update");
        this.employeeList = document.getElementById("employees");
        this.nameInput = document.getElementById("name");
        this.salaryInput = document.getElementById("salary");
        this.departmentInput = document.getElementById("department");

        this.portfolio = document.getElementById("portfolio");
        this.pageSlider = document.getElementById("slider").firstElementChild;


    }

    addAllAlbumToUI(album){

        let result = "";
        
        album.data.forEach(album => {
            result +=
            `
            <div class="col-lg-6 portfolio-item column" style = "margin-bottom:0px !important; max-height: 500px !important;
            max-width: auto !important;">
                <img src="http://localhost:5000/uploads/album/${album.album_images[0]}" class="d-block w-100" style="max-height: 500px;
                max-width: auto;"alt="...">
                <h3 class="d-flex justify-content-center mt-3" style = "color:#3D4D6A;"><a style="max-width:30rem;word-wrap:break-word;">${album.title}</a></h3>
            </div>
            `
        });

        this.portfolio.children[0].children[1].innerHTML = result;
    };

    addAlbumSlider(album){
        
        const totalPage = Math.ceil(Number(album.pagination.total)/Number(album.count));
        let result = `<li class="page-item active"><a class="page-link" href="#portfolio">1</a></li>`;


        for(let i = 2; i<totalPage + 1; i++){
            result += `<li class="page-item"><a class="page-link" href="#portfolio">${i}</a></li>`;
        };

        this.pageSlider.innerHTML = result;

    };

    setCurrentSlider(target){


        for(let i = 0; i<this.pageSlider.childElementCount; i++){
            if(this.pageSlider.childNodes[i].textContent == target.textContent){
                this.pageSlider.childNodes[i].className = "page-item active";
            }
            else{
                this.pageSlider.childNodes[i].className = "page-item";
            };
        };


    };

    setAlbumDetailsToUI(album){

        const portfolio = document.getElementById("portfolio").firstElementChild;
        let result = "";
        let result2 = "";
        if(album.album_images){
            
            result = `
            <div class="carousel-item active">
            <img src="http://localhost:5000/uploads/album/${album.album_images[0]}" class="d-block w-100" style="max-height: 500px !important;
            max-width: auto !important;alt="...">
            </div>
            `;
            
            for(let i = 1; i<album.album_images.length; i++){
                result += 
                `
                <div class="carousel-item">
                <img src="http://localhost:5000/uploads/album/${album.album_images[i]}" class="d-block w-100"style="max-height: 500px !important;
                max-width: auto!important; alt="...">
                </div>
                `;
            };
        };

        if(album.videoUrl.length){
            result2 = `
            <iframe width="560" height="315" src="${album.videoUrl[0]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          `;
        };

        let detailsSection = `
        <div class = "mt-3" id = "backToAlbums">
            <a href = "http://localhost:3200/index.html"><i class="fa-sharp fa-solid fa-circle-chevron-left fa-3x" style = "color : #3D4D6A;"></i></a>        
        </div>
        <div class="column">
        <div class = "portfolio-item-detail" style="width: 80%; margin-left: auto; margin-right: auto;">
          <div class="col-lg-12 portfolio-item">
            <div id="carouselExampleIndicators" class="carousel slide">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                ${result}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div class="col-lg-12 portfolio-item" style = "width: 80%;">
            ${result2}
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 portfolio-item about mt-5">
            <div class="d-inline mx-auto">
              <p style="position: relative; text-align: center; color : #3D4D6A; max-width:50rempx;word-wrap:break-word; font-size:2rem;">${album.title}</p>
              <p style="position: relative; text-align: center; max-width:50rempx;word-wrap:break-word;">${album.content}</p>
            </div>
          </div>
        </div>
      </div>`
    
      portfolio.innerHTML = detailsSection;

    };

    loginPageToUI(){
        const htmlBody = document.getElementsByTagName("BODY")[0];
        let result =
         `

         <div class = "mt-3" id = "backToAlbums" style = "margin-left: 10rem; margin-top: 20rem;";>
            <a href = "http://localhost:3200/index.html"><i class="fa-sharp fa-solid fa-circle-chevron-left fa-3x" style = "color : #3D4D6A;"></i></a>        
        </div>
        <div style = "width:40vw; margin: auto; margin-top:10%">
        <div>
        <!-- Pills content -->
        <div class="tab-content">
        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form>

            <!-- Email input -->
            <div class="form-outline mb-4">
                <input type="email" id="loginName" class="form-control" />
                <label class="form-label" for="loginName">Email</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
                <input type="password" id="loginPassword" class="form-control" />
                <label class="form-label" for="loginPassword">Şifre</label>
            </div>
            </div>

            <!-- Submit button -->
            <button id= "login" type="submit" class="btn btn-primary btn-block mb-4">Giriş Yap</button>
            </form>
        </div>
        <!-- Pills content -->
        </div>
        `

        htmlBody.innerHTML = result;

    };

    adminPanelToUI(){

        const htmlBody = document.getElementsByTagName("BODY")[0];

        let result = `
        <div class = "mt-3" id = "backToAlbums" style = "margin-left: 10rem; margin-top: 20rem;";>
            <a href = "http://localhost:3200/index.html"><i class="fa-sharp fa-solid fa-circle-chevron-left fa-3x" style = "color : #3D4D6A;"></i></a>        
        </div>
        <div id="formElem" style = "width: 50%; margin: auto;">
            <div class = "row">
                <input type="text" id="title" placeholder="title" class = "m-2">
                <textarea type="text" id="content" placeholder="content" class = "m-2" style = "height: 25rem;"></textarea>
                <input type="text" id="video" placeholder="youtube embed link" class = "m-2">
                <div>
                Fotoğraflar: <input id="images" type="file" accept="image/jpeg, image/png, image/jpg" multiple class = "m-2">
                </div>
                <input type="submit" name="addItem" class = "d-block m-2" class = "col-6">
            </div>
        </div>
        `

        htmlBody.innerHTML = result;
    };

    displayMessages(message, type){
        const formDiv = document.getElementById("pills-login");
    
        // Alert divini oluşturma
    
        const div = document.createElement("div");
    
        div.className = `alert alert-${type}`;
        div.textContent = message;
        formDiv.appendChild(div);
    
        setTimeout(function(){
            div.remove();
        }, 100000);
    }

}