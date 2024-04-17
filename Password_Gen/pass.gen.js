function generatePass(){
    let pass = '';
    let str = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for(let i=1;i<=8;i++)
    {
        let char = Math.floor(Math.random()*str.length+1);

        pass+=str.charAt(char);
    } 
    document.getElementById('ans').innerText=pass;
}
console.log(generatePass());

function copyPassword() {
    var copyText = document.getElementById("spc").value;

    navigator.clipboard.writeText(copyText)
        .then(function() {
            alert("Password copied to clipboard!");
        })
        .catch(function(error) {
            alert("Unable to copy password to clipboard. Please select the password manually and use Ctrl+C or Command+C to copy.");
            console.error("Copy failed:", error);
        });
}
