Moralis.initialize("gRW930Vf2zTVZ6r14l3unoxK0DBNifkHyC0tPX8o");
Moralis.serverURL = "https://b3orjxmybjw8.usemoralis.com:2053/server"; //ovo ne moras mijenjati


const CONTRACT_ADRESS = "0x2fD70151B6819B280df061C33Bc718015aF1Fe16";


async function init() {
    try{
        let user = Moralis.User.current();
        if(!user){
            $("#login_button").click( async () => {
                user = await Moralis.Web3.authenticate();
            })
        }
        renderGame();
    } catch(error) {
        console.log(error);
    }
}

 async function renderGame(){

    $("#login_button").hide();
    $("#game").show();

     let petId = 0;
     await Moralis.enableWeb3();
     let web3 = new window.Web3(Moralis.provider);     
     let abi = await getAbi();
     let contract = new web3.eth.Contract(abi, CONTRACT_ADRESS);
     let data = await contract.methods.getTokenDetails(petId).call({from: ethereum.selectedAddress});
     console.log(data);
     renderPet(0, data);
  
 }

 function renderPet(id, data){
 $("#pet_id").html(id);
 $("#pet_damage").html(data.damage);
 $("#pet_magic").html(data.magic);
 $("#pet_endurance").html(data.endurance);

 let deathTime = new Date((parseInt(data.lastMeal) + parseInt(data.endurance)) * 1000);

 $("#pet_starvation_time").html(deathTime);
 }

function getAbi(){
    return new Promise( (res) => { 
         $.getJSON("Token.json", ( (json) => {
          res(json.abi);
    })) 
})

}

 init(); 

