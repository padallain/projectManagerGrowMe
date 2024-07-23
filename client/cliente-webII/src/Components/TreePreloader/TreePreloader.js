function setup() {
  gsap.set("#shadow", {
    scale: 0,
    transformOrigin: "15px 8px"
  });

  gsap.set("#tree", {
    scale: 0,
    transformOrigin: "154px bottom"
  });

  gsap.set("#leaf-rb", {
    scale: 0,
    rotation: "-60cw",
    y: -15,
    transformOrigin: "left bottom"
  });

  gsap.set("#leaf-rm", {
    scale: 0,
    rotation: "-50cw",
    y: 30,
    transformOrigin: "left bottom"
  });

  gsap.set("#leaf-lb", {
    scale: 0,
    rotation: "60cw",
    y: -80,
    transformOrigin: "right bottom"
  });

  gsap.set("#leaf-lm", {
    scale: 0,
    rotation: "40cw",
    y: -90,
    transformOrigin: "right bottom"
  });

  gsap.set("#leaf-top", {
    scale: 0,
    transformOrigin: "center bottom"
  });

  gsap.set("#leaf-rb g", {
    scale: 0,
    transformOrigin: "left 60px"
  });

  gsap.set("#leaf-rm g", {
    scale: 0,
    transformOrigin: "22px 140px"
  });

  gsap.set("#leaf-lb g", {
    scale: 0,
    transformOrigin: "right 56px"
  });

  gsap.set("#leaf-lm g", {
    scale: 0,
    transformOrigin: "106px bottom"
  });
}

function animate() {
  var tl = gsap.timeline({
    delay: 0.42,
    repeat: -1,
    repeatDelay: 2,
    yoyo: true
  });

  tl.to("#shadow", {
    duration: 2,
    scale: 1
  })
    .to("#tree", {
      duration: 2,
      scale: 1
    }, 0)
    .to("#leaf-rb", {
      duration: 2,
      scale: 1,
      rotation: "0",
      y: 0,
      delay: 0.35
    }, 0)
    .to("#leaf-rm", {
      duration: 2,
      scale: 1,
      rotation: "0",
      y: 0,
      delay: 0.35
    }, 0)
    .to("#leaf-lb", {
      duration: 2,
      scale: 1,
      rotation: "0",
      y: 0,
      delay: 0.35
    }, 0)
    .to("#leaf-lm", {
      duration: 2,
      scale: 1,
      rotation: "0",
      y: 0,
      delay: 0.35
    }, 0)
    .to("#leaf-top", {
      duration: 2.5,
      scale: 1,
      delay: 0.35
    }, 0)
    .to("#leaf-lb g", {
      duration: 2.25,
      scale: 1,
      delay: 0.5
    }, 0)
    .to("#leaf-lm g", {
      duration: 2.25,
      scale: 1,
      delay: 0.6
    }, 0)
    .to("#leaf-rb g", {
      duration: 2.25,
      scale: 1,
      delay: 0.5
    }, 0)
    .to("#leaf-rm g", {
      duration: 2.25,
      scale: 1,
      delay: 0.6
    }, 0);

  return tl;
}

function stopAndReset() {
  gsap.killAll(false, true, false);
  gsap.set("#tree", { clearProps: "all" });
  gsap.set("#shadow", { clearProps: "all" });
  gsap.set("#leaf-top", { clearProps: "all" });
  gsap.set("#leaf-rb", { clearProps: "all" });
  gsap.set("#leaf-rm", { clearProps: "all" });
  gsap.set("#leaf-lb", { clearProps: "all" });
  gsap.set("#leaf-lm", { clearProps: "all" });
  gsap.set("#leaf-top", { clearProps: "all" });
  gsap.set("#leaf-rb g", { clearProps: "all" });
  gsap.set("#leaf-rm g", { clearProps: "all" });
  gsap.set("#leaf-lb g", { clearProps: "all" });
  gsap.set("#leaf-lm g", { clearProps: "all" });
}


// Iniciar la animación cuando se carga el documento
document.addEventListener("DOMContentLoaded", function() {
  setup();
  animate();
});
