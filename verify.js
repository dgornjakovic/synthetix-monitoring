if (web3) {
    ethereum.enable();
}

async function signMessage() {
    var role = document.getElementById("role").value;
    var discordName = document.getElementById("username").value;
    var message = discordName + " will be assigned role " + role;
    web3.personal.sign(message, web3.eth.coinbase, function (test, signature) {
        verifyMessage(message, role, discordName, signature, web3.eth.coinbase)
    });
}


function verifyMessage(message, role, username, signature, address) {

    var sentValue = new Object();
    sentValue.msg = message;
    sentValue.role = role;
    sentValue.username = username;
    sentValue.sig = signature;
    sentValue.address = address;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://ec2-13-48-70-164.eu-north-1.compute.amazonaws.com:3000/verify", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: sentValue
    }));
}

setTimeout(function () {
    document.getElementById("address").innerHTML = "Connected as " + web3.eth.coinbase;
}, 1000 * 1);

setInterval(function () {
    document.getElementById("address").innerHTML = "Connected as " + web3.eth.coinbase;
}, 1000 * 10);
