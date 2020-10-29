// var wordlist = [
//   'Five-of-a-kind',
//   'Straight Flush',
//   'Four-of-a-kind',
//   'Full-House',
//   'Flush',
//   'record',
//   'Straight',
//   'Three-of-a-kind',
//   'Two-Pair',
//   'Jacks-or-better',
// ];

// function buildSlotItem(text) {
//   return $('<div>').addClass('slottt-machine-recipe__item')
//     .text(text);
// }

// function buildSlotContents($container, wordlist) {
//   $items = wordlist.map(buildSlotItem);
//   $container.append($items);
// }

// function popPushNItems($container, n) {
//   $children = $container.find('.slottt-machine-recipe__item');
//   $children.slice(0, n).insertAfter($children.last());

//   if (n === $children.length) {
//     popPushNItems($container, 1);
//   }
// }

// // After the slide animation is complete, we want to pop some items off
// // the front of the container and push them onto the end. This is
// // so the animation can slide upward infinitely without adding
// // inifinte div elements inside the container.
// function rotateContents($container, n) {
//   setTimeout(() => {
//     popPushNItems($container, n);
//     $container.css({ top: 0 });
//   }, 300);
// }

// function randomSlotttIndex(max) {
//   var randIndex = (Math.random() * max);
//   return (randIndex > 5) ? randIndex : randomSlotttIndex(max);
// }

// function animate() {
//   var wordIndex = randomSlotttIndex(wordlist.length);
//   $wordbox.animate({ top: -wordIndex * 100 }, 500, 'swing', () => {
//     rotateContents($wordbox, wordIndex);
//   });
// }

// $(() => {
//   $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
//   buildSlotContents($wordbox, wordlist);
//   buildSlotContents($wordbox, wordlist);
//   buildSlotContents($wordbox, wordlist);
//   buildSlotContents($wordbox, wordlist);

//   setInterval(animate, 2000);
// });
