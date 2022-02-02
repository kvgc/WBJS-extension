//// variables
var note_count=1;



/////////////// Hightlight + Annotate block //////////////////////
// highlight and annotate  when tilde(`) key is pressed

/// customizable variables
/// Go to https://keycode.info/ to find keycodes

var createNoteKeyCode = 49 ;  // corresponds to 1 on keyboard
var saveAnnotationsKeyCode= 50; // corresponds to 2 on keyboard
var loadAnnotationsKeyCode=51 ; // corresponds to 3 on keyboard
var startmqttKeyCode=52 ; // corresponds to 4 on keyboard
var saveAllNotes = 53; // correspodns to 5 on keyboard

// controls the specs of the notes
var defaultNoteColor = "#ffffcc";
var defaultFont= "13px";
var defaultOpacity = "80%";


/////// variables used /////////
var note_count=1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
var url_window = window.location.href;




document.addEventListener('keydown', workerFunction);
function workerFunction(e){

    var toggleHighlight= false;

    if(e.ctrlKey){


        //////// save annotation block ///////
        /// Saves the annotations to local .txt file when Ctrl+3 is pressed
        if(e.keyCode==saveAnnotationsKeyCode){
            var dict = {};

            // grab all notes
            var allNotes=document.getElementsByClassName("ui-widget-content");
            var allNotes_html = ''

            for(var i=0;i<allNotes.length;i++){
                allNotes_html+= allNotes[i].outerHTML; // getting all notes
            }

            dict[webPageUrl] = allNotes_html;
            var encode_obj= encodeURIComponent(JSON.stringify(dict));
            var makeNewID = Number(new Date());
            var encode_obj1 = encode_obj.replaceAll("tooltip","tooltip"+ makeNewID);

            // save note  as text file
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/txt;charset=utf-8,' + encode_obj1;
            hiddenElement.target = '_blank';
            hiddenElement.download = webPageUrl +'.txt';
            hiddenElement.click();



         // grab all notes
        var allNotes=document.getElementsByClassName("ui-widget-content");
        var allNotes1=document.getElementsByClassName("pell-content");
        var allNotes_html1 = '<h1> Page notes : ' + url_window + '</h1><br>';

        var dates = $('[id^="tooltip"]');


        for(var i=0;i<allNotes.length;i++){

            allNotes_html1+=  '<a href="'+url_window+"#"+dates[i].id+ '"">' +url_window+"#"+dates[i].id+ "</a><br>";
            allNotes_html1+= "<blockquote>"+allNotes1[i].innerHTML+"</blockquote>";

        }


            $("body").append ( '                                           \
                <div id="notesHTML" style="left: 70%; height: 50%; \
            position: fixed; width: 25%; bottom: 45%;background-color:#d9ffcc; border-style: double;  border-radius: 10px; opacity:80%; overflow-y: scroll; \
            display: inline-block; max-width: 80%;overflow-x: hidden;"> This is a test </div>                                                      \
            ');
            $("#notesHTML").html(allNotes_html1);
            $('#notesHTML').delay(15000).fadeOut('slow');


            // add note to local storage
            var currentAnnotations = localStorage.getItem("annotations");
            localStorage.setItem("annotations",currentAnnotations +  "\n " + webPageUrl + "," + makeNewID);
            localStorage.setItem(webPageUrl, allNotes_html.replaceAll("tooltip","tooltip"+ makeNewID));



            $.notify('Added notes to local storage', "success");

          }


         /// End of save annotation block///


         if(e.keyCode==saveAllNotes){
            var currentAnnotations = localStorage.getItem("annotations");
            var encode_obj= encodeURIComponent(currentAnnotations);
            // save note  as text file
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/txt;charset=utf-8,' + encode_obj;
            hiddenElement.target = '_blank';
            hiddenElement.download = 'all_annotations.csv';
            hiddenElement.click();

         }


          /////////////// Upload annotations block //////////////////////
          // Allow user to upload annotations when the Ctrl+2 key is pressed- code adapted from
          //https://stackoverflow.com/questions/19038919/is-it-possible-to-upload-a-text-file-to-input-in-html-js/19039880

        if(e.keyCode==loadAnnotationsKeyCode){

            // load from local storage
            const cat = localStorage.getItem(webPageUrl);
            console.log(cat);

            $.notify('Loaded notes from local storage', "success");



            var AnnotationsBlock = document.createElement('div');
            AnnotationsBlock.id ="ImportedAnnotations";
            AnnotationsBlock.innerHTML=cat;
            document.body.appendChild(AnnotationsBlock);

            // Enable interactivity for all the imported annoations using jquery
              for(var dd1=0;dd1<AnnotationsBlock.childNodes.length;dd1++){
                for(var dd2=0;dd2<AnnotationsBlock.childNodes[dd1].childNodes.length;dd2++){

                  console.log(AnnotationsBlock.childNodes[dd1].childNodes[dd2].id);
                  $('#'+AnnotationsBlock.childNodes[dd1].childNodes[dd2].id).mousedown(handle_mousedown);

                }

                // allows user to delete the imported annotation by clicking the right click after user confirmation
                AnnotationsBlock.childNodes[dd1].addEventListener('contextmenu', function(ev) {
                if(confirm("Are you sure you want to delete this imported note?")){
                  ev.preventDefault();
                  ev.target.remove();
                  return false;
                }}, false);
              }









            function uploadText() {
              return new Promise((resolve) => {
                // create file input1`1
                const uploader = document.createElement('input')
                uploader.type = 'file'
                uploader.style.display = 'none'
                uploader.multiple=true;

                // listen for files
                uploader.addEventListener('change', () => {
                  const files = uploader.files

                  if (files.length) {
                    for(var dd=0;dd<files.length;dd++){
                      const reader = new FileReader()
                      reader.addEventListener('load', () => {
                        uploader.parentNode.removeChild(uploader)
                        resolve(reader.result)
                      })
                      reader.readAsText(files[0])
                    }

                  }
                })

                // trigger input
                document.body.appendChild(uploader)
                uploader.click()
              })
            }

          // usage example
            uploadText().then(text => {
              //once loaded check update the html page if the dictionary has the notes for the current URL
              var UserUploadedAnnotaions= JSON.parse(text)[webPageUrl ];
              var AnnotationsBlock = document.createElement('div');

              AnnotationsBlock.id ="ImportedAnnotations";
              AnnotationsBlock.innerHTML=UserUploadedAnnotaions;
              document.body.appendChild(AnnotationsBlock);


              // Enable interactivity for all the imported annoations using jquery
              for(var dd1=0;dd1<AnnotationsBlock.childNodes.length;dd1++){
//                 for(var dd2=0;dd2<AnnotationsBlock.childNodes[dd1].childNodes.length;dd2++){

//                   $('#'+AnnotationsBlock.childNodes[dd1].childNodes[dd2].id).mousedown(handle_mousedown);

//                 }

                  // allows user to delete the imported annotation by clicking the right click after user confirmation
                AnnotationsBlock.childNodes[dd1].addEventListener('contextmenu', function(ev) {
                if(confirm("Are you sure you want to delete this imported note?")){
                  ev.preventDefault();
                  ev.target.remove();
                  return false;
                }}, false);
              }
            })
          }
      addNotes();

        /// End of upload-annotation block///

        /////////////// Hightlight + Annotate block //////////////////////
        // highlight and annotate  when Ctrl+1 key is pressed

        if(e.keyCode ==createNoteKeyCode){

             ////////// highlighting ///////////


            function createHighlight(range){

              var newNode = document.createElement("span");
              newNode.id = "popcorn"+note_count;


//               newNode.setAttribute("style", "background-color:#d9ffcc;");

              newNode.appendChild(range.extractContents());``
              range.insertNode(newNode);

            }





            if(window.getSelection().rangeCount >0){

              var selection = window.getSelection();
              var range = selection.getRangeAt(0);
              createHighlight(range);

            }


            ////////// annotate ///////////
            if(window.getSelection().rangeCount >0){
              var newNode1 = document.createElement("div");
              newNode1.classList.add("ui-widget-content");
              document.body.appendChild(newNode1)
              newNode1.setAttribute("style", "display: inline-block;overflow:auto;");

             // allows user to delete the imported annotation by clicking the right click after user confirmation
            newNode1.addEventListener('contextmenu', function(ev) {
            if(confirm("Are you sure you want to delete this note?")){
              ev.preventDefault();
              ev.target.remove();
              return false;
            }}, false);




              ///////// annotation using pell note ///////////

              newNode1.innerHTML= `

              <div id=`+"tooltip"+note_count + ` class="pell" >
              </div>
              `;

              document.getElementById("tooltip"+note_count).setAttribute("style","height: 130px; width: 250px;\
              border: none;color: black;  padding: 15px 15px; text-align: enter;\
              text-decoration: none;  display: inline-block; overflow:auto;resize:both;background-color:"+defaultNoteColor+";font-size:"+ defaultFont +";opacity:"+defaultOpacity)

              const editor = pell.init({
                element: document.getElementById("tooltip"+note_count),
                onChange: html => {
        //           document.getElementById('markdown-output').innerHTML = turndown(html)
                },
                defaultParagraphSeparator: 'p',
                styleWithCSS: true,
                actions: [
                  'bold',
                  'quote',
                  'olist',
                  'ulist',
                  'code',
//                   'image'
//                   {
//                     icon: '&#128247;',
//                     title: 'Image',
//                     result: () => {
//                       const url = window.prompt('Enter the image URL')
//                       //this implemention is different from the pell documentation to account for resizing
//                       if (url) document.execCommand('insertHTML',false, `
//                       <div style=" resize: both; overflow:auto;">
//                         <img width=100% height=100% src=`+url+"></div><br><br> ")
//                     }
//                   },


                ],
                classes: {
                  actionbar: 'pell-actionbar',
                  button: 'pell-button',
                  content: 'pell-content',
                  selected: 'pell-button-selected'
                }
              })

              editor.content.innerHTML = '<br><br><br><br><br><br>'

             ////// popper js block ///////////////////////
              const popcorn = document.querySelector("#"+"popcorn"+note_count);
              const tooltip = document.querySelector('#'+"tooltip"+note_count);
              const popper_instance = Popper.createPopper(popcorn, tooltip, {
                placement: 'auto',
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                      offset: [0, 0],
                      },
                    },
                    { name: 'eventListeners', enabled: false }
                  ],
              });

              $('#'+"tooltip"+note_count).mousedown(handle_mousedown); // move popper
              addNotes();

             //////////// drag the annotation across the document ///////////
            /// from stackexchange - https://stackoverflow.com/questions/38405569/jquery-calling-function-to-parent-element
            function handle_mousedown(e){
              window.my_dragging = {};
              my_dragging.pageX0 = e.pageX;
              my_dragging.pageY0 = e.pageY;
              my_dragging.elem = this;
              my_dragging.offset0 = $(this).offset();


              function handle_dragging(e){
                if(e.shiftKey){
                var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
                var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
                $(my_dragging.elem)
                .offset({top: top, left: left});
              }
              }

              function handle_mouseup(e){
                $('body')
                .off('mousemove', handle_dragging)
                .off('mouseup', handle_mouseup);
              }
              $('body')
                  .on('mouseup', handle_mouseup)
                  .on('mousemove', handle_dragging);
            }

              note_count+=1; // update note counter

            }
          }
       /// End of Hightlight + Annotate block  ///
    }

}
// script to add sidebar with all the notes

$("body").append ( '                                           \
    <div id="allNotes" style="left: 70%; height: 50%; \
position: fixed; width: 25%; bottom:  5px;background-color:#d9ffcc; border-style: double;  border-radius: 10px; opacity:80%; overflow-y: scroll; \
display: inline-block; max-width: 80%;overflow-x: hidden;"> This is a test </div>                                                      \
' );

function addNotes(){
     // grab all notes
    var allNotes=document.getElementsByClassName("ui-widget-content");
    var allNotes1=document.getElementsByClassName("pell-content");
    var allNotes_html = '<h1> Page notes </h1><br>';

    var dates = $('[id^="tooltip"]');


    for(var i=0;i<allNotes.length;i++){

        allNotes_html+=  '<a href="'+url_window+"#"+dates[i].id+ '"">' +url_window+"#"+dates[i].id+ "</a><br>";
        allNotes_html+= "<blockquote>"+allNotes1[i].innerHTML+"</blockquote>";


    }


    $("#allNotes").html(allNotes_html);
    const timer=setTimeout(addNotes, 2000);

}
addNotes();
