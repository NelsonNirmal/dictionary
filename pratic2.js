var value=document.getElementById('input').value
var value1=document.getElementById('ser')
var value2=document.getElementById('sir')
var definition=document.getElementById('def')
var example=document.getElementById('ex')
var word=document.getElementById('word')
var real_word=document.getElementById('real_word')
var syn=document.getElementById('syn')
var real_word2=document.getElementById('real_word2')
var ant=document.getElementById('ant')



function output() {
      example.innerHTML="Example:"
      syn.innerHTML="Synonyms:"
      ant.innerHTML="Antonyms:"
      var x = document.getElementById("input").value;
      definition.innerHTML="Definiton:"
      word.innerHTML="Word:"
      word.innerHTML+=x
fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+x)
      .then(response =>response.json())
      .then((mes)=>{

          value1.innerHTML=mes[0].meanings[0].definitions[0].definition
          value2.innerHTML=mes[0].meanings[0].definitions[0].example
          real_word.innerText=mes[0].meanings[0].definitions[0].synonyms[0]
          real_word.innerHTML+=","+mes[0].meanings[0].definitions[0].synonyms[1]
          real_word2.innerHTML=mes[0].meanings[0].definitions[0].antonyms[0]
          real_word2.innerHTML+=","+mes[0].meanings[0].definitions[0].antonyms[1]
            
      })

}
      
      
      
      