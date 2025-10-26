---
title: Runicon Cypher
description: A constrained writing system, a cryptic glyph set, and a font
customStyle: >
  :root {
    --main-bg-color:#d3cbc3;
    --main-bg-gradient:none;
  }
  .glyph-table {
    border: 1.5px solid;
    border-collapse: collapse;
    margin:2em 0;
  }
  
  .glyph-table th,
  .glyph-table td {
    border:1.5px solid;
    padding:0.5rem 1rem;
    text-align:center;
  }
  
  .glyph-table thead tr {
    font-size:var(--h3-font-size);
  }
  
  .glyph-table tbody td {
    font-size:var(--h1-font-size);
  }
  
  .glyph-table .runicon {
    font-family:RuniconCypher;
    font-size:3em;
  }
notecardStyle: 'background-color:#d3cbc3;'
lightbox: true
runicon: true
---

<img src="https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/runicon-cypher/runicon_alphabet.svg" class="full-width-graphic">

The symbols above form a fictional alphabet of 25 letters, and one punctuation mark. This is the Runicon Cypher, a set of glyphs that I created for purposes which I will try to explain here. (In short, it was for art.)

Let me start by giving some context. I've been interested in {% extLink "asemic writing" "https://en.wikipedia.org/wiki/Asemic_writing" %} for a long time, and in my art, I have often enjoyed drawing mysterious-looking symbols which usually don't have any specific meaning. Here are two examples from circa 2013:

{% photoGrid "two-column" %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/runicon-cypher/zed.jpg", "a froglike wizard in a black cloak", false, false %}
{% photoGridItem "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/runicon-cypher/atrium_600.png", "a person in a diving suit with closed eyes", false, false %}
{% endphotoGrid %}

Recently, I started doing a bit of light {% extLink "worldbuilding" "https://en.wikipedia.org/wiki/Worldbuilding" %} through some drawings and zines I made for my [zine club](/zine-club). I started developing a fictional world called Aritana Occ. I made some zines that included abstact glyphs ([example](/zine-club/self-same-zine)).

Now that the symbols were beginning to take on more specific associations within the worldbuilding context, I wanted to start incorporating a system of glyphs that actually had some kind of semantic meaning behind them, which could be decoded and understood by a determined reader. Not to mention that with the increased volume of encyphered text I wanted to create, drawing arbitrary abstract shapes by hand was getting more time consuming.

### I asked myself: *Has the time come to create my own {% extLink "constructed language?" "https://en.wikipedia.org/wiki/Constructed_language" %}*

And then I answered myself: *No!*

I know some people who have done this, who have spent countless hours questioning the existing structure of language and writing systems, and it seemed like far too deep a rabbit hole for me right now. My spare time is limited at the moment, and I wanted something that I could incorporate into my visual art very soon.

Perhaps someday, the time will come for me to create my own writing system, and perhaps even language, from scratch. It seems like a very interesting endeavor, and I definitely feel the allure. But for now, I wanted a simpler way to encode meaning into my glyphs.

### A cypher!

As an Anglophone, I primarily encode meaning using the 26 characters of the Latin alphabet, and a variety of punctuation marks. I decided to create a set of glyphs that would map directly to letters in the Latin alphabet. A sort of script or code that would appear as a set of intriguing alien-looking glyphs, but contain semantic meaning in a familiar language just beneath the surface.

### Writing constraints

OK, so working with the letters of the Latin alphabet makes sense. But I wanted to play a bit more with the format of the text that goes into the cypher. I have some friends who hang out in a Mastodon server that is influenced by a {% extLink "French constrained writing movement" "https://en.wikipedia.org/wiki/Oulipo" %}. The rule of that server is that no one may use the letter `e` in their writing. This can be very difficult, because `e` is the most commonly used letter in English. But people find creative ways to convey meaning without using it. (Here is an {% extLink "example" "https://sowe.li/binomial/080_/" %} of a short story written with and without this constraint.)

Side note: text composed with a subset of symbols removed from the alphabet is called a {% extLink "lipogram" "https://en.wikipedia.org/wiki/Lipogram" %}. According to the Wikipedia article, the earliest known examples are long Ancient Greek texts which were composed without the letter sigma!

If I were actually trying to create a code that would be tricky to break, excluding the letter `e` could also make it slightly more difficult to perform letter frequency analysis. But this is mostly moot since the purpose of my cypher isn't secrecy.

Here are some other constraints I decided to use for my new alphabet:

- Only one punctuation mark exists, called the star symbol, which maps to the asterisk `*`, and can be used to separate sentences or phrases as needed
- No apostrophe `'` means no contractions; for example, `don't` must be written in full form as `do not`
- Only one case of letters exists (which maps to lower case, to avoid translated text seeming shouty)

These constraints make composing text for the cypher more challenging (in a fun way), and I feel that they give it a unique poetic voice.

### Gathering symbols

I already had a loosely defined set of shapes I enjoyed using in my asemic writing, but I wanted to be able to use them on the computer as well. I realized that most of them already exist somewhere in {% extLink "unicode" "https://en.wikipedia.org/wiki/List_of_Unicode_characters" %}, which aims to gather all of the world's alphabets into a single, vast codex. So, perhaps, instead of designing my symbols from scratch, I could just write a script that would swap out my Latin letters for their corresponding unicode glyphs?

{% image "https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/runicon-cypher/unicode.png" "Screenshot of a bunch of unicode symbols" "1440" %}

I spent a long time combing through all of the unicode blocks and picking out symbols to perhaps use in my alphabet, but in practice, this method didn't work too well for a couple of reasons:

- Although the symbols may exist in unicode, font support is not yet universal for all of the characters in all languages. So unless I provided font support myself, the text might not appear correctly on other people's devices.
- Some of the characters have various properties that affect how they are displayed, which interfered with letting them be easily used in the context of the left-to-right, horizontal writing system we use. While I would at some point like to explore other writing systems (like vertical and right-to-left, or even completely non-linear), this introduces too much complexity at this stage.
- Since the symbols all came from different languages and sections of unicode, they were not necessarily visually consistent. For example, their font representations had varying heights, line widths, and styles.

So I decided that, in order to ensure that my encyphered text would appear as I wanted it to everywhere, I had no choice but to make my own font.

### Advantages of making a font

Once I resigned myself to the necessity of learning how to make a font, I recognized that there were many advantages to this method. Here are some that excited me most:

- Fonts are portable, and can be used in any design program.
- One can type Latin letters into the keyboard and have them show up instantly in the glyphs of the cypher.
- Convert any existing text instantly to the cypher by changing the font. If it includes "illegal" glyphs (such as the letter `e`, any capital letters, or punctuation marks besides the asterisk), they stand out like a sore thumb due to being displayed in a fallback font or a box with an X in it.
- Custom fonts can easily be used on websites, so I can display text in the cypher on any webpage where I control the CSS.
- Any text displayed in the cypher can be decoded by copying it as text from a webpage and pasting it elsewhere on the computer, creating a simple but slightly easter-eggy way to read the text without memorizing the cypher.

### Tools for font-making

I had never made a font before, but I'd heard good things about {% extLink "FontForge" "https://fontforge.org/en-US/" %}, a free, open-source, cross-platform font editor. It worked pretty well for me, but I mostly used it to convert existing vector files into a usable font, so I didn't need to use the built-in drawing tools in FontForge.

For actually drawing the glyphs, I used {% extLink "Rhinoceros" "https://www.rhino3d.com/" %}. While it's normally used for 3D CAD, it has strong 2D drafting capabilities, and I use it at work for designing 2D vectors for custom laser-cut metal tools. Now that I've been using it for a while, I find it more intuitive to draw precise geometric forms in Rhino than any other vector design program that I've used. Although I still have to import my vector files into Inkscape or Illustrator to apply stroke and fill to them, it's worth the extra step for the mathematical precision of Rhino's drawing tools.

### Design scheme

With these tools in my belt, the next step was to decide on a design scheme for my glyphs. For simplicity, I drew them all with a single line, and gave them a rounded stroke, so they would have a similar look to lines drawn with a felt-tip pen. I decided to make them all the same height. I really like monospace fonts (like the one used on this page), and how the letters all line up in a grid, but I couldn't settle on a consistent width, because I wanted to make some glyphs that were tall, some square-ish, and some wide. So I created three different options for width that were multiples of each other, including spacing, allowing for the characters to align to a grid in a modular way.

<img src="https://s3.us-east-1.amazonaws.com/palomakop.tv/notes/runicon-cypher/grid.svg" class="full-width-graphic">

Two triple-width characters are the same width as three double-width characters and six single-width characters.

### The name

The name *Runicon Cypher* is a combination of the words *rune* and *icon*. I originally chose the name *Runicode* to refer to the glyphs being pulled from unicode, but I changed it because:

1. I shifted away from the idea of using codepoints from many different blocks of unicode to encode my symbols, and
2. The name *Runicode* contains the letter `e`, which would mean that I could not write the cypher's name in the cypher itself!

### Glyph table

Finally, I got around to actually drawing my 25 glyphs and one punctuation mark, selecting favorites from my collection of cool-looking shapes, and drafting them in Rhino until I had the required amount. I then assigned each glyph to one of the 25 lower-case Latin characters in my chosen lexicon. Some happen to resemble their counterparts to some degree, but that wasn't a rule.

{% assign letters = "abcdfghijklmnopqrstuvwxyz" | split: "" %}

<table class="glyph-table">
  <thead>
    <tr>
      <th>Latin</th>
      <th>Runicon</th>
    </tr>
  </thead>
  <tbody>
    {% for letter in letters %}
    <tr>
      <td>{{ letter }}</td>
      <td class="runicon">{{ letter }}</td>
    </tr>
    {% endfor %}
        <tr>
      <td>\*</td>
      <td class="runicon">\*</td>
    </tr>
  </tbody>
</table>

### Pangram

To better visualize the font in action, I wanted to use a pangram (a phrase that includes all the letters of the alphabet), like `the quick brown fox jumps over the lazy dog`. But I had to come up with a new one that doesn't contain the letter `e`.

<p style="font-family:RuniconCypher;font-size:3em;line-height:1;margin:2rem 0">if boxing wizards vow * chop my quilt to junk</p>

The above text reads, `if boxing wizards vow * chop my quilt to junk`. You can select it and paste it elsewhere to see for yourself. Yay, web fonts!

This also shows how to use the star symbol `*` as punctuation (in this case it's being used in a similar way to a comma). It should always be separated from surrounding text on both sides with spaces, and is pronounced in speech as a pause.

### Font files

You made it this far down the page, so perhaps you want to try using the Runicon Cypher yourself? Here are some downloadable font files that you can install on your computer or use on the web. Feel free to use them as you wish under the {% extLink "CC-BY-NC-SA license" "https://creativecommons.org/licenses/by-nc-sa/4.0/" %}. (For other uses [contact me](/contact).)

**{% extLink "runicon_cypher.otf" "https://s3.us-east-1.amazonaws.com/palomakop.tv/fonts/runicon_cypher.otf" %}** (OpenType)

**{% extLink "runicon_cypher.ttf" "https://s3.us-east-1.amazonaws.com/palomakop.tv/fonts/runicon_cypher.ttf" %}** (TrueType)

**{% extLink "runicon_cypher.woff" "https://s3.us-east-1.amazonaws.com/palomakop.tv/fonts/runicon_cypher.woff" %}** (Web font - legacy standard for compatibility)

**{% extLink "runicon_cypher.woff2" "https://s3.us-east-1.amazonaws.com/palomakop.tv/fonts/runicon_cypher.woff2" %}** (Web font - current standard)

(Note: if you use these on a webpage, please host the files yourself. Don't hotlink to the above URLs!)

### A new zine

After completing the font, I wrote all the text for my next [zine club](/zine-club) quarterly e-zine using the Runicon Cypher. You can read it online here: {% extLink "lab.palomakop.tv/our-city" "https://lab.palomakop.tv/our-city/" %}

I hope you enjoyed this write up of my creative process. <span style="font-family:RuniconCypher">so long * and i wish you a good day</span>