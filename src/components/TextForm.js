import React, {useState} from 'react' //useState is a Hook.
//import PropTypes from 'prop-types' 

let checkCase = 0;
export default function TextForm(props) {
    
    // "Enter text here" is default value and setText will be update accordingly.
    const [text, setText] = useState(""); //text is a state here.
    //text = "new text"; incorrect way to update text.
    //setText = "new text"; correct way
    
    const changeCase = () => {
        //console.log("Upper case is clicked.");
        let newText;
        if(checkCase === 0) {
            newText = text.toUpperCase();
            setText(newText);
            checkCase = 1;
            document.getElementById('changeCase').innerHTML = 'Lower Case';
           // console.log("Upper case");
            props.showAlert("Text switched to Upper Case!", "success");
        }
        else {
            newText = text.toLowerCase();
            setText(newText);
            checkCase = 0;
            //console.log("Lower case");
            props.showAlert("Text switched to Lower Case!", "success");
            document.getElementById('changeCase').innerHTML = 'Upper Case';
        }
    };

    //event object is free from React.
    const typing = (event) => {
        //console.log("On change event fired.");
        setText(event.target.value); //Now the field can be edited.
    }

    // const findLength = () => {
    //     let len;
    //     len = text.length;
    //     //console.log(len);
    //     alert("Length of the entered text = " + len);
    // }

    const clearText = () => {
        setText("");
        props.showAlert("Textarea has been cleared!", "success");
    }

    
    // const speak = () => {
    // let msg = new SpeechSynthesisUtterance();
    // msg.text = text;
    // window.speechSynthesis.speak(msg);
    // }

    const speak = () => {
        let msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
        const toggle = document.getElementById('speakStop')
        if (toggle.textContent === "Speak") {
            toggle.innerHTML = "Stop";
        }
        else {
            toggle.innerHTML = "Speak"
            if (toggle.innerHTML === "Speak"){
                window.speechSynthesis.cancel()
            }
        }
    }

    const replace = () => {
        //console.log("New Replace triggered.");
        let old_text = document.getElementById('old_text').value;
        let new_text = document.getElementById('new_text').value;
        setText(text.replaceAll(old_text, new_text));
        props.showAlert(`"${old_text}" has been replaced with "${new_text}"`, "success");
    }

    // const replace = () => {
    //     let old_text = prompt("Enter the word to be replaced!");
    //     let new_text = prompt("Enter new word!");
        
    //     setText(text.replaceAll(old_text, new_text)); 
    // }

    const copyText = () => {
        //let newText = document.getElementById("myBox");
        // newText.select();
        navigator.clipboard.writeText(text);
        props.showAlert("Text has been copied!", "success");
    }

    const removeExtraSpaces = () => {
        let newText = text.split(/[ ]+/); //RegEx
        setText(newText.join(" "));
        props.showAlert("Extra spaces have been removed!", "success");
    }


    return (
    <>
    <div className="container my-1" style={{color:props.mode==='dark'?'white':'black'}}>
    <h1>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} style={{backgroundColor:props.mode==='dark'?'#13466e':'white', color:props.mode==='dark'?'white':'black'}} onChange={typing} id="myBox" rows="10"></textarea>  
            {/* in style we're writing in js so 2 curly braces. */}
        </div>
        <button disabled= {text.length===0} className="btn btn btn-primary mx-2 my-2" id = "changeCase" onClick = {changeCase}>Change Case</button>
        {/* <button className="btn btn btn-primary mx-2" onClick = {findLength}>Find Length</button> */}
    
        {/* <!-- Button trigger modal --> */}
        <button type="button" disabled= {text.length===0} className="btn btn-primary mx-2 my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Replace</button>
                
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel"> Enter the word </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div className="input-group">
                    <span className="input-group-text">Enter text</span>
                    <input type = "text" className = "form-control" id = "old_text" placeholder="Old text"/>
                    <input type = "text" className = "form-control" id = "new_text" placeholder ="New text"/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick = {replace} data-bs-dismiss="modal">Replace</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel
                    </button>
                </div>
                </div>
            </div>
            </div>

        {/* <button className="btn btn btn-primary mx-2">Font Style</button> */}
        <button className="btn btn btn-primary mx-2 my-2" disabled= {text.length===0} onClick = {copyText}>Copy</button>
        <button className="btn btn btn-primary mx-2 my-2" disabled= {text.length===0} onClick = {removeExtraSpaces}>Remove Extra Spaces</button>
        <button disabled= {text.length===0} className="btn btn btn-primary mx-2  my-2" id="speakStop" onClick={speak}>Speak</button>
        <button disabled= {text.length===0} className="btn btn btn-primary mx-2  my-2" onClick = {clearText}>Clear Text</button>


    </div>

    <div className="container my-3" style={{color:props.mode==='dark'?'white':'black'}}>
        <h2>Your text summary :</h2>
        <p> {text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters. </p>
        <p> {(60/300) * text.split(" ").filter((element) => {return element.length!==0}).length} minutes read.</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to preview."}</p>
    </div>
    </>
  )
}