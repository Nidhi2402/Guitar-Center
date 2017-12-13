var slideIndex = 1;
showSlides(slideIndex);


// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//Image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("guitarImg");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    guitarDataShow(n);
    $(document).ready(function () {
        $('#buy').click(function () {
            window.location.href = "orderReview.html";
            localStorage.setItem('buyingItem', $(slides[slideIndex - 1]).html());
            guitarDataShow(n);

        });
    });
}
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
}

function guitarDataShow(n) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var a = JSON.parse(this.responseText);
            var b = a.allProducts;

//            console.log(b);
            for (i in b) {
                var c = b[slideIndex - 1];
                document.getElementById("panelOfProduct").innerHTML = c.product_description;
                document.getElementById("panelOfShipping").innerHTML = "Price is "+c.price+"<br/> "+c.shipping_details;
                document.getElementById("panelOfCustomer").innerHTML = c.customer_reviews;
                $(document).ready(function () {
                    $('#buy').click(function () {
                        window.localStorage.setItem('itemDes', JSON.stringify(b[slideIndex - 1].product_description));
                        localStorage.setItem('priceOfItem', JSON.stringify(b[slideIndex - 1].price))
                        localStorage.setItem('shippingOfItem', JSON.stringify(b[slideIndex - 1].shipping_details))
                    });
                });
            }
        }

    };
    xhttp.open('GET', 'guitardata.json', true);
    xhttp.send();

}



