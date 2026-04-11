---
layout: post
title: "On FB Comments and Jekyll"
description: ""
category: Code
tags: [facebook, comments]
---

## {{ page.title }}

posted on: {{ page.date | date_to_string }}
{: .meta}

Jekyll is a pretty freaking awesome, eh, fram.wor..tool. Tool, yeah, that's it. Anyway, being as simple as it is, it can have some hills to climb at times.
Add in the super compl-easy Facebook Graph "stuff" and you start to get into rock climbing.
<!--more-->

I fought with getting the FB Comments and Jekyll to play nice for a while. Having the issue that the comments box on every post would contain all comments. Obviously unwanted behaviour. I wanted each post to have it's own seperate comments and likes. Here's where I was slipping...

The FB Comments box code looks like this,
firstly somewhere just after your <span class="highlight2"><span class="nt">&lt;body&gt;</span></span> tag you want to put the Facebook JS SDK bit

{% highlight html linenos %}
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=[YOUR APPID HERE]";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
{% endhighlight %}

then where ever you want the comments box to be you put this bit

{% highlight html linenos %}
<div class="fb-comments" data-href="http://example.com" data-width="600" data-num-posts="2" data-colorscheme="dark"></div>
{% endhighlight %}

Now the bit that is not that clear is the <span class="na">data-href=</span><span class="s">&quot;http://example.com&quot;</span> bit.

What is not clear at first is that if you just use your domain, then no matter where and how many times you put the fb-comments div, you get the same comments box. So if you have the comments box on multiple posts or pages each of these will share the comments. To remedy this, the bit that took me some time to figure out, you need to make a minor tweak to the <span class="na">data-href=</span><span class="s">&quot;http://example.com&quot;</span> line.

So this minor tweak is to add {% raw %} {{ post.url }} {% endraw %} to <span class="na">data-href=</span> like so
{% highlight html linenos %}
<div class="fb-comments" data-href="http://example.com{% raw %}{{ post.url }}/{% endraw %}" data-width="600" data-num-posts="2" data-colorscheme="dark"></div>
{% endhighlight %}

After adding {% raw %} {{ post.url }} {% endraw %} Jekyll will append the.. well, posts url. Thus rendering this
{% highlight html linenos %}
<div class="fb-comments" data-href="http://dhodgkin.github.com/2013/08/19/on-fb-comments-and-jekyll/" 
	data-width="600" data-num-posts="2" data-colorscheme="dark"></div>
{% endhighlight %}
or something similar depending on how you have your permalinks setup.

So there you go. Now all your posts will have their own comments boxes, or like buttons (yep works for like buttons too). Now go drink some good micro-brew beer, eat some bacon and get into arguments with people in the comments boxes of your posts. 

Later.
