$(document).ready(function() {

/**declare variables */
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
                "AP": 12,
                "DP": 12,
                "image": "assets/images/luke.jpg"
        
            },
            "player2" : {
                "name": "Yoda",
                "HP": 200,
                "AP": 25,
                "DP": 20,
                "image": "assets/images/yoda.png"
            },
            "player3" : {
                "name": "Darth Vader",
                "HP": 150,
                "AP": 25,
                "DP": 15,
                "image": "assets/images/dv.jpg"
            },
            "player4" : {
                "name": "Darth Sidiuus",
                "HP": 175,
                "AP": 25,
                "DP": 25,
                "image": "assets/images/ds.jpg"
            }
        
        }
        
     
        /*main game function */
        function playGame(){
            $("#alert-text").html("Choose a Player");
            /*hidden until all rounds won */
            $("#play-again").on("click", function() {
            location.reload();
            
             } );
        
             /*on click for any char box that is clocked  */
            $(".charBox").on("click", function() {
                /*player already chosen if game has been played before */ 
                if (round > 1) {
                    /*clear out the div used to store defnder pcik first */
                    $("#defenderPlaceholder").empty();
                    
                    /*get values from the attributes of defender selected using this*/
                    defenderHP=parseInt($(this).attr("HP"));
                    defenderStartHP=defenderHP;
                    defenderDP=parseInt($(this).attr("DP"));
                    defenderName=$(this).attr("name");
                    defenderID=$(this).attr("charid");
                    
                    
                   
                   /**clone play to defender area then remove */
                    $(this).clone().appendTo("#defenderPlaceholder");  
                    $("#col"+defenderID).remove();
                  
                   /**unhide attack section, show player hide player choice area*/
                   $("#attack-section").show();
                   $("#playerPlaceholder").show();
                   $("#player-choices").hide();
                   /*tell player how to attack */
                   $("#alert-text").html("Click the Light Sabers to ATTACK!");
          
                  /*first rounf of game play - check first to see if a player was already chosen */
                } else if (isPlayerChosen){
                    $("#alert-text").html("Choose a Defender");
                    /*get values from the attributes of defender selected using this*/
                     defenderHP=parseInt($(this).attr("HP"));
                     defenderStartHP=defenderHP;
                     defenderDP=parseInt($(this).attr("DP"));
                     defenderName=$(this).attr("name");
                     defenderID=$(this).attr("charid");
                     
                      /**clone play to defender area then remove */
                     $(this).clone().appendTo("#defenderPlaceholder");
                     console.log("Defender HP: " + defenderHP);
                     console.log("Defender DP: " + defenderDP);
                     $("#col"+defenderID).remove();
                    /*hide player choice area ans re show playerthen call battle function */
                    $("#player-choices").hide();
                    $("#playerPlaceholder").show();
                    battle();
                    
                }
                else {
                   /*get values from the attributes of player selected using this*/
                    playerHP=parseInt($(this).attr("HP"));
                    playerStartHP=playerHP;
                    playerAP=parseInt($(this).attr("AP"));
                    playerName=$(this).attr("name");
                    playerID=$(this).attr("charid");
                    attackMod=playerAP;
                   
                    /*move player to holding area and hide */
                    $(this).clone().appendTo("#playerPlaceholder"); 
                    $("#playerPlaceholder").hide();
                    $("#col"+playerID).remove();
                    /*so we know the player is already chosen */
                    isPlayerChosen=true;
                    $("#alert-text").html("Choose an Enemy");
                }
                
                
                });    
        }
        /*function to create playercards dynamically fromo bject */
        function initializeChars () {
            for (x in characters) {
                numberCharacters++;
                /* create bootstrap cards by looping through*/ 
                var charDiv1 = $("<div>");
                charDiv1.addClass("col-lg-3 col-md-4 col-sm-6 card-col");
                charDiv1.attr("id", "col"+x);

                var charDiv2= $("<div>");
                charDiv2.addClass("card card-size charBox bg-dark");
                charDiv2.attr("id", "card"+x);
                charDiv2.attr("HP", characters[x].HP);
                charDiv2.attr("AP", characters[x].AP);
                charDiv2.attr("DP", characters[x].DP);
                charDiv2.attr("charID", x);
                charDiv2.attr("name", characters[x].name);

                var charDiv3 = $("<div>");
                charDiv3.addClass("card-header character-card");
                charDiv3.attr("id", "header"+x);
                charDiv3.text(characters[x].name);
                 
                var charDiv4 = $("<div>");
                charDiv4.addClass("card-footer character-card ");
                charDiv4.attr("id", "footer"+x);

                var charFoot = $("<div>");
                charFoot.addClass("progress");
                charFoot.attr("id", "PB"+x);
     
                var charPB1=$("<div>");
                charPB1.addClass("progress-bar bg-dark PBHP" );
                charPB1.attr("id", "pbl"+x);
                charPB1.attr("role", "progressbar");
                charPB1.attr("aria-valuenow",characters[x].HP );
                charPB1.attr("aria-valuemax",characters[x].HP );
                charPB1.attr("aria-valuemin",0);
                charPB1.html(characters[x].HP+ " HPs");
                charPB1.attr("style" , "width: 35%")

                var charPB2=$("<div>");
                charPB2.addClass("progress-bar bg-danger" );
                charPB2.attr("id", "pbr"+x);
                charPB2.attr("role", "progressbar");
                charPB2.attr("aria-valuenow",characters[x].HP );
                charPB2.attr("aria-valuemax",characters[x].HP );
                charPB2.attr("aria-valuemin",0);               
                charPB2.attr("style" , "width: 65%")
        
                var charPic=$("<div>");
                charPic.html("<img src='" + characters[x].image + "' class='card-img-top'>");
               
               /* append divs to player choice id*/ 
                $("#player-choices").append(charDiv1);
                $("#col"+x).append(charDiv2);
                $("#card"+x).append(charDiv3);
                $("#card"+x).append(charPic);
                $("#card"+x).append(charDiv4);
                $("#footer"+x).append(charFoot);
                $("#PB"+x).append(charPB1);
                $("#PB"+x).append(charPB2);
                
               
            }
        
        }
        /*Battle function after characters chosen*/
        function battle(){
            $("#alert-text").html("Click the Light Sabers to ATTACK!");
            /*animate battle to show players*/       
            $("#attack-section").show("fold");
            /*enables attack image button*/
            $("#attackBtn").css("pointer-events", "auto");
           
           
            $("#attackBtn").on("click", function() {
                $("#alert-text").html("Attacking!");
                $("#attackAudio")[0].play();
                $("#attackBtn").effect("pulsate");
                /*toggle attack off so it cannot be clicked during attack effects*/
                $("#attackBtn").css("pointer-events", "none");


                
                /* apply battle damage to defender then player*/
                if (playerHP && defenderHP > 0) {
                    defenderHP-=playerAP;
                    
                    /*update the health bar and stats*/
                    $("#pbr"+defenderID).attr("aria-valuenow", defenderHP);
                    $("#pbl"+defenderID).html(defenderHP + " HPS");
                    /* cal percentage of health bar to decrease based on static progress bar area at 35%*/ 
                    var defenderHPper=(65* defenderHP) / defenderStartHP;
                    $("#pbr"+defenderID).attr("style" , "width: " + defenderHPper + "%");
                    $("#defenderStats").html(playerName + " did "+ playerAP + " points of damage to " + defenderName);
                    /*increase attack power by base mode*/
                    playerAP+=attackMod;
                   
                    /*Make sure the enemy is still alive given player does damage first*/
                    if (defenderHP >0) { 
                        /*make sure the attack button cannot be pressed during attack effects*/
                        $("#attackBtn").css("pointer-events", "none");
                      
                        /*Use timeout to approximate a turn based attack */
                        setTimeout(function() {
                        
                        $("#attackAudio")[0].play();
                        $("#attackBtn").effect("pulsate");    
                        playerHP-=defenderDP;
                        $("#pbl"+playerID).html(playerHP + " HPS");
                        var playerHPper = (65*playerHP) / playerStartHP;
                        $("#pbr"+playerID).attr("style" , "width: " + playerHPper   + "%");
                        $("#playerStats").html(defenderName + " did " + defenderDP + " points of damage to " + playerName);}, 1500 );
                        setTimeout(function() {
                        $("#alert-text").html("Click the Light Sabers to ATTACK!");
                        $("#attackBtn").css("pointer-events", "auto");
                        }, 2300 );
                        /*Check to see if player has lost */
                        if (playerHP <=0) {
                            console.log ("You Lose");
                            $("#alert-text").html("You Lose!");
                            $("#playerPlaceholder").hide();
                            $('#attack-section').hide();
                            $(".btn-row").css("display", "block");
                            
                        }
                       
                    } else {
                        /*Player has won */
                       
                        /*check to see if all players defeated based on object length */
                        if (round < (Object.keys(characters).length -1)) {
                            console.log("round " + round);
                        $("#playerPlaceholder").hide();    
                        $("#alert-text").html("You Won Round "+ round +"! " + "Choose another enemy");
                        
                        $("#defenderPlaceholder").clone().appendTo("#defenderLosers");
                        $("#defenderStats").html("");
                        $("#playerStats").html("");
                        $("#attack-section").hide();
                        $("#player-choices").show();
                      
                        $("#defenderPlaceholder").empty();
                        $(".charBox").css("pointer-events", "auto");
                        round++;
                        
                        
                       
                        } else {
                            /*all players defeated*/
                            $(".btn-row").css("display", "block");
                            $("#alert-text").html("You Won the Game!");
                            $("#attack-section").hide();
                            $("#"+defenderID).hide("slow");
                            $("#defenderPlaceholder").remove();
                        }
        
                    
                        
        
                    
                        
                    }
        
                }
                
            });
        }
        
       
        
        initializeChars();
        playGame();
        
        
        
        
        
        
        });
