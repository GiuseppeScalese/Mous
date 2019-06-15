/*
  Scripts for handling all scripts
  Plugin used: None
  Author: Giuseppe Scalese
*/

// check whether or not namespace exist
var mainScript = mainScript || {}

//create my app namespace
var mainScript = (function() {

    //public funtion - initialise slick carousel
    var slickInit = function(){
      $('#hero-carousel').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000
      });
    }

    //public funtion - handles side menu funtionalities open/close events
    var sideMenu = function(){
      //open event side menu listener
      document.getElementById("open-sidenav").addEventListener("click", function(){
        document.getElementById("sidenav").classList.add("open-sidenav");
      });

      //close event side menu listener
      document.getElementById("close-sidenav").addEventListener("click", function(){
        document.getElementById("sidenav").classList.remove("open-sidenav");
      });
    }

    return {
        slickInit: slickInit,
        sideMenu: sideMenu
    }

})()
mainScript.slickInit();
mainScript.sideMenu();
