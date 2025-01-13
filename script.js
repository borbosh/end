const HtmlEnButton = document.getElementById("EnButton");
const HtmlDeButton = document.getElementById("DeButton");
const HtmlMessage = document.getElementById("Message");
const HtmlKey = document.getElementById("Key");
const HtmlButton = document.getElementById("Button");

let Mode = 0;

HtmlButton.addEventListener("click", () => {

    if (Mode == 0) {
        let EncryptedMessage = encryptMessage(HtmlMessage.value,HtmlKey.value);
        HtmlMessage.value = EncryptedMessage;
    } else {
        let EncryptedMessage = decryptMessage(HtmlMessage.value,HtmlKey.value);
        HtmlMessage.value = EncryptedMessage;
    }

    document.body.style.animation = `gradient 1s linear infinite`;
    setTimeout(() => {
        document.body.style.animation = `gradient 15s linear infinite`;
    }, 500);

});

HtmlEnButton.addEventListener("click", () => {
    if (Mode == 1) {
        document.body.style.animation = `gradient 1s linear infinite`;
        setTimeout(() => {
            document.body.style.animation = `gradient 15s linear infinite`;
        }, 500);
    }

    Mode = 0;
    HtmlEnButton.classList.remove("animated");
    HtmlEnButton.classList.add("Selected");

    HtmlDeButton.classList.remove("Selected");
    HtmlDeButton.classList.add("animated");

    HtmlButton.classList.remove("Red");
    HtmlButton.classList.add("Green");
    HtmlButton.textContent = "Encrypt";

});

HtmlDeButton.addEventListener("click", () => {
    console.log("1");
    if (Mode == 0) {
        document.body.style.animation = `gradient 1s linear infinite`;
        setTimeout(() => {
            document.body.style.animation = `gradient 15s linear infinite`;
        }, 500);
    }

    Mode = 1;
    HtmlEnButton.classList.add("animated");
    HtmlEnButton.classList.remove("Selected");

    HtmlDeButton.classList.add("Selected");
    HtmlDeButton.classList.remove("animated");

    HtmlButton.classList.remove("Green");
    HtmlButton.classList.add("Red");
    HtmlButton.textContent = "Decrypt";

});


// XOR Encryption/Decryption Function
function xorEncryptDecrypt(message, key) {
    let result = '';
    let keyIndex = 0; // To cycle through the key characters
    
    // Convert the key to a string if it's a number
    if (typeof key === 'number') {
        key = key.toString();
    }

    // Iterate through each character in the message
    for (let i = 0; i < message.length; i++) {
        // Use the current character from the key, looping back when necessary
        let keyChar = key[keyIndex % key.length];
        
        // XOR the character of the message with the key character
        result += String.fromCharCode(message.charCodeAt(i) ^ keyChar.charCodeAt(0));
        
        // Move to the next character in the key (loop if necessary)
        keyIndex++;
    }
    
    return result;
}

// Convert XOR'd string to a binary string
function stringToBinary(str) {
    let binaryString = '';
    for (let i = 0; i < str.length; i++) {
        binaryString += str.charCodeAt(i).toString(2).padStart(8, '0'); // Convert each char to binary
    }
    return binaryString;
}

// Convert binary string back to the original string
function binaryToString(binaryString) {
    let result = '';
    for (let i = 0; i < binaryString.length; i += 8) {
        let byte = binaryString.substring(i, i + 8);  // Get each byte (8 bits)
        result += String.fromCharCode(parseInt(byte, 2)); // Convert binary byte to character
    }
    return result;
}

// Encrypt the message with XOR, then convert it to a binary string
function encryptMessage(message, key) {
    // Step 1: XOR encryption
    const xorEncrypted = xorEncryptDecrypt(message, key);
    
    // Step 2: Convert the XOR result to a binary string
    const binaryEncrypted = stringToBinary(xorEncrypted);
    return binaryEncrypted;
}

// Decrypt the message: First convert from binary to string, then XOR decrypt
function decryptMessage(binaryEncryptedMessage, key) {
    // Step 1: Convert binary string back to the XOR'd string
    const xorEncrypted = binaryToString(binaryEncryptedMessage);
    
    // Step 2: XOR decryption
    const originalMessage = xorEncryptDecrypt(xorEncrypted, key); // XOR decrypt
    return originalMessage;
}
