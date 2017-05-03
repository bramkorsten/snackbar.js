/*
 * Snackbar.js
 * Copyright 2017
 * Authors: Bram Korsten
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 */

var link = document.createElement( "link" );
link.href = "https://rawgit.com/bramkorsten/snackbar.js/v1.2.0/snackbar.css";
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName( "head" )[0].appendChild( link );

$.easing.material = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
}

function snackbar() {

  var type = 'message';
  var active = false;

  this.success = function(message) {
    this.type = "message";
    createContainer(message, this.type);
  };

  this.error = function(message) {
    this.type = "error";
    createContainer(message, this.type);
  };

  function createContainer(message, type) {
    var timeout;
    if (active) {
      clearTimeout(timeout);

    $('.snackbar-wrapper').stop().animate(
                    {
                        bottom: '-50px'
                    },
                    500,
                    function() {
                        $('.snackbar-wrapper').remove();
                      newContainer();
                    }
                );
      active = false;
    }
    else {
      newContainer();
    }
    function newContainer() {
      var snackbarcontainer = document.createElement("div");
      snackbarcontainer.className = "snackbar-wrapper";
      snackbarcontainer.innerHTML = '<p>' + message + '</p><a>dismiss</a>';
      document.body.appendChild(snackbarcontainer);
      active = true;
      $( ".snackbar-wrapper a" ).click(function() {
              $('.snackbar-wrapper').stop().animate(
                      {
                          bottom: '-50px'
                      },
                      500, "material",
                      function() {
                          $('.snackbar-wrapper').remove();
                          active = false;
                      }
                  );
      });
      $(".snackbar-wrapper").addClass(type);
      $(".snackbar-wrapper").stop().animate({ bottom:'0' }, 500, "material");
      $(".snackbar-wrapper p").stop().animate({ opacity:'1' }, 500, "material");
      timeout = setTimeout(function(){
        $('.snackbar-wrapper').stop().animate(
                      {
                          bottom: '-50px'
                      },
                      500,
                      function() {
                          $('.snackbar-wrapper').remove();
                          active = false;
                      }
                  );
      }, 5000);
    }
  }
}

var snackbar = new snackbar();
