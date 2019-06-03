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
        
        $("#attackBtn").attr("disabled", true);
        
        function playGame(){
            $("#alert-text").html("Choose a Player");

            $("#play-again").on("click", function() {
            location.reload();
            
             } );
        
            $(".charBox").on("click", function() {
                console.log("Clicked " + $(this).attr("name"));
                if (round > 1) {
                    $("#alert-text").html("Choose another Defender");
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
                    $("#col"+defenderID).remove();
                  
                  
                   $("#attack-section").show();
                   $("#player-choices").hide();
          
                   /*$("#attack-text").text("Attack!");*/
        
                   
        
                } else if (isPlayerChosen){
                    $("#alert-text").html("Choose a Defender");
                     defenderHP=parseInt($(this).attr("HP"));
                     defenderStartHP=defenderHP;
                     defenderDP=parseInt($(this).attr("DP"));
                     defenderName=$(this).attr("name");
                     defenderID=$(this).attr("charid");
                     
                     
                     $(this).clone().appendTo("#defenderPlaceholder");
                     console.log("Defender HP: " + defenderHP);
                     console.log("Defender DP: " + defenderDP);
                     $("#col"+defenderID).remove();
                 
                    $("#player-choices").hide();
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
                    $("#col"+playerID).remove();
                    isPlayerChosen=true;
                    $("#alert-text").html("Choose an Enemy");
                }
                
                
                });    
        }
        
        function initializeChars () {
            for (x in characters) {
                numberCharacters++;

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

        
                var charDiv5=$("<div>");
                charDiv5.addClass("progress-bar bg-danger" );
                charDiv5.attr("id", x);
                charDiv5.attr("role", "progressbar");
                charDiv5.attr("aria-valuenow",characters[x].HP );
                charDiv5.attr("aria-valuemax",characters[x].HP );
                charDiv5.attr("aria-valuemin",0);
                charDiv5.html(characters[x].HP +" HPs");
                charDiv5.attr("style" , "width: 100%");
        
                var charPic=$("<div>");
                charPic.html("<img src='" + characters[x].image + "' class='card-img-top'>");
               
               
                $("#player-choices").append(charDiv1);
                $("#col"+x).append(charDiv2);
                $("#card"+x).append(charDiv3);

                $("#card"+x).append(charPic);

                
                $("#card"+x).append(charDiv4);
                $("#footer"+x).append(charFoot);
                $("#PB"+x).append(charDiv5);
                
               
            }
        
        }
        
        function battle(){
            $("#alert-text").html("Click the Light Sabers to ATTACK!");
            $("#attack-section").show("fold");
            $("#attackBtn").css("pointer-events", "auto");
            $("#attack-img").fadeTo("slow" , 1.0, function() {
                            
            });
            /*$("#attack-text").text("Attack!")*/
            $("#attackBtn").on("click", function() {
                $("#attackAudio")[0].play();
                $("#attackBtn").effect("pulsate");
                
                console.log("player AP:"+ playerAP);
                if (playerHP && defenderHP > 0) {
                    defenderHP-=playerAP;
                    
                    $("#"+defenderID).attr("aria-valuenow", defenderHP);
                    $("#"+defenderID).html(defenderHP);
                    $("#"+defenderID).attr("style" , "width: " +  (defenderHP * 100) /defenderStartHP + "%");
                    $("#defenderStats").html(playerName + " did "+ playerAP + " points of damage to " + defenderName);
                    playerAP+=attackMod;
                   
                    console.log("Defender hp:" + defenderHP);
                    if (defenderHP >0) {
                        playerHP-=defenderDP;
                        $("#"+playerID).html(playerHP);
                        $("#"+playerID).attr("style" , "width: " +  (playerHP * 100) / playerStartHP + "%");
                        $("#playerStats").html(playerName + " took " + defenderDP + " points of damage from " + defenderName);
                       
                        console.log("Player HP:" + playerHP);
                        if (playerHP <=0) {
                            console.log ("You Lose");
                            $("#alert-text").html("You Lose!");
                            $("#playerPlaceholder").hide();
                            $('#attack-section').hide();
                            $(".btn-row").css("display", "block");
                            
                        }
                    } else {
                        console.log("You Win");
                       
        
                        if (round < (Object.keys(characters).length -1)) {
                            console.log("round " + round);
                            
                        $("#alert-text").html("You Won Round "+ round +"! " + "Choose another enemy");
                        $("#"+defenderID).hide("slow");
                        $("#defenderPlaceholder").clone().appendTo("#defenderLosers");
                        $("#defenderStats").html("");
                        $("#playerStats").html("");
                        $("#attack-section").hide();
                        $("#player-choices").show();
                      
                        $("#defenderPlaceholder").empty();
                        $(".charBox").css("pointer-events", "auto");
                        round++;
                        
                        console.log("Round " + round);
                       
                        } else {
                            $(".btn-row").css("display", "block");
                            $("#alert-text").html("You Won the Game!");
                            $("#attack-section").hide();
                            $("#"+defenderID).hide("slow");
                            $("#defenderPlaceholder").clone().appendTo("#defenderLosers");
                            $("#defenderPlaceholder").remove();
                        }
        
                    
                        
        
                    
                        
                    }
        
                }
                
            });
        }
        
       
        
        initializeChars();
        playGame();
        
        
        
        
        
        
        });
