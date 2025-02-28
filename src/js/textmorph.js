const elts = {
	morphtext1: document.getElementById("morphtext1"),
	morphtext2: document.getElementById("morphtext2")
};

const texts = [
	"Artist",
	"Coder",
	"Visualist",
	"Educator",
	"Human Being"
];

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

function setMorph(fraction) {
	
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

animate();