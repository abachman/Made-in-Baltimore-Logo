// resize word, keeping the bottom edge in the same place relative to box
// and box in same place relative to center
function place_logo_words(el, word_dim) {
  // resize top word and place within .logo class
  var new_word = $(el), counter = 0

  while (Math.abs(new_word.width() - word_dim.width) > 4 && counter < 256 && word_dim.font_size < 240) {
    if (new_word.width() > word_dim.width) {
      // make it smaller
      new_word.css('font-size', --word_dim.font_size + 'px')
    } else {
      // make it bigger
      new_word.css('font-size', ++word_dim.font_size + 'px')
    }
    counter++
  }

  if (word_dim.font_size >= 240) {
    word_dim.font_size = 239
    new_word.css('font-size', word_dim.font_size + 'px')
  }

  // align
  new_word.offset({top: word_dim.bottom - new_word.height()})
}
