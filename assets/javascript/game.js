$(document).ready(function() {


var isPlayerChosen=false;
var playerName="";
var playerHP=0;
var playerAP=0;
var defenderName="";
var defenderHP=0;
var defenderDP=0;
var round=1;
var attackMod=0;
var btnTxt="";
var characters = {
    "player1" : {
        "name": "Luke Skywalker",
        "HP": 135,
        "AP": 8,
        "DP": 10,
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
        "AP": 15,
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

    $(".charBox").on("click", function() {
        console.log("Clicked " + $(this).attr("name"));
        if (round > 1) {
            $("#defenderPlaceholder").empty();
            console.log("round:"+ round);
            defenderHP=parseInt($(this).attr("HP"));
            defenderDP=parseInt($(this).attr("DP"));
            playerName=$(this).attr("name");
            btnTxt=playerName;
            $("#defenderStats").html("HP:" + defenderHP + "&nbsp"+ "DP:" + defenderDP);
            $(this).html(btnTxt);
           
           
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
             defenderDP=parseInt($(this).attr("DP"));
             playerName=$(this).attr("name");
             btnTxt=playerName;
             $(this).html(btnTxt);
             $("#defenderStats").html("HP:" + defenderHP + "&nbsp"+"DP:" + defenderDP);
             $(this).clone().appendTo("#defenderPlaceholder");
             console.log("Defender HP: " + defenderHP);
             console.log("Defender DP: " + defenderDP);
            $(this).remove();
            $(".charBox").css("pointer-events", "none");
            battle();
            
        }
        else {
           
            playerHP=parseInt($(this).attr("HP"));
            playerAP=parseInt($(this).attr("AP"));
            playerName=$(this).attr("name");
            btnTxt=playerName; 
            attackMod=playerAP;
            /*$(".stats").html("HP:" + playerHP + "&nbsp"+ "AP:" + playerAP);*/
            $("#playerStats").html("HP:" + playerHP + "&nbsp"+ "AP:" + playerAP);
            $(this).clone().appendTo("#playerPlaceholder"); 
            console.log("Player HP: " + playerHP);
             console.log("Player DP: " + playerAP);
            $(this).remove();
            isPlayerChosen=true;
            
        }
        
        
        });    
}

function initializeChars () {
    for (x in characters) {
        var charDiv1 = $("<div>");
        charDiv1.addClass("row charBox");
        charDiv1.attr("id", "Row1"+x);
        charDiv1.attr("HP", characters[x].HP);
        charDiv1.attr("AP", characters[x].AP);
        charDiv1.attr("DP", characters[x].DP);
        var charDiv2= $("<div>");
        
        charDiv2.attr("id", "Row2"+x);
        charDiv2.text(characters[x].name);
        var charDiv3 = $("<div>");
        
        charDiv3.attr("id", "Row3"+x);
        charDiv3.html("<img src='" + characters[x].image + "'>");
        var charDiv4 = $("<div>");
        charDiv4.addClass("stats", "HP:" + playerHP + "&nbsp"+ "AP:" + playerAP);
        charDiv4.attr("id", "Row4"+x);
        
        charDiv4.html("HP: " + characters[x].HP  + "&nbsp"+ "AP: " + characters[x].AP + "&nbsp" + "DP: " +characters[x].DP );
        $("#game-characters").append(charDiv1);
        $("#playerChoices").append(charDiv1);
        $("#Row1"+x).append(charDiv2);
        $("#Row2"+x).append(charDiv3);
        $("#Row3"+x).append(charDiv4);

       /* btnTxt = characters[x].name + "<br>" +"<br>" + "<br>" + "<br>"+ "<br>" + "<br>" + "<br>" + "<br>" + "<br>" + "HP:" + characters[x].HP + "&nbsp" + "AP:" + characters[x].AP +  "&nbsp"+"DP:" + characters[x].DP;
        charBtn.addClass("charBtn btn btn-block");
        charBtn.attr("name", characters[x].name);
        charBtn.attr("HP", characters[x].HP);
        charBtn.attr("AP", characters[x].AP);
        charBtn.attr("DP", characters[x].DP);
        charBtn.html(btnTxt);
        charBtn.css({"background-image" : "url(" + characters[x].image + ")", "bacgroundRepeat": "no-repeat"});
        $("#playerChoices").append(charBtn); */
    }

}

function battle(){
    $("#attackBtn").css("pointer-events", "auto");
    $("#attack-img").fadeTo("slow" , 1.0, function() {
                    
    });
    $("#attack-text").text("Attack!")
    $("#attackBtn").on("click", function() {
        
        
        console.log("player AP:"+ playerAP);
        if (playerHP && defenderHP > 0) {
            defenderHP-=playerAP;
            playerAP+=attackMod;
            $("#defenderStats").html("HP:" + defenderHP + "&nbsp"+ "DP:" + defenderDP);
            console.log("Defender hp:" + defenderHP);
            if (defenderHP >0) {
                playerHP-=defenderDP;
                $("#playerStats").html("HP:" + playerHP + "&nbsp"+ "AP:" + playerAP);
                console.log("Player HP:" + playerHP);
                if (playerHP <=0) {
                    console.log ("You Lose");
                    $("#attack-text").text("You Lost");
                }
            } else {
                console.log("You Win");
                $("#attack-img").fadeTo("slow" , 0.25, function() {
                    
                  });
                $("#attack-text").text("You Won Round "+ round +"! " + "Choose another enemy");
                $("#defenderPlaceholder").clone().appendTo("#defenderLosers");
                $("#defenderStats").html("");
                $("#defenderPlaceholder").empty();
                $(".charBox").css("pointer-events", "auto");
                round++;
                $("#attackBtn").css("pointer-events", "none");
                playGame();
                
                

            
                
            }

        }
        
    });
}


initializeChars();
playGame();






});





























