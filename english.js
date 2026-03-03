
const createElements =(arr) =>{
    const htmlElements=arr.map((el) =>`<span class="btn">${el} </span>`);
    return(htmlElements.join(" "))
}


const managesSpiner =(ststs)=>{
  if(ststs ==true){
    document.getElementById("spiner").classList.remove("hidden");
    document.getElementById("word-continer").classList.add("hidden");

  }
  else{
    document.getElementById("word-continer").classList.remove("hidden");
    document.getElementById("spiner").classList.add("hidden");

  }

}




const lodeLison =()=>{
   
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((res) => res.json())
      .then((json) => display(json.data));
}


const revmoveActive =()=>{
   const lessonButtons = document.querySelectorAll(".lesson-btn");
//    console.log(lessonButtons)
lessonButtons.forEach((btn) => btn.classList.remove("active"));
}


const lodeLevelWord=(id)=>{
  managesSpiner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
     .then((res) => res.json())
     .then((data) => {
        revmoveActive() //revmove a active cllas

        const clickbtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickbtn)
        clickbtn.classList.add("active") //add active clas
        displayLevelWord(data.data);
     });
}

const loadWordDetail= async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url)
    const res = await fetch(url)
    const derails =await res.json()
    displaydetails(derails.data);

}

const displaydetails=(word)=>{
    console.log(word)
// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }


    const detilsBox = document.getElementById("detils-continer");
    detilsBox.innerHTML = `
      <div class="">
    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>
  </div>
  <div class="">
    <h2 class="text-xl font-bold">Meaning</h2>
    <p>${word.meaning}</p>
  </div>
  <div class="">
    <h2 class="text-xl font-bold">Example</h2>
    <p>${word.sentence}</p>
  </div>
  <div class="">
    <h2 class="text-xl font-bold">সমার্থক শব্দ গুলো</h2>
   
    <div class="">${createElements(word.synonyms)} </div>
  </div>
    
    `;

    document.getElementById("word_modal").showModal()

}



const displayLevelWord =(words)=>{
  const wordContiner = document.getElementById("word-continer");
  wordContiner.innerHTML = "";


  if(words.length ==0){
    wordContiner.innerHTML = `
    <div class="text-center col-span-full rounded-xl py-10 bg-white space-y-2">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="font-bangla font-medium text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <p class="font-bangla font-bold text-2xl">নেক্সট Lesson এ যান</p>
    </div>
    `;
    managesSpiner(false)
    return
  }
  // {
  //     "id": 106,
  //     "level": 2,
  //     "word": "Sleep",
  //     "meaning": "ঘুমানো",
  //     "pronunciation": "স্লিপ"
  // }

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-15 px-5 space-y-4">

        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="font-medium text-2xl font-bangal">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciationপাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF40]"><i class="fa-solid fa-volume-high"></i></button>
 
        </div>
      </div>
        
        
        `;

    wordContiner.append(card);
  });
  managesSpiner(false)
}





const display=(lessons)=>{
    // console.log(lessons.data)

    // 1 get the continer & emtpty

    const levelContiner = document.getElementById("level-continer");
    levelContiner.innerHTML="";


    //2 get into evey lessons
    for(let lesson of lessons){
        // 3  create Elment
        

        const btnDiv =document.createElement("div")
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="lodeLevelWord(${lesson.level_no})" class="btn  btn-outline btn-primary lesson-btn">

        <i class="fa-brands fa-leanpub"></i>Lessons - ${lesson.level_no}

         </button>
        
        `;
        // 4 appen Child 

        
        levelContiner.append(btnDiv)
    }
}
lodeLison()