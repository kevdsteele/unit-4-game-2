$(document).ready(function() {

  

var defenderID ="";
var playerID =""; 
var playerStartHP=0;
var defenderStartHP=0;
var numberCharacters=0;

var isPlayerChosen=false;
var playerName="";
var playerHP=0;
var playerAP=0;
var defenderName="";
var defenderHP=0;
var defenderDP=0;
var round=1;
var attackMod=0;

var characters = {
    "player1" : {
        "name": "Luke Skywalker",
        "HP": 135,
        "AP": 8,
        "DP": 12,
        "image": "assets/images/luke.jpg"

    },
    "player2" : {
        "name": "Yoda",
        "HP": 200,
        "AP": 25,
        "DP": 12,
        "image": "assets/images/yoda.png"
    },
    "player3" : {
        "name": "Darth Vader",
        "HP": 150,
        "AP": 25,
        "DP": 10,
        "image": "assets/images/dv.jpg"
    },
    "player4" : {
        "name": "Darth Sidiuus",
        "HP": 175,
        "AP": 25,
        "DP": 15,
        "image": "assets/images/ds.jpg"
    }

}

$("#attackBtn").attr("disabled", true);

function playGame(){
    $("#attack-img").hide();

    $("#restart").on("click", function () {
        location.reload();

    });

    $(".charBox").on("click", function() {
        console.log("Clicked " + $(this).attr("name"));
        if (round > 1) {
            $("#defenderPlaceholder").empty();
            console.log("round:"+ round);
            defenderHP=parseInt($(this).attr("HP"));
            defenderStartHP=defenderHP;
            defenderDP=parseInt($(this).attr("DP"));
            defenderName=$(this).attr("name");
            defenderID=$(this).attr("charid");
            
            
           
           
            $(this).clone().appendTo("#defenderPlaceholder");
            console.log("Defender HP: " + defenderHP);
            console.log("Defender DP: " + defenderDP);
           $(this).remove();
           $(".charBox").css("pointer-events", "none");
           $("#attackBtn").css("pointer-events", "auto");
           $("#attack-img").fadeTo("slow" , 1.0, function() {
                    
        });
           $("#attack-text").text("Attack!");

           

        } else if (isPlayerChosen){
             defenderHP=parseInt($(this).attr("HP"));
             defenderStartHP=defenderHP;
             defenderDP=parseInt($(this).attr("DP"));
             defenderName=$(this).attr("name");
             defenderID=$(this).attr("charid");
             
             
             $(this).clone().appendTo("#defenderPlaceholder");
             console.log("Defender HP: " + defenderHP);
             console.log("Defender DP: " + defenderDP);
            $(this).remove();
            $(".charBox").css("pointer-events", "none");
            battle();
            
        }
        else {
           
            playerHP=parseInt($(this).attr("HP"));
            playerStartHP=playerHP;
            playerAP=parseInt($(this).attr("AP"));
            playerName=$(this).attr("name");
            playerID=$(this).attr("charid");
            attackMod=playerAP;
           
            $(this).clone().appendTo("#playerPlaceholder"); 
            console.log("Player HP: " + playerHP);
             console.log("Player DP: " + playerAP);
            $(this).remove();
            isPlayerChosen=true;
            $("#playerHeading").html("Choose an Enemy");
        }
        
        
        });    
}

function initializeChars () {
    for (x in characters) {
        numberCharacters++;
        var charDiv1 = $("<div>");
        charDiv1.addClass("row charBox");
        charDiv1.attr("id", "Row1"+x);
        charDiv1.attr("HP", characters[x].HP);
        charDiv1.attr("AP", characters[x].AP);
        charDiv1.attr("DP", characters[x].DP);
        charDiv1.attr("charID", x);
        charDiv1.attr("name",characters[x].name);
        var charDiv2= $("<div>");
        
        charDiv2.attr("id", "Row2"+x);
        charDiv2.text(characters[x].name);
        var charDiv3 = $("<div>");
        
        charDiv3.attr("id", "Row3"+x);
        charDiv3.html("<img src='" + characters[x].image + "'class='char-img'> ");
        var charDiv4 = $("<div>");
        charDiv4.addClass("progress");
       
        charDiv4.attr("id", "Row4"+x);

        var charDiv5=$("<div>");
        charDiv5.addClass("progress-bar bg-danger");
        charDiv5.attr("id", x);
        charDiv5.attr("role", "progressbar");
        charDiv5.attr("aria-valuenow",characters[x].HP );
        charDiv5.attr("aria-valuemax",characters[x].HP );
        charDiv5.attr("aria-valuemin",0);
        charDiv5.html(characters[x].HP +" HPs");
        charDiv5.attr("style" , "width: 100%");
        
       
        $("#playerChoices").append(charDiv1);
        $("#Row1"+x).append(charDiv2);
        $("#Row2"+x).append(charDiv3);
        $("#Row3"+x).append(charDiv4);
        $("#Row4"+x).append(charDiv5);
  
    }

}

function battle(){
    $("#attackBtn").css("pointer-events", "auto");
    $("#attack-img").fadeTo("slow" , 1.0, function() {
                    
    });
    $("#attack-text").text("Attack!")
    $("#attackBtn").on("click", function() {
        $("#attackAudio")[0].play();
        
        console.log("player AP:"+ playerAP);
        if (playerHP && defenderHP > 0) {
            defenderHP-=playerAP;
            
            $("#"+defenderID).attr("aria-valuenow", defenderHP);
            $("#"+defenderID).html(defenderHP);
            $("#"+defenderID).attr("style" , "width: " +  (defenderHP * 100) /defenderStartHP + "%");
            $("#defenderStats").html(playerName + "<br/> did " + playerAP + " points of damage to <br/>" + defenderName);
            playerAP+=attackMod;
           
            console.log("Defender hp:" + defenderHP);
            if (defenderHP >0) {
                playerHP-=defenderDP;
                $("#"+playerID).html(playerHP);
                $("#"+playerID).attr("style" , "width: " +  (playerHP * 100) / playerStartHP + "%");
                $("#playerStats").html(defenderName + "<br/> did " + defenderDP + " points of damage to <br/>"  +playerName);
               
                console.log("Player HP:" + playerHP);
                if (playerHP <=0) {
                    console.log ("You Lose");
                    $("#attack-img").fadeTo("slow" , 0, function() {
                    
                    });
                    $("#attack-text").text("You Lost");
                    $("#restart").show();
                    
                }
            } else {
                console.log("You Win");
                $("#attack-img").fadeTo("slow" , 0, function() {
                    
                  });

                if (round < (Object.keys(characters).length -1)) {
                    
                $("#attack-text").text("You Won Round "+ round +"! " + "Choose another enemy");
                $("#defenderPlaceholder").clone().appendTo("#defenderLosers");
                $("#defenderStats").html("");
                $("#playerStats").html("");
                $("#defenderPlaceholder").empty();
                $(".charBox").css("pointer-events", "auto");
                round++;
                $("#attackBtn").css("pointer-events", "none");
                playGame();
                } else {

                    $("#attack-text").text("You Won the Game");
                    $("#restart").show();
                    $("#defenderPlaceholder").clone().appendTo("#defenderLosers");
                $("#defenderStats").html("");
                $("#playerStats").html("");
                $("#defenderPlaceholder").empty();
                }

            
                

            
                
            }

        }
        
    });
}

$("#restart").hide();
initializeChars();
playGame();






});






























