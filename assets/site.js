// sticky sidebar
$(function() {
  var top = $('#main .sidebar').offset().top;
  var footer = $('#footer').offset().top;
  var height = $('#main .sidebar').height();
  var sticky = function(){
	var scroll = $(window).scrollTop();
	if ((scroll + 20) > top) {
	  if ((scroll + 20 + height) > (footer - 20)) {
		$('#main .sidebar').addClass('sticky').css({ 'top': 'auto', 'bottom': 20 });
	  }
	  else {
		$('#main .sidebar').addClass('sticky').css({ 'top': (scroll - top + 20), 'bottom': 'auto' });
	  }
	  
	}
	else {
	  $('#main .sidebar').removeClass('sticky').css({ 'top': 'auto', 'bottom': 'auto'});
	}
  };
  sticky();
  $(window).scroll(function() {
	 sticky();
  });
});

// mobile menu dropdown implementation
$(function() {
  $('.menu').click(function () {
	var options = $(this).next('.options');
	if (options.hasClass('show')) {
	  $('body').removeClass('menu');
	  options.removeClass('show');
	  $(this).removeClass('active');
	}
	else {
	  if ($(this).parent().parent().attr('id') == 'header') $('body').addClass('menu');
	  options.addClass('show');
	  $(this).addClass('active');
	}
  });
});

// copy main links to mobile dropdown
$(function() {
  var options = $('<div class="options"></div>');

  $('#main .sidebar h2 a, #main .sidebar h3 a').each(function () {
	if (!$(this).parent().parent().hasClass('active')) {
	  var that = $(this).clone();
	  options.append(that);
	}
  });
  
  $('#main .header .menu').after(options);
});

// copy footer link to mobile dropdown
$(function() {
  var links = [{'title': 'Jump to another section'}];
  $('#footer .content > .links a').each(function () {
	links.push({
	  'title': $(this).html(),
	  'url': $(this).attr('href'),
	  'type': $(this).parent().prop('tagName')
	});
  });
  
  var select = $('<select></select>');

  for (i = 0; i < links.length; i++) {
	var label = links[i].title;

	if (links[i].type == 'H2') {
	  label = label.toUpperCase();
	}
	else if (links[i].type == 'LI') {
	  label = '&nbsp;&nbsp;'+ label;
	}

	var option = $('<option value="'+ links[i].url +'">'+ label +'</option>');
	
	$(select).append(option);
  }

  select.on('change', function (e) {
	if (this.value.length > 0) {
	  window.location = this.value;
	}
  });

  var element = $('<span class="select"></span>').append(select);

  $('#footer .content > .links').before(element);
});


// UserVoice implementation
(function() {
  var uv=document.createElement('script');
  uv.type='text/javascript';
  uv.async=true;
  uv.src='//widget.uservoice.com/XzQsWhTqmnE8dYDOJ0HjJQ.js';
  
  var s=document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(uv,s)
})()

function uvClick() {
  // set following parameter to site identifier: Data, Databank, Finances or DataCatalog
  var siteIdentifier = 'Data';

  var uvOptions = {
    mode: 'support',
    primary_color: '#54584c',
    link_color: '#a92123'
  };

  // uncomment next line to restrict sidebar articles to a particular topic and set topic_id accordingly. Do not set to null
  // uvOptions.topic_id = 19371;

  UserVoice = window.UserVoice || [];
  UserVoice.push(['setCustomFields', { 'Origin': siteIdentifier }]);
  UserVoice.push(['showLightbox', 'classic_widget', uvOptions]);
}
