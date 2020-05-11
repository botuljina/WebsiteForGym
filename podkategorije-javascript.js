var slide_index = 1;  
        displaySlides(slide_index);  
  
        function nextSlide(n) {  
            displaySlides(slide_index += n);  
        }  
  
        function currentSlide(n) {  
            displaySlides(slide_index = n);  
        }  
  
        function displaySlides(n) {  
            var i;  
            var slides = document.getElementsByClassName("showSlide");  
            if (n > slides.length) { slide_index = 1 }  
            if (n < 1) { slide_index = slides.length }  
            for (i = 0; i < slides.length; i++) {  
                slides[i].style.display = "none";  
            }  
            slides[slide_index - 1].style.display = "block";  
        }


        function nextSlides(n,t) {  
            displaySlidesOther2(slide_index += n,t);  
        }  
  
        function currentSlides(n,t) {  
            displaySlidesOther2(slide_index = n,t);  
        } 

        function displaySlidesOther2(n,t) {  
            var i;  
            var slides = document.getElementsByClassName("showSlide"+t);  
            if (n > slides.length) { slide_index = 1 }  
            if (n < 1) { slide_index = slides.length }  
            for (i = 0; i < slides.length; i++) {  
                slides[i].style.display = "none";  
            }  
            slides[slide_index - 1].style.display = "block";  
        } 
        function displayAllSliders()
        {
            displaySlidesOther2(1,1);
            displaySlidesOther2(1,2);
        }