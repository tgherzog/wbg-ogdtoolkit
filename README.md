# Readme #

This is the project for the World Bank's Open Government Data Toolkit.

The site was designed using [Jekyll](http://jekyllrb.com)
and is primarily written in [Kramdown](http://kramdown.gettalong.org/),
an increasingly popular Markdown variant. Kramdown makes HTML authoring
easy by providing substitutes for the most common markup tags and structures
(paragraphs, headers, lists, bullets, links, tables, footnotes, etc).

Jump to [technical information](#technical-information).


## Authoring Requirements ##

You will need the following software to author content in the toolkit:

* Git: to commit updates to the repository. Instructions for installing the
  command line version [are here](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
  You can also use a GUI client so long as it can access any repository server (the GitHub
  client only works with repos hosted on github.com). Here is a
  [list of GUI clients](http://git-scm.com/downloads/guis). SourceTree has already
  been tested, has both a Mac and Windows version, and is free.
* A text editor, such as TextEdit (Mac), Wordpad (Windows), or Sublime (either)

You should also be familiar with:

* Markdown is a markup language used by the toolkit (and many other websites). Here is a
  [quick reference][quickref] and a [nice interactive tutorial][tutorial].
* Okay, strictly speaking, the toolkit uses Kramdown, which is an extension of Markdown with
  a [few extra features](#extra_formatting) you'll encounter on several pages. So here is the authoritative
  [syntax guide for Kramdown](http://kramdown.gettalong.org/syntax.html).
* Basic git operations, such as commits, pushes and pulls.
  The first three chapters of the [git documentation](http://git-scm.com/book/en/v1) are a bit technical, but should cover it.
  Here are the operations you will use nearly all the time, so look for these as you read the documentation.
  Your git software may implement more intuitive ways of accomplishing these tasks, but it's good
  to be familiar with the underlying concepts.
  * **git add:** queues new or modified files for committing to the local repository (on your computer)
  * **git commit:** commits a set of changes to the repository
  * **git diff:** shows changes between two versions, sort of like "track changes"
  * **git log:** shows history of changes over time
  * **git status:** shows the current state of the repository, and which files have been changed since
    the last commit
  * **git branch:** create a new revision branch
  * **git checkout:** switch to a different branch
  * **git fetch:** retrieve changes from a remote repository (on the server)
  * **git push:**  push changes to a remote repository



## File Organization ##

All files needed for content authoring are in one of two project directories: `docs` and `en`:

* `docs` contains downloadable documents such as PDF and Word files, along with some images
* `en` contains Kramdown files (the English versions), which produce HTML files on the toolkit server. There is one
  file per HTML page, each one ends with a **.md** suffix.

The `es` and `fr` directories contain Spanish and French translations of their English pages in `en`.

Note that the `_config.yml` file instructs Jekyll to ignore certain files (including this README),
so if you're wondering why certain files aren't on the website, check there first.

## Repository Branches ##

Git supports revision branching, allowing a team to create discrete revision tracks and merge them
later on (see [chapter 3](http://git-scm.com/book/en/v1/Git-Branching) in the git documentation).
This means that you can create one or more branches
for significant revisions to the toolkit, and not affect the "master" branch (the public website) until
you are ready to do so.

There are two branches that carry special importance in the repository:

* The `master` branch is the branch used for the public site. Commits and merges to the `master` branch result
  in the public site being regenerated.
* The `qa` branch is a site used for testing. Commits and merges to the `qa` branch will regenerate a "mirror"
  site that is intended for temporary testing. Once testing is completed, the `qa` branch can be merged with
  the `master` branch, or it can be discarded.



## Authoring Tips ##

### Use Relative URLs ###

When linking to documents or images that are in the toolkit, use relative links like this:

    [Essentials](essentials.html)
    [ODRA report](../docs/odra/odra-report.pdf)

not like this:

    [Essentials](http://opendatatoolkit.org/en/essentials.html)
    [ODRA report](/docs/odra/odra-report.pdf)

Relative links ensure that any changes in the hosting environment won't break links, and that
links will still work if the source files are translated to a different language.
  
### Table of Contents ###

The Toolkit automatically generates a table of contents for the current page by adding links to either
\<h1\> or \<h2\> elements to the floating sidebar on the right side.

If for some reason, you want to supress a header from appearing the in the sidebar, add the `notoc` class
to the \<h1\> or \<h2\> element like this:

    ## Header to be suppressed ##
	{: .notoc :}

This takes advantage of a Kramdown convention that lets you add HTML classes to a preceding element. Note
that the class name must begin with a period.

### "More" links ###

The toolkit allows you to create paragraphs split into two parts, where the second part is revealed
when the user clicks a "more..." link. This is useful when you have several bulleted paragraphs
that individually are so long that readability suffers. You can add a "more..." link after the first
sentence so the rest of the paragraph doesn't appear unless the user specifically wants it to. The "supply"
page has several examples.

Simply use the \<cite\> tag (which has no other use in this context) to wrap the text you want to initially
hide:

    This text will always appear to the user.
	<cite>but this text will only appear if the user requests it.</cite\>

### Pull Quotes ###

Use "pull quotes" to add visual interest to a page. The text in a pull-quote should appear verbatim elsewhere
on the page (or else it's not a quote), since pull quotes are hidden on devices with small screens.

    This paragraph will be styled as a pull quote
	{: .pullquote :}

### Images ###

You can add illustrative photos and images to pages so that they float to the right of the main text, appear
with a caption, and scale or hide on small screens. Here is how:

    ![This is the photo caption](../docs/images/photo.jpg)
    {: .aside :}

Of course you must also add the image file (png, jpg etc) to the git repository.




## Style Guide ##

The [style guide][guide] gives editorial instructions for making changes to the toolkit to ensure
consistency and quality (grammar, punctuation, etc). The style guide is title style-guide.md in the
git repository and **style-guide.html** on the toolkit server.


## Use of Kramdown extensions ## {#extra-formatting}

Here is a list of Kramdown extensions used throughout the toolkit that may not be immediately familiar
if you only took the [tutorial][tutorial] and read the quick reference guide][quickref].

* **[Formatted tables](https://kramdown.gettalong.org/quickref.html#tables)**
* **Header Identifiers**. Kramdown automatically adds identifiers to headers so you can reference a
  specific section of a page [like this](http://opendatatoolkit.worldbank.org/en/odra.html#download)
  (the toolkit's sidebar navigation depends on this). It's not required, but it's open helpful to control
  these identifiers manually, particularly for multi-lingual pages. Here is how:

  `\#\# Download the ODRA {#download}`


## Multi-lingual Support ##

Multiple-languages are supported, although rtl languages (such as Hebrew and Arabic) are not. The content
files for each language reside in a sub-directory that is the language's 2-character abbreviation: `en` `es`
`fr` and so forth. Simply copy the original **.md** files from the english folder to a new language folder
and have them translated. **Do not rename the files.**

You must also copy and translate the support HTML files in `_includes/en` which implement the standard WBG
header, footer, and Omniture tracking code.

Third, edit the "lang" object in `_config.yml` to make sure the required text strings are available (use the
English version as a guide). You should also set the "multilingual" variable to **true**.

Fourth, add an `assets/config-xx.js` file (or copy and modify `config-en.js`) for translation settings
that run client-side.

Finally, edit `_layouts/default.html` if necessary so that the new language is accommodated in the setup code
at the top of the file.


## Text Encoding Errors ##

GSD translation services do not like dealing with Markdown/Kramdown files, they prefer HTML.
Therefore any time we use GSD for translations we send them the finished HTML files and then run their translations
back through `kramdown -i html -o kramdown` to get files consistent with the rest of the toolkit.

Unfortunately kramdown will often report text encoding errors, e.g., 
"The encoding of the source text is not valid! (RuntimeError)". You can check the file encoding from the command line with:

`file -bi <input_file>`

It should be utf-8 but most likely the file from GSD will be iso-8859-1.

You can fix it in vim:

````
set encoding=utf-8
set fileencoding=utf-8
````

then write the file.

Or to convert the file directly:

`iconv -f ISO-8859-14 -t UTF-8  2016001463SPAspa003_index.html | kramdown -i html -o kramdown > ../es/index.md`



## Technical Information ##

The toolkit is designed to run on [Github Pages](https://pages.github.com)
but can easily run on just about any server running Apache (or another web
server), Jekyll (which requires [Ruby](https://www.ruby-lang.org)
and [Ruby Gems](https://rubygems.org/)), and git.

The Bank currently uses a dedicated Linux instance for hosting both the toolbox web site and the repository.
Git access is provided via SSH, and a post-update script simulates Github pages by looking for commits
on the master branch (or a QA branch) and regeneratig the site.



[guide]: http://opendatatoolkit.worldbank.org/style-guide.html
[tutorial]: http://commonmark.org/help/tutorial
[quickref]: http://commonmark.org/help
