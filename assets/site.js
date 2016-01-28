// Stop cross-frame script
if(top.frames.length > 0) top.location.href=self.location;

// install tabs
$(function() {
  $(".content-tabs").tabs({ heightStyle: "auto" });

  $('a.model-link').click(function() {
    $( $(this).attr('href') + '-click').click();
	return false;
  });
});

$(function() {
  // generate automatic table of contents
  var $li = $('aside.sidebar li.active');
  if( $li.length ) {
	var $ul = $('<ul/>');
	// scan for h1-level headers. If none, scan for h2 instead
	var $hdrs = $('section.body h1');
	if( ! $hdrs.length ) $hdrs = $('section.body h2');

	var spyTargets = new Array();
	$hdrs.each(function() {
	  if( $(this).attr('id') && ! $(this).hasClass('notoc') ) {
	    var title = $(this).text();
		var a = $('<a/>').text(title).attr('href', '#' + $(this).attr('id')).attr('id', 'spy-' + $(this).attr('id'));
		var li = $('<li/>').append(a);
		$ul.append(li);
		spyTargets.push($(this).attr('id'));
	  }
	});

	if( $ul.children().length ) {
	  $li.addClass('autotoc').append($ul);
	  var topElem = null;
	  $(window).scroll(function() {
	    var $w = $(this);
		for(var i=spyTargets.length-1;i>=0;i--) {
		  var id  = '#spy-' + spyTargets[i];
		  var top = $('#' + spyTargets[i]).offset().top - $w.scrollTop() - 5;
		  if( top < 0 ) {
			if( topElem != id ) {
			  $(topElem).parent().removeClass('here');
			  topElem = id;
			  $(id).parent().addClass('here');
			}
		    return;
		  }
		}

		// must be before first elem
		if( topElem ) $(topElem).parent().removeClass('here');
		topElem = null;
	  });
    }
  }

  // sticky sidebar
  var top = $('#main .sidebar').offset().top;
  var height = $('#main .sidebar').height();
  var sticky = function(){
	var bodyHeight = $('#main .body').height();
	var footer = $('#footer').offset().top;
	if( bodyHeight <= height ) {
	  return;
	}

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

  // Install "more" links
  qs = new QueryString();
  if( ! qs.bool('full', false) ) {
	$('.body cite').each(function() {
	  $('<a/>').addClass('more').html(_config.more).attr('href', '#').insertBefore(this);
	});

	$('.body a.more').click(function() {
	  $(this).next().fadeIn();
	  $(this).hide();
	  return false;
	});
  }

  // Process images
  $('p.aside').each(function() {
	var text = $('img', this).attr('alt');
	$(this).wrap('<div/>').parent().addClass('aside');
	if( text )
	  $(this).parent().append( $('<p/>').addClass('caption').text(text) );
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

	return false;
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

// utility class for parsing the query string
function QueryString(qs) {
  this.params = new Object();

  this.get = function(key, default_) {
	// This silly looking line changes UNDEFINED to NULL
	if (default_ == null) default_ = null;
	
	var value=this.params[key];
	if (value==null) value=default_;
	
	return value
  }

  this.exists = function(key) { return this.params[key] != undefined; }

  this.bool = function(key, default_) {
    var v = this.get(key, default_);
	return v == 1 || v == true || v == 'yes' || v == 'true';
  }

  if( qs == null ) qs = location.search.substring(1, location.search.length);
  if( qs.length == 0 ) return;

  // Turn <plus> back to <space>
  // See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
  qs = qs.replace(/\+/g, ' ')
  var args = qs.split('&') // parse out name/value pairs separated via &
	  
  // split out each name=value pair
  for (var i=0;i<args.length;i++) {
	var value;
	var pair = args[i].split('=')
	var name = unescape(pair[0])

	if (pair.length == 2)
		value = unescape(pair[1])
	else
		value = name
  
	this.params[name] = value
  }
}


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

