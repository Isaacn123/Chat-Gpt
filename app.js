// const  API_KEY = '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';
//    const  API_KEY = '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';
import env from  './env';
   const buttonElement = document.querySelector('button');
   const outPutElement =  document.getElementById('output');
   const inputfield =  document.querySelector('input');
   const historyElement = document.querySelector('.history');
   const submitElement = document.querySelector('#submit');

   var datafile = "";
   console.log(env);
async function fetchdata(){

    console.log("Clicked ");
   var url = 'https://api.openai.com/v1/chat/completions'
   try {
    const response = await fetch(url,{
        method: "POST",
        headers:{
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            // model: "gpt-4",
            model: "gpt-3.5-turbo",
            // prompt: "hello,how can i learn ChatGPT development",
            // max_tokens:7,
            temperature: 0,
            messages:[{
                    role: "user",
                    content: inputfield.value //"Hello!",
                    // max_tokens:100

                }]
        })
    })
    const data = await response.json();
    console.log(data.choices[0]);
    var converter = new showdown.Converter(),
    text      = data.choices[0].message.content;
    html      = converter.makeHtml(text);
    outPutElement.innerHTML = html;
    
    // datafile = text;
    // type();

    if(data.choices[0].message.content && inputfield.value){
        const pElement = document.createElement('p');
        pElement.textContent = inputfield.value;
        /// creating a function callback to insert history Text 
        pElement.addEventListener('click', ()=> changeInput(pElement.textContent));
        historyElement.append(pElement);

    }
    
   } catch (error) {
    
    console.log(error);
   }
}

function type(){
    console.log("DF",datafile);
    var i = 0;
    if (i < datafile.length) {
        outPutElement.innerHTML = datafile.slice(0, i) + '<span class="blinking-cursor">|</span>';
        i++;
        setTimeout(type, Math.random() * 150 + 50);
        } else {
            outPutElement.innerHTML = datafile.slice(0, i) + '<span class="blinking-cursor">|</span>';
        }
}
type();
function clearInput(){
    inputfield.value = '';
    console.log('am chaginf value');
}

function changeInput(value){
const inputElement = document.querySelector('input');
 inputElement.value = value;
}

submitElement.addEventListener('click', fetchdata);
buttonElement.addEventListener('click', clearInput);
// fetchdata()