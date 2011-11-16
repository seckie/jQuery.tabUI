# jQuery.tabUI

This is a jQuery plugin that forms a tab navigation UI.

## Required Framework
* [jQuery](http://jquery.com/) (developed with jQuery 1.6.4)

## Usage

### HTML example
Prepare HTML like this.

	<div class="nav">
	<ul>
	<li class="tab1"><a href="#section1" class="tabstyle">Section 1</a></li>
	<li class="tab2"><a href="#section2" class="tabstyle">Section 2</a></li>
	<li class="tab3"><a href="#section3" class="tabstyle">Section 3</a></li>
	</ul>
	<!--/.nav--></div>

	<div class="contents">
		<div class="section" id="section1">
			<!-- some contents -->
		<!--/#section1--></div>
		<div class="section" id="section2">
			<!-- some contents -->
		<!--/#section2--></div>
		<div class="section" id="section3">
			<!-- some contents -->
		<!--/#section3--></div>
	<!--/.contents--></div>

Required elements are tab navigation link list, whole contents wrapper (ex: &lt;div class="contents"/&gt;) and each contents with wrapper (ex: &lt;div class="section"/&gt;).
Navigation link element must link to each contents ID.

### JavaScript example
Select tab navigation links with jQuery selector and call "tabUI" method when DOM is ready.

	$(function() {
		// DOM ready
		// $(some selector).tabUI()
		$('div.nav a').tabUI({
			classNamePostfix: '_on',
			onClassName: 'on',
			offClassName: 'off',
			defaultIndex: 0
		});
	});

### CSS example
It doesn't have to be horizontal tabbed UI. Please write freely.
	.tabUIContents {
		margin: 0 auto;
		padding: 40px 0;
		width: 600px;
	}
	.nav {
		position: relative;
		z-index: 1;
		*zoom: 1;
	}
	.nav ul {
		*zoom: 1;
	}
	.nav ul:after {
		content:""; display:block; clear:both;
	}
	.nav li {
		float: left;
		width: 140px;
		margin-bottom: -1px;
		list-style-type: none;
	}
	.nav li a {
		display: block;
		border-top: 1px solid #ccc;
		border-right: 1px solid #ccc;
		border-left: 1px solid #ccc;
		background-color: #fff;
		margin-right: 10px;
		padding: .5em 1em;
		color: #333;
		text-decoration: none;
	}
	.nav li a.on {
		background-color: #9ff;
	}
	.nav li a.off {
		background-color: #ccc;
	}
	.contents {
		position: relative;
		z-index: 0;
		border: 1px solid #ccc;
	}
	.section {
		padding: 50px 100px;
		line-height: 1.5;
	}

## Options
<table border="1">
<colgroup span="1" class="colh">
<colgroup span="1" class="colh">
<colgroup span="1" class="cold">
<thead>
<tr>
<th>option name</th>
<th>default value</th>
<th>note</th>
</tr>
</thead>
<tbody>
<tr>
<td>classNamePostfix</td>
<td>&quot;&quot;</td>
<td>String that will be joined to existing class name when the tab is activated.</td>
</tr>
<tr>
<td>onClassName</td>
<td>&quot;on&quot;</td>
<td>Class name that will be added to the activated tab.</td>
</tr>
<tr>
<td>offClassName</td>
<td>&quot;off&quot;</td>
<td>Class name that will be added to the non activated tab.</td>
</tr>
<tr>
<td>defaultIndex</td>
<td>0</td>
<td>Number that represents index of content to show when the page is loaded.</td>
</tr>
</tbody>
</table>
