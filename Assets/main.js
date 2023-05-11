const myDivs=document.querySelectorAll(".myDiv")
const draggables=document.querySelectorAll(".draggable")
draggables.forEach(draggable=>{
    draggable.addEventListener("dragstart",()=>{
        draggable.classList.add("draging")
    })

    draggable.addEventListener("dragend",()=>{
        draggable.classList.remove("draging")
    })
})

myDivs.forEach(myDiv=>{
    myDiv.addEventListener("dragover",(e)=>{
        e.preventDefault()
        const afterElement=getAfterElement(myDiv , e.clientY)
        const draggable=document.querySelector(".draging")
        if(afterElement==null){
            myDiv.appendChild(draggable)
        }else{
            myDiv.insertBefore(draggable,afterElement)
        }
    })
})

function getAfterElement(myDiv,y) {
    const draggableElements=[...myDiv.querySelectorAll("draggable:not(.draging)")]
    
 return   draggableElements.reduce((closest,child) =>{
        const box=child.getBoundingClientRect()
        const offset=y-box.top-box.height /2
        if(offset<0 &&offset>closest.offset){
            return {offset: offset,element:child}
        }else{
            return closest;
        }
    }, {offset:Number.NEGATIVE_INFINITY}).element
}




