$(document).ready(function() {


var isPlayerChosen=false;
var isDefenderChosen=false;


$(".players").on("click", function() {
console.log("Clicked");
if (isPlayerChosen){
    $(this).clone().appendTo("#defender");
    
    $(this).remove();
    
}
else {
    $(this).clone().appendTo("#player"); 
    $(this).remove();
}
isPlayerChosen=true;
});






});





























