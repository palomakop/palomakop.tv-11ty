---
title: Are.na Cards
description: A catalog of ideas as a deck of cards
notecardStyle: 'background-color:#d8ddea;'
customStyle: >
  :root {
    --main-bg-color:#d8ddea;
    --main-bg-gradient:none;
  }
lightbox: true
thumbnail: 'https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/stack.jpg'
updates:
  - date: "2026-01-04"
    message: "Made a [deck of cards]() of my creative ideas"
    image: True
---

{% image "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/stack.jpg", "A stack of cards on a blue cutting mat", "1440" %}

I wanted to document the process and intentions behind this deck of cards I made for myself. I printed the first batch in the last few days of 2025, but I will probably add more cards to the deck and perhaps remove some over time. It will be an ongoing process. But wait, what are they actually? Let me go back to the beginning.

### New year's ponderings

As the new year approached, I started trying to consider the macroscopic trajectory of my creative practice over the past year and into the future. Every time I had thought about that recently, things felt jumbled. Of course, it can always be difficult to try to see the big picture of the current time while you're living it. But the thing I noticed most was feeling pulled in many directions and unsure where to focus my energy next.

If you have a brain that even remotely resembles mine, you can probably relate to the situation of having more ideas for projects and things to do than you actually have time to do within a reasonable planning period. This can make me feel a bit paralyzed when trying to decide what to do next, because anything I choose also means choosing not to do a lot of other things.

Over time, I've tried to make lists of these ideas in various places, but they usually end up feeling neglected and scattered because the way that I actually operate, on a day to day basis, is mainly determined by an intuitive draw towards a specific objective or activity that can be hard to explain or predict. So a text document or a list fails to capture the amorphous, interconnected web of "things I want to try" and "materials that inspire me" or "things I want to learn more about."

And then when I have some time to be in my studio and do things, beyond to-do lists and project plans (which I also have), sometimes what I really need is just a reminder or a nudge towards something that sparks my interest.

{% image "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/single.jpg", "A hand holding up a single card with the text 'overlapping arpeggios'", "1440" %}

### Cataloguing my ideas

Anyway, while trying to sort through all this, I decided that the first thing to do was to create a single place to index and catalog all of my ideas. Crucially, this needed to be *completely separate* from my actual to-do list. Reasons:

- A to do list is for tracking actual, actionable steps. If there are too many of them, I feel overwhelmed. When I input an action or a "project" (linear sequence of actions), that means I am actually, definitely planning to do this thing. It could be at a specific time or an unknown time in the future, but it *will* happen. In contrast, ideas are things that might or might not happen.
- Ideas can take different forms. Sometimes when I have an idea, I don't actually know what the specific action is that will result from it, if any.

I also found that Obsidian, the application I use for making text-based notes, did not work well for me as a repository of ideas either. I could see it being excellent for this purpose for some people, but I'm a very visual person and Obsidian doesn't handle images very well. (It does serve me well for other purposes though!)

Well, being a programmer, I started thinking about and outlining a custom application that I could build that would allow me to create "idea" items and link them to various categories. It would be non-hierarchical in the sense that an idea could exist in multiple categories. And it could be just text (a description or prompt), or optionally have an image attached, or even a file (such as a PDF) or a URL.

Once I finished outlining my needs, I realized that they could already be about 90% fulfilled by an existing platform/software called **Are.na**. Additionally, since Are.na has a full API, I could later export my data or expand functionality with my own code. So instead of jumping into a new software development project, I decided to start out by gathering and entering all of my ideas into Are.na.

### Are.na

If you're not familar with Are.na, it's a platform for gathering and organizing images, links, text, and files. Individual items are called "blocks" and groups of items are called "channels." A lot of people use it for research or moodboarding, or in a similar way to early-day Tumblr, because you can follow people or channels and then connect things you find to your own channels. Anyway, it's one of the few online platforms that doesn't feel horrible to use these days, and I have used it sporadically for many years, mostly just as a place to collect inspiration.

Some of my content in Are.na already fit under the category of "ideas," but I wanted a fresh start, so I deleted all of my existing channels and created new ones for my idea catalog:

<ul class="table-of-contents">
  <li>prompts</li>
  <li>things to study</li>
  <li>techniques</li>
  <li>visual patterns, forms, and phenomena</li>
  <li>forms of output</li>
  <li>sonic styles</li>
  <li>visual styles</li>
  <li>sticky concepts</li>
  <li>physical objects and apparatuses</li>
  <li>sticky diagrams</li>
  <li>references</li>
  <li>audio tools to explore (more)</li>
  <li>visual tools to explore (more)</li>
  <li>color palettes</li>
  <li>typography + graphics</li>
  <li>spaces</li>
</ul>

I won't bother trying to explain what all of these mean; some are self-explanatory and some might be more specific to me personally. But between going through scattered notes in my to-do lists, Obsidian notes, previous Are.na content, and some stuff straight from my head, I ended up gathering a total of 164 ideas.

{% photoGrid "two-column" %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/prompts_screenshot.jpg", "Screenshot of my 'prompts' channel on Are.na", false, false %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/visual_styles_screenshot.jpg", "Screenshot of my 'visual styles' channel on Are.na", false, false %}
{% endphotoGrid %}

All of my content on Are.na is public, so you can look at everything on there if you want to:

<ul class="larger-bullets">
  <li>{% extLink "are.na/paloma-kop" "https://www.are.na/paloma-kop" %}</li>
</ul>

That was another reason I decided to integrate my list of ideas with Are.na instead of building my own tool: I like that other people can see and interact with my ideas on there if they want to, and I like to be open about things (hence why I also journal in public, and externalize my thoughts on this website). I plan to write more about my philosophy on this in a future note.

It was really satisfying to see all of my ideas gathered in one place. But it was also still overwhelming! Cataloguing them was just the first step. I wanted to be able to manipulate them, randomize them, organize them spatially. This was the remaining 10% of functionality that Are.na didn't quite fulfill.

### Bringing my ideas into physical space

I sketched out some possible methods for grabbing my data from the Are.na API and creating a custom interface that allowed me to organize my ideas in different views, put some of them into a "roadmap" for what to explore next, or even grab ones at random for when I have trouble deciding what to do. It was that last one that steered me towards physical cards, because I wanted to consult my "deck" of ideas intuitively in a way that reminded me of tarot cards.

The more I thought about it, the more I liked the idea of having physical cards. I could spread them out in physical space, and do my thinking in a tactile way, away from a computer screen. I could shuffle them and pull ones at random, and see how I felt about the ones I pulled — whether they felt "right" or not. (Plus, I seem to just [really](/art/tarot-of-subtle-forms) [like](/art/life-cycle-of-aritanian-flowers) {% extLink "cards" "https://subtle.cards" %}.)

This method seemed to fit in well with the mysterious, intuitive process of creating things, where a lot of the actual work takes place subconsciously. It also helped me understand why it was so hard to plan the arc of my creative practice, and accept not always knowing what my next step will be.

### Making the actual cards

While on retreat at Recurse Center earlier in 2025, I met some people who were excited about Typst, which is a way to create documents with a custom markup syntax, kind of like LaTeX but a lot more pleasant to use. It seemed like a good way generate a printable PDF with four cards to a page. I used Python to download my channels from Are.na and sculpt the data into a Typst layout file. I didn't dive that deep into all that Typst can do, since all I wanted to do was generate a pretty simple 2x2 grid of cards with some text and images on them.

{% photoGrid "two-column" %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/links.jpg", "PDF page generated by Typst with printable cards", false, false %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/markdown_text.jpg", "Another page of printable cards", false, false %}
{% endphotoGrid %}

Some of my blocks in Are.na contained links to documents, webpages, or videos that the card itself could not fully convey. So in order to create a link between the physical cards and their counterparts in Are.na, I added small QR codes at the bottom of each card.

Since the script downloads a snapshot of my Are.na channels at the time it's run, I added a way to include only blocks that were created or modified after a certain timestamp. This way, I can run the script again in the future after I've added more stuff to Are.na, and print new cards to add to my deck.

The code I created is kind of bespoke, but just in case anyone wants to try to use it for something, I have shared it on my {% extLink "github" "https://github.com/palomakop/arena-card-generator" %} along with some instructions and notes.

Once I'd gotten a satisfactory PDF file, I printed it out on 110 lb cardstock and then proceeded to cut out all of the cards and punch the corners with a rounded-corner-punch. I love rounded corners, plus for cards they are pretty crucial, to avoid the corners getting dented. It also makes any slight differences in size between the cards less noticeable. I had to cut them all individually because my old paper guillotine can't handle more than a single sheet of cardstock. The time passed quickly thanks to *Battlestar Galactica*.

After all of the cards were done, I stacked them all up and felt very satisfied. 164 cards makes for a pretty hefty stack. Here are a few of them:

{% photoGrid "vertical" %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/text_ideas.jpg", "Three cards with small text notes", false, true %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/visual_ideas.jpg", "Four cards with different images on them", false, true %}
{% endphotoGrid %}

Also, I didn't mention this before but I actually did them in two batches because my first attempt at the script didn't properly handle the pagination of Are.na's API responses. Imagine my surprise when I thought I'd finished making all of the cards, and then realized I had only done about half of them.

### Using the cards

I sat down on the floor of my studio and consulted with my new deck of ideas. I drew several cards, and thought about how they might relate to things I plan to work on in the near future (namely, making some music for a project with a friend, making some stuff for zine club, making a new page for my website (this one, hi!), and exploring some code-based tools for generative visuals).

I kept the cards I pulled separate, and put the deck away on my shelf. When I am ready to choose some new ideas to work with, I'll consult with the deck again and pull a few more. I can't work on them all at once, but at least I know that the rest of them aren't going anywhere, and will surface if and when their time comes. In the meantime, if any new ideas appear, I'll put them into Are.na, and they'll get printed next time I run my script to generate new cards.

The cards that are currently "active" found a home on a magnetic whiteboard next to my desk. They are there when I want to remember what the fuck I'm doing right now.

{% photoGrid "two-column" %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/whiteboard.jpg", "A whiteboard with four idea cards pinned up by magnets", false, false %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/arena-cards/studio.jpg", "The whiteboard in situ in my studio next to the desk", false, false %}
{% endphotoGrid %}

### Onward

This project was a response to trying to think about my art practice, and where to go with it, in a zoomed-out way. I'm not really sure if it answered the question I had when I started out, but somewhere along the way, the question changed. Like Brian Eno's *Oblique Strategies* deck, these cards can help unblock me when I'm trying to decide what to do next. Instead of choosing a specific path, I found a method to help me channel my intuition and find a next step, with opportunities for coincidences and surprises to emerge.

So I'm not really sure where my art practice will take me in the long term future. And I think that's actually OK? Maybe it's better to leave things open, since they always seem to change anyway. But I'm certainly curious to watch it unfold.

Thanks for reading this note, and I hope you found it interesting. If you have any thoughts, feel free to [share them with me](/contact).

### Stats

- **Current number of idea cards:** 176
- **Timestamp of cards last printed:** 2026-01-17T00:00:00.000Z
