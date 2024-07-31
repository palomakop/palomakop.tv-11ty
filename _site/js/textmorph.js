/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

const elts = {
	morphtext1: document.getElementById("morphtext1"),
	morphtext2: document.getElementById("morphtext2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"Multimedia Artist",
	"Creative Technologist",
	"Ambient Musician",
	"Visualist",
	"Educator",
	"Human Being"
];

// Controls the speed of morphing.
const morphTime = 1.8;
const cooldownTime = 0.8;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.morphtext1.textContent = texts[textIndex % texts.length];
elts.morphtext2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.morphtext2.style.filter = `blur(${Math.min(3 / fraction - 3, 100)}px)`;
	elts.morphtext2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.morphtext1.style.filter = `blur(${Math.min(3 / fraction - 3, 100)}px)`;
	elts.morphtext1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.morphtext1.textContent = texts[textIndex % texts.length];
	elts.morphtext2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.morphtext2.style.filter = "";
	elts.morphtext2.style.opacity = "100%";
	
	elts.morphtext1.style.filter = "";
	elts.morphtext1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

// Start the animation.
animate();