=== Content Expandable Block ===
Contributors:      The WordPress Contributors
Tags:              block
Tested up to:      6.1
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Example block scaffolded with Create Block tool.

== Description ==


== ChatGPT ==

https://chatgpt.com/c/c22f2205-3c20-4b38-99fc-394e10c04ce8

- My view.js performs a "document.getElementById('news_short')", when a button in my custom block in the query loop is clicked. This 'news_short' is a div with id 'news_short' rendered in render.php. The problem is that with the Query Loop, there are as many 'news_short' as posts in the Query Loop and the javascripts doesn't know how to uniquely reference each one. How could I make "document.getElementById('news_short')" to point to the corresponding element from the Query Loop?
