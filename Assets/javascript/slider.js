
myfunc("active");

async function myfunc(msg) {
    try{
    let response= await fetch("Assets/json/slider.json");     //fetch method will get data from source
    let prods= await response.json();                         //the data will extracted in json format using json() method

    let box=document.getElementById("containerr11");
    box.innerHTML="";
    let obj= prods.filter(pro=>pro.filter===msg);             // desired content will be filtered from the prods(whole data)
    
    
    obj.forEach((product) => {
        let card=document.createElement("div");               //creating div container tag 
        card.classList.add('swiper-slide');                   
        let temp=''
        let colorz='';
        if(msg==='active')                                    //condition used for assigning different colors for view button
          colorz="btn-success";
        else if(msg==='missed'){
          colorz='btn-danger';
        }
        else if(msg==='upcoming'){
          colorz='btn-warning';
          temp='<style>img{ filter:grayscale(100%);}</style>'
        }
        
        temp+=`      <div class="card" class="h-100">
                        <img src="${product.img}"  alt="img" class="img-fluid border card-img-top" style="width: 16rem;height: 16rem">
                        <div class="card-body" id="my-card"style="padding-top:20px;">                     
                            <p><b>${product.name}</b></p>
                            <p> Product cost:<strike>${product.price}</strike></p>
                            <p>Final price: ${product.price-(product.price/100*product.Discount)} (${product.Discount}% off)</p>
                            <p>Rating:${starRepeat(product.Rating)}</p>
                            <button type="button" class="btn ${colorz}">View</button>
                        </div>
                      </div>`;
                      
        card.innerHTML=temp;                    //string in temp variable will be assigned to card for DOM update
        box.appendChild(card);
  });

  resetSwiper();

}
catch(error){
    console.log("error:", error);             //message if any errors occured
}

}

function starRepeat(star){                  // function used for getting star rating 
    let stars = "";

    for(let i = 1; i <= 5; i++){
        if(i <= star)
            stars += '<i class="bi bi-star-fill"></i>';
        else
          stars += '<i class="bi bi-star"></i>';
        }
      return stars;
    }

    
    // var swiper;
    function resetSwiper() {                        //function used for resetting swiper
       if (window.swiperInstance) {
        window.swiperInstance.destroy();
      }
      window.swiperInstance = new Swiper(".mySwiper", {
        slidesPerView: slidersCount(),
        spaceBetween: 30,
        freeMode:true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    function slidersCount(){                            //function used for setting number of slides for different devices.
        var len=window.innerWidth;
        var scr;
        console.log("len", len);
        if(len<576){
          scr=1;
        }
        else if(len>=576&&len<992){
          scr=2;
        }
        else if(len>=992&&len<1200){
          scr=3;
        }
        else{
          scr=4;
        }
        return scr;
    }

    window.addEventListener('resize',function(){            //if resizing event occurs this function will be executed
      resetSwiper();
    });
