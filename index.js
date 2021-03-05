const addNode = document.getElementById("addNode");

const addNewData = (text = "") => {
    
    // console.log(`${text ? "true":"false"}`);
    
    const note = document.createElement("div");
     note.classList.add("node"); 
    
    const htmlData = `
        <div class="icon-list">
            <span class="edit"><i class="far fa-edit mx-1"></i></span>
            <span class="trash"><i class="fas fa-trash mx-1"></i></span>
        </div>
        <p class="main ${text ? "" : "hidden" }"></p>
        <textarea class="textData ${text ? "hidden" : "" }" placeholder="Write Notes..."></textarea> 
    `;
    
    note.insertAdjacentHTML("afterbegin",htmlData);
    
        //  get refrences ---
        const editButton = note.querySelector(".edit");
         const deleteButton = note.querySelector(".trash");
        const mainDiv = note.querySelector(".main");
        const textArea = note.querySelector(".textData");

        deleteButton.addEventListener("click", () =>{ 
             note.remove();
              updatestore();
        });
        textArea.value = text;
        mainDiv.innerHTML = text;

        editButton.addEventListener("click" , () =>{
            mainDiv.classList.toggle("hidden");
            textArea.classList.toggle("hidden");
        })

        textArea.addEventListener("change", (event) => {
            const value = event.target.value;
            mainDiv.innerHTML = value;

            updatestore();
        });
         
        document.body.appendChild(note);
};

const updatestore = () => {
    const textValue = document.querySelectorAll("textarea");
    const notes = [];

    textValue.forEach( (notetext) => {
        return notes.push(notetext.value);
    })
     
    localStorage.setItem("notes", JSON.stringify(notes));
};

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes){ notes.forEach( (note) => addNewData(note) )}


addNode.addEventListener("click", () => addNewData());
