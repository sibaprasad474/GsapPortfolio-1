document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});
function valueSetter() {
    // gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" });
    gsap.set("#home .row img", { opacity: 0 });

    document.querySelectorAll("#Visual>g").forEach((e) => {
        let character = e.querySelector("path, polyline");
        if (character) {
            let length = character.getTotalLength();
            character.style.strokeDasharray = length + 'px';
            character.style.strokeDashoffset = length + 'px';
        }
    });
    gsap.to("#Visual>g path, #Visual>g polyline", {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        ease: "ease.inOut"
    });


}

function revealTpSpan() {
    document.querySelectorAll(".reveal").forEach((el) => {
        let spanParent = document.createElement("span");
        let spanChild = document.createElement("span");

        spanParent.classList.add("parent");
        spanChild.classList.add("child");

        spanChild.innerHTML = el.innerHTML;
        spanParent.appendChild(spanChild);

        el.innerHTML = "";
        el.appendChild(spanParent);
    });
}
function loaderAnimation() {
    // Hide overflow y before animation
    document.body.style.overflowY = "hidden";

    let tl = gsap.timeline();
    tl.from("#loader .reveal .child span", {
        x: 100,
        duration: 2,
        stagger: 0.1,
        ease: Circ.easeIn
    })
    .to("#loader", {
        height: 0,
        duration: 2,
        ease: Circ.easeInOut,
    }, "+=1") // Adjust the delay as needed
    .to("#loader", { // Reduce loader height to 0
        duration: 0,
        height: 0,
    })
    .to("#green", { 
        height: "100vh",
        duration: 0.5,
        ease: Circ.easeInOut,
    }, "-=2") 
    .to("#green", {
        height: "auto",
        duration: 0.5,
        ease: Circ.easeInOut,
        onComplete: function() {
            animateHome();
            // Show overflow y after animation is complete
            document.body.style.overflowY = "auto";
        }
    });

    // Move the specific elements inside the loader out of the viewport
    tl.to("#topheading", {
        y: "-100vh",
        duration: 1,
        ease: Circ.easeInOut
    }, "-=2")
    .to("#loader h1.reveal", {
        y: "-100vh",
        duration: 1,
        ease: Circ.easeInOut
    }, "-=1.5");
}

gsap.to(".curve path:nth-child(2)", {
    y: 20,
    x: 10,  
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 4
});

function animateHome() {
    let tl = gsap.timeline();
    tl.to("#nav a", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: Expo.easeInOut
    })
    .to('#scroll', {
        y: 100,
        repeat: -1,
        duration: 1,
    }, "-=0.5") // Adjust overlap timing
    .to("#home .parent .child", {
        y: 0,
        stagger: 0.3,
        duration:0.7,
        ease: Expo.easeIn
    }, "-=1");
}
gsap.to(".curve path:nth-child(2)", {
    y: 20,
    x: 10,  
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 4
});
revealTpSpan();
valueSetter();
loaderAnimation();
// animateHome()
