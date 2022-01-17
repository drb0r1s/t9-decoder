// T9 Decoder by drb0r1s

console.log("--> JavaScript T9 Decoder <--");
console.log("Developer: drb0r1s\n\n");

decoder();

function decoder() {
  const t9Row = " ,.?!abcdefghijklmnopqrstuvwxyz";
  let t9Keyboard = [];

  let columnMaker = 0;
  let numberOfColumns = 0;

  let oneColumn = [];

  for(let i = 0; i < t9Row.length + 1; i++) {
    const mainCase = numberOfColumns !== 0 && numberOfColumns !== 1 && numberOfColumns !== 7 && numberOfColumns !== 9 && columnMaker === 3;
    const specialCase = numberOfColumns === 1 || numberOfColumns === 7 || numberOfColumns === 9;
    const fourCharactersCase = specialCase && columnMaker === 4;
    const oneCase = numberOfColumns === 0 && columnMaker === 1;
  
    if(
      mainCase ||
      fourCharactersCase ||
      oneCase
    ) {
       t9Keyboard.push(oneColumn);
       oneColumn = [];
   
       columnMaker = 0;
       numberOfColumns++;
      }
  
    oneColumn.push(t9Row[i]);
  
    columnMaker++;
  }

  const OPTION_LIST = {
    TEXT_TO_CODE: "Convert text to code",
    CODE_TO_TEXT: "Convert code to text"
  };

  const { TEXT_TO_CODE, CODE_TO_TEXT } = OPTION_LIST;
  const allOptions = Object.values(OPTION_LIST);

  const optionError = "\nINFO: No such option!";
  const valueError = "\nERROR: You must enter valid values!";
  const typeError = "\nERROR: Type error, you must enter valid code (e. g. 2 33 444)!";

  console.log("T9 Decoder Options:");

  allOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });

  const option = parseInt(prompt("Choose T9 Decoder option: "));

  let input;

  if(allOptions[option - 1] !== undefined) {
    input = prompt(`${allOptions[option - 1]}:`);
  
    for(let i = 0; i < input.length; i++) {
      if(allOptions[option - 1] === TEXT_TO_CODE) {
        if(!isNaN(parseInt(input[i]))) return console.log(valueError);
      }

      if(allOptions[option - 1] === CODE_TO_TEXT) {
        if(
          isNaN(parseInt(input[i])) &&
          input[i] !== " "
        ) return console.log(valueError);
      }
    }
  
    console.log(`\nMODE: ${allOptions[option - 1]}`);
  }

  switch(allOptions[option - 1]) {
      case TEXT_TO_CODE:  
        let textCoder = "";

        for(let i = 0; i < input.length; i++) {
          t9Keyboard.forEach((array, index) => {
            for(let j = 0; j < array.length; j++) {
              if(input[i].toLowerCase() === array[j]) {
                let generateCode = index;
              
                if(j === 0) textCoder += generateCode;
              
                else for(let repeats = 0; repeats < j + 1; repeats++) {
                  textCoder += generateCode;
                }

                textCoder += " ";
              }
            }
          });
        }

        console.log(`\nText: ${input}`);
        console.log(`T9 Code: ${textCoder}`);

        break;
      case CODE_TO_TEXT:
        let codeCoder = "";
        let sentence = [];
        let sameNumbers = [];

        for(let i = 0; i < input.length; i++) {        
          if(input[i] === " ") {
            sentence.push(sameNumbers);
            sameNumbers = [];
          }
        
          else {
            sameNumbers.push(parseInt(input[i]));
          
            if(i === input.length - 1) {
              sentence.push(sameNumbers);
              sameNumbers = [];
            }
          }
      }

        let differentNumbers = false;
    
        for(let i = 0; i < sentence.length; i++) {
          for(let j = 0; j < sentence[i].length - 1; j++) {
            if(sentence[i][j] !== sentence[i][j + 1]) differentNumbers = true;
          }
        }

        if(differentNumbers) return console.log(typeError);

        for(let i = 0; i < sentence.length; i++) {
          codeCoder += t9Keyboard[sentence[i][0]][sentence[i].length - 1];
          if(t9Keyboard[sentence[i][0]][sentence[i].length - 1] === undefined) return console.log(typeError);
        }
    
        console.log(`\nT9 Code: ${input}`);
        console.log(`Text: ${codeCoder}`);

        break;
      default: console.log(optionError);
  }

  console.log("\nSYSTEM: Use T9 Decoder again?");
  console.log("1. Yes\n2. No");

  const answer = parseInt(prompt("Do you want to use the Decoder again?"));

  switch(answer) {
    case 1:
      console.log("\nSYSTEM: T9 Decoder will start again!\n\n");
      decoder();

      break;
    case 2:
      console.log("\nSYSTEM: T9 Decoder is off!");
      console.log("Developer: drb0r1s");

      break;
    default: console.log(optionError);
  }
}
