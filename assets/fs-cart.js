/* Init SDK */
const sdk = new MetaKeep({
    /* App id to configure UI */
    appId: "effd88e2-cb07-42fd-8dec-3a757f8413de",
    /* Default chain to use */
    chainId: 1,
    /* RPC node urls map */
    rpcNodeUrls: {
        // Update with your node API key
        1: "https://eth-mainnet.g.alchemy.com/v2/GTQf7yPXwNMQpAtFvOJc_bHhsGZYS-7d"
    }
});


/* Get signature using web3 provider*/
async function ethersSign() {

    try {
        console.log("Initiazing MetaKeep Web3 provider");

        // Use MetaKeep web3 provider
        web3Provider = await sdk.ethereum;
        await web3Provider.enable();

        // Initialize ethers provider
        const ethersProvider = new ethers.providers.Web3Provider(web3Provider);

        // Signer
        const signer = ethersProvider.getSigner()
        const signerAddress = await signer.getAddress()
        console.log(signerAddress)

        // Sign message
        const signMessageResponse = await signer.signMessage("Welcome to Meta Keep Wallet");
        console.log("sign message successful");
        console.log(signMessageResponse);

        const d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = 'walletAddress' + "=" + signerAddress + ";" + expires + ";path=/";

        updateCartNotesAndAttributes(signerAddress)

        var element = document.getElementsByClassName("checkout");
        element[0].style.display = "block";
        var walletButton = document.getElementsByClassName("connect-btn");
        walletButton[0].innerText = "Wallet Connected";

    } catch (err) {
        console.log("Error when trying to perform provider operations");
        console.log(err.message || err);
    }
}

function updateCartNotesAndAttributes(signerAddress) {
    let cartData = {
        attributes: signerAddress,
        note: 'cartData'
    }
    $.ajax({
        type: 'POST',
        url: '/cart/update.js',
        data: {
            attributes: {
                "WalletAddress": signerAddress
            }
        },
        dataType: 'json',
        success: function (cart) {
            // Success callback - You can handle any success messages or UI updates here
            // console.log('Cart updated successfully:', cart);

        },
        error: function (XMLHttpRequest, textStatus) {
            // Error callback - Handle any errors that occur during the AJAX request
            console.error('Error updating cart:', textStatus);
        }
    });
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var walletAddresscheck = getCookie("walletAddress")
if (walletAddresscheck != "") {
    updateCartNotesAndAttributes(walletAddresscheck)
    var element = document.getElementsByClassName("checkout");
    element[0].style.display = "block";
    var walletButton = document.getElementsByClassName("connect-btn");
    walletButton[0].innerText = "Wallet Connected";

}




$(document).ready(function() {
    let inputValue = '';
    $("#submitButton").on('click', function() {
        //get address entered by the customer in the text field
        inputValue = $("#wallet-address-text").val();
        // Show custom popup for verification
        $("#customPopup").removeClass("hidden");
    });
     // Confirm save
     $("#confirmSave").on('click', function() {
        // Save value to local storage
        localStorage.setItem("savedValue", inputValue);
        let valueSaved = localStorage.getItem("savedValue");
        if(valueSaved){
            // alert("Value has been verified and saved to local storage.");
            $("#customPopup").addClass("hidden");
            $(".connect-btn, .cart-notes-wrapper").hide();
            $(".checkout, .editAddress").show();
            updateCartNotesAndAttributes("valueSaved");
            showAlert()
        }
    });
    // Cancel save
    $("#cancelSave").click(function() {
        alert("Value was not saved.");
        $("#customPopup").addClass("hidden");
    });
    editAddress = () => {
        $(".cart-notes-wrapper, .connect-btn").show();
        $(".checkout, .editAddress").hide();
    } 
    function showAlert() {
        var alertBox = $('#alertBox');
        $(alertBox).show();
        // $(alertBox).html('<p>' + name + ' has been added into cart. </p>');
        setTimeout(() => {
          $(alertBox).hide();
        }, 7000);
      }
});