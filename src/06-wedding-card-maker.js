/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here
  if(containerElement=== null || containerElement === undefined){
    return null
  }
  containerElement.addEventListener("click",(event)=>{
    let guestList= document.querySelectorAll(".guest-item")
    let idx=-1
    for (let index = 0; index < guestList.length; index++) {
      const element = guestList[index];
      if(element.hasChildNodes(event.target)){
        idx=index
      }
    }
    guestList[idx].remove()
  })
  let addGuest=function(name, side){
    let div = document.createElement('div')
    div.setAttribute("class","guest-item")
    div.setAttribute("data-name",name)
    div.setAttribute("data-side",side)
    let span = document.createElement("span")
    span.textContent= name
    div.appendChild(span)
    let btn = document.createElement("button")
    btn.setAttribute("class","remove-btn")
    btn.textContent="Remove"
    div.appendChild(btn)
    containerElement.appendChild(div)
    return div
  }
  let removeGuest= function(name){
     if (!containerElement || !name) return false;
    const guest = containerElement.querySelector(
        `.guest-item[data-name="${name}"]`
    );
    if (guest) {
        guest.remove();
        return true;
    }

    return false;
  }
  let getGuests= function(){
    let children  = containerElement.querySelectorAll(".guest-item")
    let array= []
    for (let index = 0; index < children.length; index++) {
      const wanted = children[index];
      array.push({name: wanted.getAttribute("data-name"),side:wanted.getAttribute("data-side")})
    }
    
    return array
  }
  return {addGuest,removeGuest,getGuests}
}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here
  if(containerElement=== null || containerElement === undefined || previewElement===null || previewElement=== undefined){
    return null
  }
  let btn = document.createElement("button")
  let btn2 = document.createElement("button")
  let btn3 = document.createElement("button")
  btn.setAttribute("class","theme-btn")
  btn2.setAttribute("class","theme-btn")
  btn3.setAttribute("class","theme-btn")
  btn.textContent = "traditional"
  btn2.textContent= "modern"
  btn3.textContent="royal"
  btn.setAttribute("data-theme","traditional")
  btn2.setAttribute("data-theme","modern")
  btn3.setAttribute("data-theme","royal"
  )
  containerElement.appendChild(btn)
  containerElement.appendChild(btn2)
  containerElement.appendChild(btn3)
  containerElement.addEventListener("click",(event)=>{
    let theme = event.target.getAttribute("data-theme")
    previewElement.setAttribute("class",theme)
    previewElement.setAttribute("data-theme",theme)
  })
  let getTheme=  function(){
    return previewElement.getAttribute("data-theme")?previewElement.getAttribute("data-theme"):null
  }
  return {getTheme}
}

export function setupCardEditor(cardElement) {
  // Your code here
  if(cardElement=== null || cardElement === undefined){
    return null
  }
   let currentEditing = null;

    cardElement.addEventListener("click", (e) => {
        const editableEl = e.target.closest("[data-editable]");

        // 🔹 Case 1: Click on editable element
        if (editableEl && cardElement.contains(editableEl)) {
            
            // remove previous editing
            if (currentEditing) {
                currentEditing.classList.remove("editing");
                currentEditing.contentEditable = "false";
            }

            // set new editing
            editableEl.contentEditable = "true";
            editableEl.classList.add("editing");
            currentEditing = editableEl;

            return;
        }

        // 🔹 Case 2: Click on card but NOT editable
        if (e.target === cardElement) {
            if (currentEditing) {
                currentEditing.classList.remove("editing");
                currentEditing.contentEditable = "false";
                currentEditing = null;
            }
        }
    });

  let getContent= function(field){
    let element = document.querySelector(`[data-editable="${field}"`)
    return element?element.textContent:null
  }
  return {getContent}
}
