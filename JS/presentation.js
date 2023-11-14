function hasClassName(inElement, inClassName) {
  var regExp = new RegExp("(?:^|\\s+)" + inClassName + "(?:\\s+|$)");
  return regExp.test(inElement.className);
}

function addClassName(inElement, inClassName) {
  if (!hasClassName(inElement, inClassName))
    inElement.className = [inElement.className, inClassName].join(" ");
}

function removeClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName)) {
    var regExp = new RegExp("(?:^|\\s+)" + inClassName + "(?:\\s+|$)", "g");
    var curClasses = inElement.className;
    inElement.className = curClasses.replace(regExp, " ");
  }
}

function toggleClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName))
    removeClassName(inElement, inClassName);
  else addClassName(inElement, inClassName);
}

const animated = document.getElementById("shape");
const portfolioWork = document.getElementById("portfolioWork");
const containerPortada = document.getElementById("containerPortada");

animated.onanimationend = () => {
  var shape = document.getElementById("shape");
  if (hasClassName(shape, "cube cubeAnimacion")) {
    removeClassName(shape, "cube cubeAnimacion");
    addClassName(shape, "ring ringAnimacion");
  } else if (hasClassName(shape, "ring ringAnimacion")) {
    removeClassName(shape, "ring ringAnimacion");
    addClassName(shape, "final finalAnimacion");
    portfolioWork.style.display = "inline";
  } else if (hasClassName(shape, "final")) {
    containerPortada.classList.add("fadeOut");
    setTimeout(() => {
      containerPortada.style.display = "none";
    }, 20000);
  }
};
