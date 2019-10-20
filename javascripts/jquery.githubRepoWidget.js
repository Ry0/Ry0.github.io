;jQuery(document).ready(function($){
	$('.github-widget').each(function(){

		var $container = $(this), $widget,
			repo = $container.data('repo'),
			vendorName = repo.split('/')[0],
			repoName = repo.split('/')[1],
			vendorUrl = "http://github.com/" + vendorName,
			repoUrl = "http://github.com/" + vendorName + '/' + repoName;

		$widget = $(
			'<div class="github-box repo">'
			+'<div class="github-box-title">'
			+'<h3>'
			+'<a class="owner" href="' + vendorUrl + '" title="' + vendorUrl + '">' + vendorName + '</a>'
			+'/'
			+'<a class="repo" href="' + repoUrl + '" title="' + repoUrl + '">' + repoName + '</a>'
			+'</h3>'
			+'<div class="github-stats">'
			+'<a class="watchers" href="' + repoUrl + '/watchers" title="See watchers">?</a>'
			+'<a class="forks" href="' + repoUrl + '/network/members" title="See forkers">?</a>'
			+'</div>'
			+'</div>'
			+'<div class="github-box-content">'
			+'<p class="description"><span></span> &mdash; <a href="' + repoUrl + '#readme">Read More</a></p>'
			+'<p class="link"></p>'
			+'</div>'
			+'<div class="github-box-download">'
			+'<div class="updated"></div>'
			+'<a class="download" href="' + repoUrl + '/zipball/master" title="Get an archive of this repository">Download as zip</a>'
			+'</div>'
			+'</div>'
		);

		$widget.appendTo($container);

		$.ajax({
			url: 'https://api.github.com/repos/' + repo,
			dataType: 'jsonp',
			success: function(results) {
				var repo = results.data, date, pushed_at = 'unknown';

				if (repo.pushed_at) {
					date = new Date(repo.pushed_at);
					pushed_at = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
				}

				$widget.find('.watchers').text(repo.watchers);
				$widget.find('.forks').text(repo.forks);
				$widget.find('.description span').text(repo.description);
				$widget.find('.updated').html('Latest commit to the <strong>' + repo.default_branch + '</strong> branch on ' + pushed_at);

				// Don't show "null" if the repo has no homepage URL.
				if(repo.homepage != null) $widget.find('.link').append($('<a />').attr('href', repo.homepage).text(repo.homepage));
			}
		});

	});

});
