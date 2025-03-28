const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById('BGColor'); 
const FGColor = document.getElementById('FGColor'); 
let qr
let sizeChoice, BGColorChoice, FGColorChoice;

//set size
sizeOptions.addEventListener('change', () => {
    sizeChoice = sizeOptions.value;
    // console.log(sizeChoice);
})

//set background color
BGColor.addEventListener('input', () => {
    BGColorChoice = BGColor.value;
    // console.log(BGColorChoice); 
})

//set background color
FGColor.addEventListener('input', () => {
    FGColorChoice = FGColor.value;
    // console.log(BGColorChoice); 
})

//format input
const inputFormatter = (value) => {
    value = value.replace(/[^a-zA-Z0-9]+ /g, ''); // Remove special characters
    return value
}
submitBtn.addEventListener('click', async () => {
    container.innerHTML = ""; // Clear previous QR code
    //QR Code Genertion
    qr = await new QRCode(container, {
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice,
    })

    //set url for download
    const src = container.firstChild.toDataURL("image/png");
    downloadBtn.href = src;
    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname; // Check if the input is a valid URL
    } catch (_) {
        userValue = inputFormatter(userValue); // If not, format it
        downloadBtn.download = `${userValue}QR_code.png`; // Set the download name
        downloadBtn.classList.remove('hide')
    }

    document.getElementById('userInput').value = ''; // Clear input field
})

userInput.addEventListener('input', () => {
    if (userInput.value.trim().length < 1 ) {
        submitBtn.disabled = true
        downloadBtn.href = ''
        downloadBtn.classList.add('hide')
    } else {
        submitBtn.disabled = false
    }
})

window.onload = () => {
    //set default values
    container.innerHTML = ""; // Clear previous QR code
    sizeChoice = 100
    sizeOptions.value = 100
    userInput.value = ''
    BGColor.value = BGColorChoice = '#ffffff'
    FGColor.value = FGColorChoice = '#377dff'
    downloadBtn.classList.add('hide')
    submitBtn.disabled = true
}
