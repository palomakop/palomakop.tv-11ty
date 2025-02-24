---
title: Day 6
date: '2025-02-24'
---

- Came into the hub for the day.
- Joined the Monday Meditation group. We did a guided metta meditation practice and then had a discussion afterwards. It was very nice and I want to go to more of the weekly sessions going forwards.
- Posted on Zulip about starting a Critical AI Reading/Discussion Group. Proposed a book to read and discuss. I am a bit unsure how this would go but I think it would be good to have more discussion around this since I see people using AI code generators and such without much discussion of their larger implications.
- Noticed that the dark mode toggle I set up on {% extLink "The Lab" "https://lab.palomakop.tv" %} is not working properly on my iPhone web browser.
  - Bug description: When the device prefers-color-scheme is set to "dark," the toggle initially does not change the mode to light unless you refresh the page when the lights are switched on.
  - Used safari developer tools with an iPhone simulator in xCode to view the javascript console for debugging.
  - Decided to change the way that dark mode is implemented, so sketched out a pseudocode flow chart for the new method.
    - I want to respect prefers-color-scheme (device theme), but also allow users to toggle the dark/light mode and have their preference saved. So I am using both media queries, and a javascript toggle to add/remove a class from the body.
    - Previously, I was using JS to modify the css stylesheet, in the hopes that I could avoid having to write both media queries and rules for the body class. But the code that iterated through the CSS media rules and modified them turned out to be unnecessarily complex.
    - Now the light switch is working properly, theme preference is saved across visits, and despite the increase in lines of CSS, the decrease in complexity of the JS code was well worth it.
    - Also, if the browser does not have JS enabled, the device color scheme is used, and the toggle switch remains hidden. Yay, progressive enhancement!
- Had a chat with Stephen about self-hosting. Got some tips on how to go about host public web things from my home computer without exposing things on my network that I don't want to. It was very helpful because I now feel a bit more confident to try things out. I'll be looking into hypervisor software I can use to run and manage VMs on my desktop computer. Perhaps some day, I will look into dedicated hardware options (apparently used servers are quite affordable).
- Added a little animation to the page header of {% extLink "The Lab" "https://lab.palomakop.tv" %}, because lab can be short for either "laboratory" or "labyrinth". Also, added some styling to distinguish external links with a little arrow.

#### To-do:

- Now that I've finished these tweaks to the lab UI, I want to make more little projects to add as new pages on there.
