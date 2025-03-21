const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText =
    "Joshua Tree would be 94 fahrenheit all week when :insertx: were going there for Spring break. An activity they wanted to do was :inserty:. They unfortunatley got stranded on the side of the highway instead, and :insertz:. However, this is not surprising — :insertx: weigh 300 pounds, and Tyra Banks put a curse on them.";
const insertX = ["the girls", "the wooks", "the cast of the Jersey Shore"];
const insertY = ["hike the big rocks", "tan in the hottub", "stargaze"];
const insertZ = ["had to hitchhike", "got run over by a semitruck", "ran the rest of the way instead"];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;

    const xItem = randomValueFromArray (insertX);
    const yItem = randomValueFromArray (insertY);
    const zItem = randomValueFromArray (insertZ);

    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replace(":inserty:", yItem);
    newStory = newStory.replace(":insertz:", zItem);

    if(customName.value !== '') {
        newStory = newStory.replace("Tyra Banks", customName.value);
    }

    if(document.getElementById("uk").checked) {
        const weight = Math.round(300/14) + 'stone';
        const temperature =  Math.round(((94-32) * 5) / 9) + "centigrade";
        newStory = newStory.replace("94 fahrenheit", temperature);
        newStory = newStory.replace("300 pounds", weight);
    }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}