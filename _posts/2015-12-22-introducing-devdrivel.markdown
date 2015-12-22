---
layout: post
title:  "Introducing DevDrivel"
tags: [devdrivel, announcement, github, jekyll, mdl]
authors: [pete, elmo]
short_description: "Introduction to the new [TC] Gaming development blog"

# [TC] ShortURL
shorturl: "tc-g.uk/AKVo"

# Post on GitHub
github: "#"

# optional banner image
banner: "github-jekyll-mdl.png"

# true if the banner image is light
high_contrast: true

# add a share button
share: false
---
The opening post of a blog is always the worst. It's the post that you look back on and think, "Oh my God, who wrote that drivel". Well we're calling it now, the content of the posts on this blog will probably be total garbage to most but we hope someone somewhere appreciates what we're writing and comes back for more.

**We're developers, we write drivel, welcome to DevDrivel.**

If you want to read more about why we decided to build this blog, head over to our [about] page.

---

## We built a blog!

The full story about how we built DevDrivel will come in a later post. To give you a flavour of what's to come the remainder of this post will be a brief description of each of its core components.

### Jekyll

Instead of using a blogging platform like [Ghost] or [Wordpress], we wanted to try out a blogging engine called [Jekyll]. Jekyll is a simple way of turning plain text into blogs or static websites which means this post is a simple text file. Jekyll takes your text files and then serves them out in the form of a blog. The best bit is, because your posts are just text files, there's no need for a database.

Although Jekyll comes with a standard template, you can create your own using HTML and CSS. That's what we did but we'll come to that in a bit. Jekyll harnesses the power of the [Liquid] templating engine and supports posts written in several flavours of [Markdown]. This means whatever format you like to write posts in, there's probably a way to serve it out using Jekyll.

### Jekyll and GitHub Pages

Another cool thing about Jekyll is that [GitHub Pages] supports Jekyll as standard. This means it's **free** to host from a public repository! DevDrivel is being served from GitHub Pages, and here's the [live repo] to prove it.

So is it really free to host a Jekyll site with GitHub Pages? **Yes**, so long as you're happy to make the code open-source. If you're not happy to explicitly expose your source code, you can pay GitHub to host the project in a private repo or you can host Jekyll on your own server.

### Material Design Lite

As we already mentioned, Jekyll comes with a standard template but it was only meant as a demonstration. Creating Jekyll themes is simple if you're already familiar with HTML and CSS and even easier if you use a CSS framework like [Material Design Lite] (MDL). MDL was created by the wizards over at Google. It's a simple way to give your sites a [Material Design] look and feel. Although we've made some large tweaks to MDL to get the exact look we wanted, it was a fantastic base from which to work from. The MDL components are fluid and mobile-ready which reduced development time significantly. Some of the functionality such as the search was added by us and is not part of MDL.

The next iteration of our websites will be built using our own flavour of MDL, the one you see on DevDrivel right now. We're doing this because we want our site to work nicely on displays of all shapes and sizes and we're keen to offer a clean, familiar user interface without losing our brand identity.

### What's next for DevDrivel?

This post was only meant as a short introduction to the sorts of things you'll be seeing on DevDrivel in future. We hope to write posts on our InSim development too as well as any other interesting things we end up doing.

There will be no regular release schedule for posts, they will appear whenever we have something interesting to talk about.

Thanks for reading and we hope you'll check back soon.

Have a very merry Christmas and a happy new year!

[about]: /about
[Wordpress]: http://wordpress.com
[Ghost]: https://ghost.org
[Jekyll]: http://jekyllrb.com
[Liquid]: https://github.com/Shopify/liquid
[Markdown]: http://daringfireball.net/projects/markdown
[GitHub Pages]: http://pages.github.com
[live repo]: https://github.com/TC-Gaming/DevDrivel
[Material Design Lite]: http://getmdl.io
[Material Design]: http://google.com/design/spec
