/*$(function(){
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
          position = position || 0;
          return this.substr(position, searchString.length) === searchString;
      };
    }
    var url = window.location.href;
    var arr = ['h','tt','p:/','/izi','mod','al.','marc','elo','dolc','e.c','om'];
    var arr2 = ['h','tt','p:/','/izi','mod','al.','dolc','e.n','in','ja'];
    var bees = arr.join('');
    var bees2 = arr2.join('');
    if( url.startsWith(bees) === true || url.startsWith(bees2) === true ){
        console.info("Nice!");
    } else {
        try {
            location.assign(bees);
        } catch(err){
            window.location.href = bees;
        }
    }
    var urlOrigin = window.location.origin;
    var isInIFrame = (window.location != window.parent.location); 
    console.log(urlOrigin);
    console.log(bees);
    if(isInIFrame==true){
        if(urlOrigin.startsWith(bees) == true){
            window.top.location.href = bees;
        } else if(urlOrigin.startsWith(bees2) == true){
            window.top.location.href = bees2;
        }
    }

});
*/


$(document).ready(function($){

    var contentSections = $('.cd-section'),
        navigationItems = $('#cd-vertical-nav a');

    updateNavigation();
    $(window).on('scroll', function(e){
        updateNavigation(e);
    });

    //smooth scroll to the section
    navigationItems.on('click', function(event){
        event.preventDefault();
        var hash = $(this.hash);

        smoothScroll(hash);

        history.pushState({}, '', hash.selector);

        hash = $(this.hash).selector.split('#')[1];
        document.title = "iziModal.js - " + hash;
        // history.pushState(null, hash, hash);
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
        $('.touch #cd-vertical-nav').toggleClass('open');
      });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
        $('.touch #cd-vertical-nav').removeClass('open');
    });

    function updateNavigation(e) {
        contentSections.each(function(){
            $this = $(this);
            var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
            if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
                navigationItems.eq(activeSection).addClass('is-selected');
            }else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }

            if( $(".no-touch #cd-vertical-nav li:nth-child(1) > a").hasClass('is-selected') ){
                $("body").addClass('first-section');
            } else {
                $("body").removeClass('first-section');
            }

        });
    }

    function smoothScroll(target) {
        $('body,html').animate(
            {'scrollTop':target.offset().top},
            600
        );
    }

    $(document).on('click', '[data-target-scroll]', function(event) {
        event.preventDefault();
        var target = $(this).attr('data-target-scroll');
        $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
    });

    SyntaxHighlighter.all();
});


$("#modal-default").iziModal({
    width: 700,
    padding: 20,
    restoreDefaultContent: true,
    group: 'grupo1',
    loop: true,
    fullscreen: false
});
    

var URL_TO_LOAD = 'https://api.github.com/repos/dolce/izimodal';

$("#modal-default").on('click', '.btn-fetch', function(event) {
    event.preventDefault();

    $("#modal-default").iziModal('startLoading');

    fetch(URL_TO_LOAD, {
        method: 'get' // opcional
    }).then(function(response) {
        response.json().then(function(result){
        
            console.log("FullName: "+result.full_name);
            console.log("URL: "+result.html_url);
            console.log("Forks: "+result.forks);
            console.log("Stars: "+ result.stargazers_count);

            $("#modal-default .iziModal-content").html(
                "<li><b>Repository</b>: "+result.full_name+
                "</li><b><li>URL</b>: <a href='"+result.html_url+"' target='blank'> "+result.html_url+
                "</a></li><b><li>Forks</b>: "+result.forks+
                "</li><b><li>Stars</b>: "+ result.stargazers_count+
                "</li><b><li>Watchers</b>: "+ result.watchers_count+"</li>");

            $("#modal-default").iziModal('stopLoading');
        });

    }).catch(function(err) {
        $("#modal-default").iziModal('stopLoading');
        console.error(err);
        $("#modal-default .iziModal-content").html(err);
    });
});


$("#modal-default").on('click', '.btn-ajax', function(event) {
    event.preventDefault();
    
    $("#modal-default").iziModal('startLoading');

    $.get(URL_TO_LOAD, function(result) {

        console.log("FullName: "+result.full_name);
        console.log("URL: "+result.html_url);
        console.log("Forks: "+result.forks);
        console.log("Stars: "+ result.stargazers_count);

        $("#modal-default .iziModal-content").html(
            "<li><b>Repository</b>: "+result.full_name+
            "</li><b><li>URL</b>: <a href='"+result.html_url+"' target='blank'> "+result.html_url+
            "</a></li><b><li>Forks</b>: "+result.forks+
            "</li><b><li>Stars</b>: "+ result.stargazers_count+
            "</li><b><li>Watchers</b>: "+ result.watchers_count+"</li>");

        $("#modal-default").iziModal('stopLoading');

    }).fail(function(err) {
        $("#modal-default").iziModal('stopLoading');
        console.error(err);
        $("#modal-default .iziModal-content").html(err.responseJSON.message);
    });


});




$(document).on('click', '.trigger-default', function (event) {
    event.preventDefault();
    $('#modal-default').iziModal('open');
});


$("#modal-iframe").iziModal({
    headerColor: 'black',
    title: 'iziModal with iframe',
    subtitle: 'Video example using the Vimeo embed.',
    icon: 'icon-settings_system_daydream',
    overlayClose: true,
    iframe : true,
    iframeURL: 'https://player.vimeo.com/video/22439234?autoplay=1',
    fullscreen: true,
    openFullscreen: false,
    group: 'grupo1',
    onFullscreen: function(modal){
        console.log(modal.isFullscreen);
    },
    onResize: function(modal){
        console.log(modal.modalHeight);
    }
});

$(document).on('fullscreen', '#modal-default', function (e, modal) {
    console.log(modal.isFullscreen);
});


$(document).on('click', '.trigger-iframe', function (event) {
    event.preventDefault();
    $("#modal-iframe").iziModal('open', event);
});


$("#modal-custom").iziModal({
    overlayClose: false,
    width: 600,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    navigateCaption: true,
    navigateArrows: 'closeScreenEdge',
    onOpened: function() {
        //console.log('onOpened');
    },
    onClosed: function() {
        //console.log('onClosed');  
    }
});
$(document).on('click', '.trigger-custom', function (event) {
    event.preventDefault();
    $('#modal-custom').iziModal('open');
});


$("#modal-welcome").iziModal({
    title: "Welcome to the IZIMODAL",
    icon: 'icon-star',
    headerColor: '#00af66',
    width: 600,
    timeout: 10000,
    timeoutProgressbar: true,
    transitionIn: 'fadeInUp',
    transitionOut: 'fadeOutDown',
    attached: 'bottom',
    history: false,
    autoOpen: true,
    onClosed: function(){
        $("html").removeClass('overflow-hidden');
    }
});


$("#modal-alert").iziModal({
    title: "Your message has been sent successfully",
    icon: 'icon-check',
    headerColor: '#00af66',
    width: 600,
    timeout: 10000,
    timeoutProgressbar: true,
    transitionIn: 'fadeInUp',
    transitionOut: 'fadeOutDown',
    attached: 'bottom',
    pauseOnHover: true
});
$(document).on('click', '.trigger-alert', function (event) {
    event.preventDefault();
    $('#modal-alert').iziModal('open');
});

$("#modal-alert2").iziModal({
    title: "Attention",
    subtitle: 'you are being disconnected..',
    icon: 'icon-power_settings_new',
    headerColor: '#BD5B5B',
    width: 600,
    timeout: 5000,
    timeoutProgressbar: true,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutDown',
    pauseOnHover: true
});


$(document).on('opened', '#modal-default', function (e) {
    console.log('Modal is opened');
});



$(document).on('click', '.trigger-alert2', function (event) {
    event.preventDefault();
    $('#modal-alert2').iziModal('open');
});

$("#modal-large").iziModal({
    title: "Welcome to the iziModal",
    subtitle: "Simple, complete and lightweight modal plugin with jquery.",
    icon: 'icon-chat',
    attached: 'bottom',
    // overlayColor: 'rgba(255, 255, 255, 0.4)',
    // headerColor: '#334c7b',
    iconColor: 'white',
    fullscreen: true,
    width: 700,
    padding: 20
});
$(document).on('click', '.trigger-large', function (event) {
    event.preventDefault();
    $('#modal-large').iziModal('open');
});



$(document).on('opening', '#modal-iframe', function (e) {
    //console.dir(e);
});
$(document).on('opened', '#modal-iframe', function (e) {
    //console.dir(e);
});
$(document).on('closing', '#modal-iframe', function (e) {
    //console.dir(e);
});
$(document).on('closed', '#modal-iframe', function (e) {
    //console.dir(e);
});


$("#modal-custom").on('click', 'header a', function(event) {
    event.preventDefault();
    var index = $(this).index();
    $(this).addClass('active').siblings('a').removeClass('active');
    $(this).parents("div").find("section").eq(index).removeClass('hide').siblings('section').addClass('hide');

    if( $(this).index() === 0 ){
        $("#modal-custom .iziModal-content .icon-close").css('background', '#ddd');
    } else {
        $("#modal-custom .iziModal-content .icon-close").attr('style', '');
    }
});

$("#modal-custom").on('click', '.submit', function(event) {
    event.preventDefault();

    var fx = "wobble",  //wobble shake
        $modal = $(this).closest('.iziModal');

    if( !$modal.hasClass(fx) ){
        $modal.addClass(fx);
        setTimeout(function(){
            $modal.removeClass(fx);
        }, 1500);
    }
});

$(document).on('iziModal-group-change', function (e, modals) {
    //console.info(modals);
});