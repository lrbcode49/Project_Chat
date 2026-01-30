







// Project Chat with Gemini 3













//@lrbcode49
// project  V1 - basic chat interface
// add  API  Google Gemini 3 
// add  Sidenavication history chat
// add  loading animation while waiting for response
// style  chat interface
// style  Sidenavication 
// save history chat in Sidenavication
// 2026


const  Sidenavication = document.querySelector('.Sidenavication'),
       faBar = document.querySelector('.faBar')
       buttonSendRq = document.querySelector('.fa-paper-plane');
       textarea = document.querySelector('textarea');
       chatheader = document.querySelector('.chatheader h1');
       chatbody = document.querySelector('.chatbody');
       Userquestion = document.querySelector(".chatbody .Userquestion");
       responseBot = document.querySelector(".chatbody .responseBot");
       historyData  = document.querySelector(".history ul")







faBar.addEventListener("click", () =>{
    Sidenavication.classList.toggle("closed");
    console.log(Sidenavication.classList);

})


textarea.addEventListener("keyup", (event) =>{  
    if(event.target.value.length  > 0) {
        buttonSendRq.style.display ="block"
    }
    else{
     buttonSendRq.style.display ="none"
    }       
}
)

// function to send request test 

function sendRequest(){

    const  textareaValue = textarea.value
    chatheader.style.display = "none";



    chatbody.innerHTML += `
     <span class="Userquestion"> 
            <img src="https://i.pinimg.com/originals/01/19/7d/01197dcbb0e140dea6049f56da1f54bf.gif" alt="" class="iconAVA">
            ${textareaValue}
           </span> <br/>


           <span class="responseBot"> 
            <img src="https://cliply.co/wp-content/uploads/2020/09/442008571_ARTIST_AVATAR_3D_400px.gif" alt="" class="iconAVA">
                <div class="loader">
      <div class="animatedBG"></div>
      <div class="animatedBG"></div>
      <div class="animatedBG"></div>
    </div>
  </div>
           </span>
           <hr/>
   
    `;

    buttonSendRq.style.display ="none"
    chatbody.scrollTop = chatbody.scrollHeight;
    SaHistory(textarea.value, true)
    textarea.value = "";





    const API_KEY = 'HAHAHA :)';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{
            parts: [{ text: textareaValue}]
        }]
    }

    axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            
            const text = response.data.candidates[0].content.parts[0].text

            // remove in response ** 
            console.log(text.split("**"))
            const responseBotelement = document.querySelectorAll(".responseBot")[document.querySelectorAll(".responseBot").length - 1]
            console.log("Gemini Response:", text)
            responseBotelement.innerHTML = `
            <img src="https://cliply.co/wp-content/uploads/2020/09/442008571_ARTIST_AVATAR_3D_400px.gif" alt="" class="iconAVA">
            ${text}
            `

            
            // chatbody.scrollTop = chatbody.scrollHeight
        })
        .catch(error => {
            console.error("Error:", error);
        });


   





}




function SaHistory(quistion , history){
    if(history){
     historyData.innerHTML += `
     <li>${quistion}</li>
     `
    }

}



