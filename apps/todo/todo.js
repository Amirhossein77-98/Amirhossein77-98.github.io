const itemsSecEl = document.getElementById("right-panel")


function leftPanelItemsIconChange() {
    document.getElementById("today").innerHTML = "<ion-icon name='today-outline'></ion-icon>"
    document.getElementById("today").style.justifyContent = "center"
}

if (window.innerWidth < 600) {
    leftPanelItemsIconChange()
}

window.addEventListener("resize", ()=> {
    console.log(window.innerWidth)
    if (window.innerWidth < 600) {
        leftPanelItemsIconChange()
    } else {
        document.getElementById("today").textContent = "Today"
        document.getElementById("today").removeAttribute("style")
    }
})

