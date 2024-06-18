function applyBionicReading(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    if (text.length > 0) {
      const words = text.split(/\s+/);
      const bionicWords = words
        .map((word) => {
          const midpoint = Math.ceil(word.length / 2);
          return `<b>${word.substring(0, midpoint)}</b>${word.substring(
            midpoint
          )}`;
        })
        .join(" ");
      const span = document.createElement("span");
      span.innerHTML = bionicWords;
      return span;
    }
  }
  return null;
}

function processElement(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  const nodes = [];

  let node;
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }

  nodes.forEach((textNode) => {
    const bionicSpan = applyBionicReading(textNode);
    if (bionicSpan) {
      textNode.parentNode.replaceChild(bionicSpan, textNode);
    }
  });
}

processElement(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        processElement(node);
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
