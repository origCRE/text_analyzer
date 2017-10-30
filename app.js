
function mostFrequentWord(words) {
  var wordFrequencies = {}; // initialize an empty object
  
  for (var i = 0; i <= words.length; i++) {  // loop thru entire words array
    if (words[i] in wordFrequencies) {  // is this element already in the wordFrequencies obj?
      wordFrequencies[words[i]]++;      // then increment the respective wordFrequencies' total ...
    }
    else {                              // if the elt is not in the wordFrequencies obj add it in w/a val of 1...
      wordFrequencies[words[i]]=1;
    }
  }
  console.log(wordFrequencies); // spot check

  var currentMaxKey = Object.keys(wordFrequencies)[0]; // prep the currentMaxKey var for processing...
  console.log(Object.keys(wordFrequencies)[0]);  // spot check
  var currentMaxCount = wordFrequencies[currentMaxKey]; // prep currentMaxCount var for processing...
  console.log(wordFrequencies[currentMaxKey]); // spot check

  for (var word in wordFrequencies) {                    // iterate through wordFrequencies obj...
    if (wordFrequencies[word] > currentMaxCount) {       // does the elt's word have more hits than currentMaxCount?
      currentMaxKey = word;                              // then reset the key and count vars...
      currentMaxCount = wordFrequencies[word];
      console.log("looking at '" + currentMaxKey + "' with a count of: " + currentMaxCount);
    }
  }
  return currentMaxKey;                                  // send back the result...
} 

function getTokens(rawString) {
  // clean up the string...return it after doing this:
  // .replace(): the replace part is replacing all car. rtn / line feeds with spaces (to be cleaned in the .split() next)
  // .split() : build an array of words only by splitting on spaces and puncuation;
  // .filter() : remove "falsey" items such as "false, null, undefined, 0, NaN or emptystring from array
  // .sort() : sort alphanumerically
  return rawString.toLowerCase().replace(/\r?\n|\r/g, " ").split(/[ ,!.";:-]+/).filter(Boolean).sort();
}

function reportProcessor(wordCount, uniqueCount, avgWordLen, mostFreqWord){
	//grab the <dl> js-rpt to generate the report...
	var report = $('.js-rpt');
	//place all values in the rpt...
	report.find('.js-word-count').text(wordCount);
	report.find('.js-unique-word-count').text(uniqueCount);
	report.find('.js-avg-word-len').text(Math.round(avgWordLen));
	report.find('.js-frq-word').text(mostFreqWord);
	report.removeClass('hidden');
}


function textProcessor(text) {
  var words = getTokens(text); // recieve a sorted/cleaned/alphaNum sorted list of all words
  console.log(words);

  // get total word count...
  wordCount = words.length;
  console.log("The word count is..." + wordCount);

  // get unique word count...
  // use the Set Object (sets is like an array but can only hold UNIQUE values...
  unique = new Set(words);
  uniqueCount = unique.size;
  console.log("The unique words in the text are: ");
  console.log(unique);
  console.log("There are "+ unique.size + " unique words in the submitted text.");

  // get avg word len...
  // a: join all vals together b: divide by len of words array:
  avgWordLen = ( (words.join("").length) / words.length);
  console.log(Math.round(avgWordLen));

  // get the most mostFrequentWord:
  mostFreqWord = mostFrequentWord(words);
  console.log(mostFreqWord);

  // make the report...
  reportProcessor(wordCount, uniqueCount, avgWordLen, mostFreqWord);

}

function handleFormSubmit() {
	rawText = "";
	$(".js-textgetter-form").submit(function(event) {
		event.preventDefault();
		// get the text...
		var rawText = $(this).find('#user-text').val();
	    console.log(rawText);
		textProcessor(rawText);
	});
}

//initiate js processes for page...
$(function() {
	handleFormSubmit();
});
