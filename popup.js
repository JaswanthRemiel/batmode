if (document.querySelector(".popup")) {
    const button = document.querySelector(".button");
    const circle = document.querySelector(".circle")
    let buttonOn = true;
    
    // Initialize button to "On" state
    button.style.backgroundColor = "#8ABFF0";
    circle.style.left = "100%";
    circle.style.transform = "translateX(-100%)";
    circle.style.backgroundColor = "#588BE4";
    
    // Apply dark mode to current tab on load
    chrome.tabs.executeScript({
        file: 'appON.js'
    })
    
    function invert() {
        alert("hi")
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        let media = document.querySelectorAll("img, picture, video");
        media.forEach((mediaItem) => {
            mediaItem.style.filter = "invert(1) hue-rotate(180deg)"
        })
    }
    button.addEventListener("click", () => {
        if (!buttonOn) {
            buttonOn = true;

            button.style.animation = "transformToBlue 1s ease-in-out 0s forwards"
            circle.style.animation = "moveCircleRight 1s ease-in-out 0s forwards"
            chrome.tabs.executeScript({
                file: 'appOn.js'
            })
        }
        else {
            buttonOn = false;
            button.style.animation = "transformToYellow 1s ease-in-out 0s forwards"
            circle.style.animation = "moveCircleLeft 1s ease-in-out 0s forwards"
            chrome.tabs.executeScript({
                file: 'appOff.js'
            })
        }
    })

} 
function openLink() {
    window.open("https://github.com/jaswanthremiel/batmode", "_blank"); // Opens in a new tab
}