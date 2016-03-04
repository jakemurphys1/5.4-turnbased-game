(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
 * Created by Jake on 1/22/2015.
 */
$(document).ready(function() {
    //Start window

    $('.starts').click(function(){
        window.location.href = 'Home_game.html';
    });
    $('.tutorial').click(function(){
        window.location.href = 'Tutorial_game.html';
    });
    $('.starts').mouseenter(function(){
        $(this).addClass("enlarge");
    });
    $('.tutorial').mouseenter(function(){
        $(this).addClass("enlarge");
    });
    $('.starts').mouseleave(function(){
        $(this).removeClass("enlarge");
    });
    $('.tutorial').mouseleave(function(){
        $(this).removeClass("enlarge");
    });




    //varibles
    var addLeft=65;
    var addTop=75;
    var vert = 1;
    var horz = 1;
    var selectedunit = "";
    var selectedindex= 0;
    var Unit=new Array();
    var selectedaction = "";
    var starting = true;
    var enemyindex = 0
    var Arrow =new Audio();
    var musicchanged=false;
    Arrow.src="images/sounds/Arrow.wav";
    var Fire =new Audio();
    Fire.src="images/sounds/Fire.wav";
    var Lightning =new Audio();
    Lightning.src="images/sounds/Lightning.wav";
    var Shield =new Audio();
    Shield.src="images/sounds/Shield.wav";
    var Sword =new Audio();
    Sword.src="images/sounds/Sword.wav";
    var Disrupt =new Audio();
    Disrupt.src="images/sounds/Disrupt.mp3";
    var Lose =new Audio();
    Lose.src="images/sounds/Lose.mp3";
    var Paralyzesound =new Audio();
    Paralyzesound.src="images/sounds/Paralyze.mp3";
    // var Specialsound =new Audio();
    // Specialsound.src="images/sounds/Special.mp3";
    var Win =new Audio();
    Win.src="images/sounds/Win.mp3";
    var Turnsound =new Audio();
    Turnsound.src="images/sounds/Turn.mp3";
    var Chargesound =new Audio();
    Chargesound.src="images/sounds/Charge.mp3";
     var curmusic=new Audio();

        curmusic.src = "images/sounds/music-start.mp3";
    curmusic.loop=true;

        curmusic.play();


    //seesion stored level
    // var level = 1;
    // if (sessionStorage.getItem("level")>0 && sessionStorage.getItem("level")<11){
    //    level = sessionStorage.getItem("level");
    // } else {var level=1}
var level=1;





    //disable rightclick window
    document.oncontextmenu = function() {return false;};
function startinggame() {
    //create level on top
    $('#top').empty();
    $('#top').append("<h1 class = 'heading'>Level: " + level + "</h1>");
    //create enemies based on level
    $('Eunits').remove();
    if (level===2){
        Unit[3]=new ESoldier(3);
        Unit[4]=new ESoldier(4);
        Unit[5]=new EGuard(5);
    } else if(level===3){
        Unit[3]=new ERouge(3);
        Unit[4]=new ETemplar(4);
        Unit[5]=new ERouge(5);
    } else if(level===4){
        Unit[3]=new EWizard(3);
        Unit[4]=new EWizard(4);
        Unit[5]=new EWizard(5);
    }else if(level===5){
        Unit[3]=new ERouge(3);
        Unit[4]=new ESoldier(4);
        Unit[5]=new ERouge(5);
        Unit[6]=new ERouge(6);
    }else if(level===6){
        Unit[3]=new EMage(3);
        Unit[4]=new ESoldier(4);
        Unit[5]=new ESoldier(5);
        Unit[6]=new EMage(6);
    }else if(level===7){
        Unit[3]=new ERouge(3);
        Unit[4]=new EMage(4);
        Unit[5]=new EMage(5);
        Unit[6]=new ERouge(6);
    }else if(level===8){
        Unit[3]=new ETemplar(3);
        Unit[4]=new ESoldier(4);
        Unit[5]=new ESoldier(5);
        Unit[6]=new ETemplar(6);
    }else if(level===9){
        Unit[3]=new EGuard(3);
        Unit[4]=new EGuard(4);
        Unit[5]=new EGuard(5);
        Unit[6]=new EGuard(6);
    }else if(level===10){
        Unit[3]=new EMage(3);
        Unit[4]=new ESoldier(4);
        Unit[5]=new ERouge(5);
        Unit[6]=new EGuard(6);
        Unit[7]=new EWizard(7);
    }else if(level===11){
        $('#top').empty();
        $('#TEXT').empty();
        $('#TEXT').append("You WON!")
    }

    //starting stuff
    $('.actions').empty();
    starting=true;
    selectedindex=0;
    $('.unit').remove();

    //create Starting icons
    $('.actions').append("<img class='startingicon' id='startingSoldier'  src='images/gif/Sprites/Soldier.gif'/>");
    $('.actions').append("<img class='startingicon' id='startingTemplar' src='images/gif/Sprites/Knight.gif'/>");
    $('.actions').append("<img class='startingicon' id='startingRouge' src='images/gif/Sprites/Archer.gif'/>");
    $('.actions').append("<img class='startingicon' id='startingGuard' src='images/gif/Sprites/Guard.gif'/>");
    $('.actions').append("<img class='startingicon' id='startingWizard' src='images/gif/Sprites/Wizard.gif'/>");
    $('.actions').append("<img class='startingicon' id='startingMage' src='images/gif/Sprites/Mage.gif'/>");
    //hover over starting icons to get stats
    $('#startingSoldier').mouseenter(function () {
        $('#TEXT').empty();
        $('#TEXT').append("<ul>Stats for a Soldier<li>Attack: 2 physical damage</li> <li>Defense: 2</li><li>Resistance:0</li><li>Health: 5</li><li>Special: Has an attack that does 4, but will lose it's next turn</li></ul>");
    });
    $('#startingWizard').mouseenter(function () {
        $('#TEXT').empty();
        $('#TEXT').append("<ul>Stats for a Wizard<li>Defense: 0</li><li>Resistance:3</li><li>Health: 3</li><li>Magic: To use it's magic, it must charge. One charge per turn. Can target any enemy regardless of location.</li><li>Lightning: Deals 5 magic damage. Costs 3 charge.</li></ul>");
    });
    $('#startingRouge').mouseenter(function () {
        $('#TEXT').empty();
        $('#TEXT').append("<ul>Stats for a Rouge<li>Attack: 1 physical damage</li><li>Defense: 1</li><li>Resistance:1</li><li>Health: 4</li><li>Range: It can attack any enemy regardless of location</li><li>Paralyze: Can paralyze an enemy for one turn. Can't use this ability again for three turns.</li></ul>");
    });
    $('#startingGuard').mouseenter(function () {
        $('#TEXT').empty();
        $('#TEXT').append("<ul>Stats for a Guard<li>Attack: 1 physical damage</li><li>Defense: 2</li><li>Resistance:2</li><li>Health: 5</li></ul>");
    });
    $('#startingMage').mouseenter(function () {
        $('#TEXT').empty();
        $('#TEXT').append("<ul>Stats for a Mage<li>Defense: 1</li><li>Resistance:1</li><li>Health: 4</li><li>Magic: To use it's magic, it must charge. One charge per turn. Can target enemies within two spaces from itself.</li><li>Fire: Deals 3 magic damage. Costs 1 charge.</li></ul>");
    });
    $('#startingTemplar').mouseenter(function () {
        $('#TEXT').empty();
        $('#TEXT').append("<ul>Stats for a Templar<li>Attack: 2 physical damage</li> <li>Defense: 0</li><li>Resistance:3</li><li>Health: 5</li><li>Special: Can give an ally a permanent resistance boost of 2. Once per wave.</li></ul>");
    });
    $('.startingicon').mouseleave(function () {
        $('#TEXT').empty();
    });

    //create units by clicking starting icons
    $('.startingicon').click(function(){
        //create unit based on what was clicked
        if (selectedindex<3) {

            switch(this.id) {
                case "startingSoldier":
                    Unit[selectedindex] = new Soldier(selectedindex);
                    break;
                case "startingTemplar":
                    Unit[selectedindex] = new Templar(selectedindex);
                    break;
                case "startingRouge":
                    Unit[selectedindex] = new Rouge(selectedindex);
                    break;
                case "startingGuard":
                    Unit[selectedindex] = new Guard(selectedindex);
                    break;
                case "startingWizard":
                    Unit[selectedindex] = new Wizard(selectedindex);
                    break;
                case "startingMage":
                    Unit[selectedindex] = new Mage(selectedindex);
                    break;
            }
            selectedindex += 1;}
        //stops after three are chosen
        if (selectedindex>=3){
            $('.startingicon').hide();
            starting=false;
        }

        //select units//give stats//click button event
        $('.unit').click(function(){
            if (starting===false) {

                selectedunit = this.id;
                $('*').removeClass("selectedUnit");
                $(this).addClass("selectedUnit");
                //gives stats on selected unit/shows action buttons
                var curtype = "";
                for (var i = 0; i < Unit.length; i++) {
                    if (Unit[i].index == this.id) {
                        selectedindex = i;
                        $('#TEXT').empty();
                        $('#TEXT').append("<ul>Stats for " + Unit[i].name + " <li>Type: " + Unit[i].type + "</li> <li>Attack: " + Unit[i].attack + "</li> <li>Defense: " + Unit[i].defense + "</li><li>Resistance: " + Unit[i].resistance + "</li><li>Charge: " + Unit[i].charge + "</li><li>Health: " + Unit[i].health + "</li></ul>")
                        curtype = Unit[i].type;
                    }//end of if statement
                }//end of for statement
                //show actions buttons
                switch (curtype) {
                    case "Soldier":
                        $('.actions').empty();
                        $('.actions').append("<div class = 'button' id = 'soldierAttack'>Attack</div> <div class = 'button' id='soldierSpecial'>Special</div><div class = 'button' id='PassTurn'>PassTurn</div>");
                        break;
                    case "Wizard":
                        $('.actions').empty();
                        $('.actions').append("<div class = 'button' id='wizardCharge'>Charge</div><div class = 'button' id='wizardLightning'>Lightning(3)</div><div class = 'button' id='PassTurn'>PassTurn</div>");
                        break;
                    case "Rouge":
                        $('.actions').empty();
                        $('.actions').append("<div class = 'button' id = 'rougeAttack'>Attack</div> <div class = 'button' id='rougeParalyze'>Paralyze</div><div class = 'button' id='PassTurn'>PassTurn</div>");
                        break;
                    case "Templar":
                        $('.actions').empty();
                        $('.actions').append("<div class = 'button' id = 'templarAttack'>Attack</div> <div class = 'button' id='templarShield'>Shield</div><div class = 'button' id='PassTurn'>PassTurn</div>");
                        break;
                    case "Guard":
                        $('.actions').empty();
                        $('.actions').append("<div class = 'button' id='guardAttack'>Attack</div><div class = 'button' id='PassTurn'>PassTurn</div>");
                        break;
                    case "Mage":
                        $('.actions').empty();
                        $('.actions').append("<div class = 'button' id = 'mageCharge'>Charge</div> <div class = 'button' id='mageFire'>Fire</div><div class = 'button' id='PassTurn'>PassTurn</div>");
                        break;
                }//end of switch

                //click button event
              clickbuttons();
            }//end of Starting===false
        });//end of .unit.click

      attackbadguys();

        //Use actions on allies
        $('.unit').mousedown(function(e){
            if(e.button === 2){
                if (Unit[selectedindex].usedaction===true){
                    $("#TEXT").append("<p>" + Unit[selectedindex].name + " has already used an action this turn</p>");
                    return;
                }
                if (Unit[selectedindex].aparalyzed===true){
                    $('#TEXT').append("<p>" + Unit[selectedindex].name + " is paralyzed</p>");
                    return;
                }
                //determine ally's number
                for (var i = 0; i < Unit.length; i++) {
                    if (Unit[i].name === this.name) {
                        enemyindex = i;
                    }}

                $(this).effect("pulsate");
                Shield.play();
                if (selectedaction === "templarShield"){

                    if((Unit[selectedindex].curtop - 150 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curtop + 150 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curleft - 150 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop) || (Unit[selectedindex].curleft + 150 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop)) {
                        if (Unit[selectedindex].usedShield === true){
                            $("#TEXT").append("<p>" + Unit[selectedindex].name + "'s shield has already been used this game\n</p>");
                            return;}
                        Unit[enemyindex].resistance+=2;
                        $("#TEXT").append("<p>" + Unit[enemyindex].name + "'s resistance permanently rose to " + Unit[enemyindex].resistance + "\n</p>");
                        Unit[selectedindex].usedShield = true;
                        Unit[selectedindex].usedaction=true;
                        return;
                    }
                }


            }
        });
          //end of startingicon
    });
        getenemystats();
        }//end of starting game

    startinggame();

///outside


function attackbadguys(){
  //Use actions on enemies
  $('.Eunit').mousedown(function(e){
      if(e.button === 2){
          if (Unit[selectedindex].aparalyzed===true){
              $('#TEXT').append("<p>" + Unit[selectedindex].name + " is paralyzed</p>");
              return;
          }
          //determine whether this unit did an action this turn
          if (Unit[selectedindex].usedaction===true){
              return;
          }
          //determine enemy's number
          for (var i = 0; i < Unit.length; i++) {
              if (i == this.id) {
                  enemyindex = i;
              }}
              function damaging(enemyindex){
                  $("#" + enemyindex).effect('shake');
                  $("#HB" + enemyindex).remove();
                        $('#' + enemyindex).append('<div class="healthbar" id = "HB' + enemyindex + '" style="position: relative; margin-top:90%; width: ' + (Unit[enemyindex].health/Unit[enemyindex].maxhealth)*100 + '%"></div>');
              }
          function youwin() {
            setTimeout(function(){
              var alldead = 0;
              for(var z = 3;z<Unit.length;z++){
                  if (Unit[z].health<=0){
                      alldead+=1;}}
              if (alldead>=(Unit.length-3)){
                  level+=1;
                  sessionStorage.setItem("level",level);
                  $("#TEXT").append("<p>You won the battle! Now for Level: " + level + "</p>");
                      startinggame();
              }
            },1000)
          }
          function shootarrow(enemyindex,selectedindex){
                                 //effects
                                 var tempAngle = Math.atan((Unit[selectedindex].curleft-Unit[enemyindex].curleft)/(Unit[enemyindex].curtop-Unit[selectedindex].curtop))/(Math.PI/180);

                                 if(Unit[selectedindex].curtop<=Unit[enemyindex].curtop){
                                     tempAngle+=180;
                                 }
                                 $("#background").append("<div class='Effects' style='top: " + Unit[selectedindex].curtop +"px; left: " + Unit[selectedindex].curleft +"px'><img style = ' -ms-transform: rotate(" + tempAngle + "deg); -webkit-transform: rotate(" + tempAngle + "deg); transform: rotate(" + tempAngle + "deg);' src='images/gif/Effects/Arrow.gif' /></div>");
                                 $(".Effects").animate({
                                     left: Unit[enemyindex].curleft + "px",
                                     top: Unit[enemyindex].curtop + "px"
                                 },500).fadeOut(500);
                                 Arrow.play();
                             }

          if (selectedaction === "rougeAttack"){
              var damage = Unit[selectedindex].attack -Unit[enemyindex].defense;
              if (damage<0){damage = 0}
              $("#TEXT").append("<p>" + Unit[selectedindex].name + " did " + damage + " damage to " + Unit[enemyindex].name + "\n</p>");

              shootarrow(enemyindex,selectedindex)
              Unit[enemyindex].health -= damage;
              damaging(enemyindex)
              if (Unit[enemyindex].health<=0){
                setTimeout(function(){
                  $("#" + enemyindex).remove();
                },500)
                  Unit[enemyindex].alive=false;
                  $("#TEXT").append("<p>" + Unit[enemyindex].name + " has been killed</p>");
                  youwin();
              }
              Unit[selectedindex].usedaction=true;
              return;
          }
          if (selectedaction === "rougeParalyze"){
              if (Unit[selectedindex].usedparalyze < 3){
                  var turnsleft = 3 - Unit[selectedindex].usedparalyze;
                  $("#TEXT").append("<p>Paralyze can't be used for another " + turnsleft + " turn(s)\n</p>");
                  return;
              } else {
                  var damage = Unit[selectedindex].attack - Unit[enemyindex].defense;
                  if (damage < 0) {damage = 0}
                  $("#TEXT").append("<p>" + Unit[selectedindex].name + " Did " + damage + " damage to " + Unit[enemyindex].name + "\n</p>");
                shootarrow(enemyindex,selectedindex)
                  Paralyzesound.play();
                  Unit[enemyindex].health -= damage;
                    damaging(enemyindex)
                  Unit[selectedindex].usedparalyze = 0;
                  Unit[enemyindex].paralyzed = true;
                  $("#TEXT").append('<p>' + Unit[enemyindex].name + ' is paralyzed\n</p>');
                  if (Unit[enemyindex].health<=0){
                    setTimeout(function(){
                      $("#" + enemyindex).remove();
                    },500)
                      Unit[enemyindex].alive=false;
                      $("#TEXT").append("<p>" + Unit[enemyindex].name + " has been killed</p>");
                      youwin();
                  }
                  Unit[selectedindex].usedaction=true;
                  return;
              }
          }
          if (selectedaction === "soldierAttack"){
              var damage = Unit[selectedindex].attack -Unit[enemyindex].defense;
              if (damage<0){damage = 0}
              if((Unit[selectedindex].curtop - 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curtop + 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curleft - 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop) || (Unit[selectedindex].curleft + 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop)) {

                  $("#TEXT").append("<p>" + Unit[selectedindex].name + " Did " + damage + " damage to " + Unit[enemyindex].name + "\n</p>");
                  Sword.play();
                  $("#background").append("<div class='Effects' style='top: " + Unit[enemyindex].curtop +"px; left: " + Unit[enemyindex].curleft +"px'><img src='images/gif/Effects/Slash.gif' /></div>");
                                              $(".Effects").fadeOut(500);

                  Unit[enemyindex].health -= damage;
                    damaging(enemyindex)
                  Unit[selectedindex].usedaction=true;
                  if (Unit[enemyindex].health <= 0) {
                    setTimeout(function(){
                      $("#" + enemyindex).remove();
                    },500)
                      Unit[enemyindex].alive=false;
                      $("#TEXT").append("<p>" + Unit[enemyindex].name + " has been killed</p>");
                      youwin();
                  }
                  return;
              }
          }
          if (selectedaction === "soldierSpecial"){
              var damage = 4 -Unit[enemyindex].defense;
              if (damage<0){damage = 0}
              if((Unit[selectedindex].curtop - 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curtop + 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curleft - 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop) || (Unit[selectedindex].curleft + 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop)) {
                  if (Unit[selectedindex].moved === true) {
                      $("#TEXT").append("<p>" + Unit[selectedindex].name + " moved this turn and cannot use his special</p>");
                      return;
                  } else {
                  $("#TEXT").append("<p>" + Unit[selectedindex].name + " used his special and did " + damage + "damage to " + Unit[enemyindex].name + ". " + Unit[selectedindex].name + " is exhausted and will lose his next turn.\n</p>");
                      Sword.play();
                      $("#background").append("<div class='Effects' style='top: " + Unit[enemyindex].curtop +"px; left: " + Unit[enemyindex].curleft +"px'><img src='images/gif/Effects/Slash.gif' /></div>");
                                                  $(".Effects").fadeOut(500);

                  Unit[enemyindex].health -= damage;
                    damaging(enemyindex)
                  Unit[selectedindex].usedspecial = true;
                  Unit[selectedindex].usedaction = true;
                  if (Unit[enemyindex].health <= 0) {
                    setTimeout(function(){
                      $("#" + enemyindex).remove();
                    },500)
                      Unit[enemyindex].alive = false;
                      $("#TEXT").append("<p>" + Unit[enemyindex].name + " has been killed</p>");
                      youwin();
                  }
                  return;
              }
              }
          }
          if (selectedaction === "templarAttack"){
              var damage = Unit[selectedindex].attack -Unit[enemyindex].defense;
              if (damage<0){damage = 0}
              if((Unit[selectedindex].curtop - 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curtop + 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curleft - 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop) || (Unit[selectedindex].curleft + 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop)) {

                  $("#TEXT").append("<p>" + Unit[selectedindex].name + " Did " + damage + " damage to " + Unit[enemyindex].name + "\n</p>");
                  Sword.play();
                  $("#background").append("<div class='Effects' style='top: " + Unit[enemyindex].curtop +"px; left: " + Unit[enemyindex].curleft +"px'><img src='images/gif/Effects/Slash.gif' /></div>");
                                              $(".Effects").fadeOut(500);

                  Unit[enemyindex].health -= damage;
                    damaging(enemyindex)
                  Unit[selectedindex].usedaction=true;
                  if (Unit[enemyindex].health <= 0) {
                    setTimeout(function(){
                      $("#" + enemyindex).remove();
                    },500)
                      Unit[enemyindex].alive=false;
                      $("#TEXT").append("<p>" + Unit[enemyindex].name + " has been killed</p>");
                      youwin();}
                  return;
              }
          }
          if (selectedaction === "guardAttack"){
              var damage = Unit[selectedindex].attack -Unit[enemyindex].defense;
              if (damage<0){damage = 0}
              if((Unit[selectedindex].curtop - 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curtop + 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curleft - 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop) || (Unit[selectedindex].curleft + 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop)) {

                  $("#TEXT").append("<p>" + Unit[selectedindex].name + " Did " + damage + " damage to " + Unit[enemyindex].name + "\n</p>");
                  Sword.play();
                  $("#background").append("<div class='Effects' style='top: " + Unit[enemyindex].curtop +"px; left: " + Unit[enemyindex].curleft +"px'><img src='images/gif/Effects/Slash.gif' /></div>");
                                              $(".Effects").fadeOut(500);


                  Unit[enemyindex].health -= damage;
                    damaging(enemyindex)
                  Unit[selectedindex].usedaction=true;
                  if (Unit[enemyindex].health <= 0) {
                    setTimeout(function(){
                      $("#" + enemyindex).remove();
                    },500)
                      Unit[enemyindex].alive=false;
                      $("#TEXT").append("<p>" + Unit[enemyindex].name + " has been killed</p>");
                      youwin();}
                  return;
              }
          }
          if (selectedaction === "wizardLightning"){
              var damage = 5 -Unit[enemyindex].resistance;
              if (damage<0){damage = 0}
              if(Unit[selectedindex].charge<3){
                  $("#TEXT").append("<p>" + Unit[selectedindex].name + " only has a charge of " + Unit[selectedindex].charge + ". She needs a charge of 3 to use Lightning\n</p>");
                  return;}

              $("#TEXT").append("<p>" + Unit[selectedindex].name + " did " + damage + " damage to " + Unit[enemyindex].name + "\n</p>");


              Lightning.play();
              $("#background").append("<div class='Effects' style= 'top: " + (Unit[enemyindex].curtop-320) +"px; left: " + (Unit[enemyindex].curleft-120) +"px'><img style='height: 400px; width: 400px' src='images/gif/Effects/Lightning.gif' /></div>");
                                          $(".Effects").fadeOut(1500);

              Unit[enemyindex].health -= damage;
                damaging(enemyindex)
              Unit[selectedindex].charge-=3;
              Unit[selectedindex].usedaction=true;
              if (Unit[enemyindex].health<=0){
                setTimeout(function(){
                  $("#" + enemyindex).remove();
                },500)
                  Unit[enemyindex].alive=false;
                  $("#TEXT").append("<p>" + Unit[enemyindex].name + " has been killed</p>");
                  youwin();}
              return;
          }

          if (selectedaction === "mageFire"){
              var damage = 3 -Unit[enemyindex].resistance;
              if (damage<0){damage = 0}
              if((Unit[selectedindex].curtop - 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curtop + 100 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curleft - 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop) || (Unit[selectedindex].curleft + 100 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop) || (Unit[selectedindex].curtop - 200 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curtop + 200 === Unit[enemyindex].curtop && Unit[selectedindex].curleft ===Unit[enemyindex].curleft) || (Unit[selectedindex].curleft - 200 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop) || (Unit[selectedindex].curleft + 200 === Unit[enemyindex].curleft && Unit[selectedindex].curtop ===Unit[enemyindex].curtop)) {
                  if(Unit[selectedindex].charge<1){
                      $("#TEXT").append("<p>" + Unit[selectedindex].name + "  only has a charge of " + Unit[selectedindex].charge + ". He needs a charge of 1 to use Fire\n</p>")
                      return;}
                  $("#TEXT").append("<p>" + Unit[selectedindex].name + " did " + damage + " damage to " + Unit[enemyindex].name + "\n</p>");

                  Fire.play();
                      $("#background").append("<div class='Effects' style='top: " + Unit[selectedindex].curtop +"px; left: " + Unit[selectedindex].curleft +"px'><img src='images/gif/Effects/Fire.gif' /></div>");
                                                  $(".Effects").animate({
                                                      left: Unit[enemyindex].curleft + "px",
                                                          top: Unit[enemyindex].curtop + "px"
                      },500).fadeOut(500);

                  Unit[enemyindex].health -= damage;
                    damaging(enemyindex)
                  Unit[selectedindex].charge-=1;
                  Unit[selectedindex].usedaction=true;
                  if (Unit[enemyindex].health <= 0) {
                    setTimeout(function(){
                      $("#" + enemyindex).remove();
                    },500)
                      Unit[enemyindex].alive=false;
                      $("#TEXT").append("<p>" + Unit[enemyindex].name + " has been killed</p>");
                      youwin();}
                  return;
              }
          }
      }
  });

}
function clickbuttons(){

                  $('.button').click(function () {
                      $("#TEXT").empty();
                      $('*').removeClass('highlight');
                      $(this).addClass('highlight');
                      selectedaction = $(this).attr('id');
                      if (selectedaction === "mageCharge") {
                          if (Unit[selectedindex].usedaction === true) {
                              $("#TEXT").append("<p>" + Unit[selectedindex].name + " has already used an action this turn</p>");
                            return;
                          }
                          Unit[selectedindex].charge += 1;
                          $('.selectedUnit').effect("pulsate");
                          Chargesound.play();
                          $("#TEXT").append("<p>" + Unit[selectedindex].name + "'s charge increased to  " + Unit[selectedindex].charge + "\n</p>");
                          Unit[selectedindex].usedaction = true;
                          return;
                      }
                      if (selectedaction === "wizardCharge") {
                          if (Unit[selectedindex].usedaction === true) {
                              $("#TEXT").append("<p>" + Unit[selectedindex].name + " has already used an action this turn</p>");
                                return;
                          }
                          Unit[selectedindex].charge += 1;
                          $('.selectedUnit').effect("pulsate");
                          Chargesound.play();
                          $("#TEXT").append("<p>" + Unit[selectedindex].name + "'s charge increased to  " + Unit[selectedindex].charge + "\n</p>");
                          Unit[selectedindex].usedaction = true;
                            return;
                      }
                      if (selectedaction === "PassTurn") {
                          Unit[0].aparalyzed=false;
                          Unit[1].aparalyzed=false;
                          Unit[2].aparalyzed=false;
                          //reset allies
                          for (var i = 0; i < 3; i++) {
                              Unit[i].moved = false;
                              Unit[i].usedaction = false;
                              if ((Unit[i].type === "Soldier" && Unit[i].usedspecial === true)) {
                                  Unit[i].usedspecial = false;
                                  Unit[i].moved = true;
                                  Unit[i].usedaction = true;
                                  $("#TEXT").append("<p>" + Unit[i].name + " is exhausted from his special and loses this turn</p>");
                              }
                              if ((Unit[i].type === "Rouge" && Unit[i].usedparalyze < 3)) {
                                  Unit[i].usedparalyze += 1;
                              }
                              $('*').removeClass('highlight');
                          }
                          $('.actions').empty();
                          // Enemy's turns
                          for (var y = 3; y < Unit.length; y++) {
                              Unit[y].moved=false;
                              if(Unit[y].paralyzed===false) {
                                  if (Unit[y].alive === true) {
                                      var belowempty = true;
                                      var leftempty = true;
                                      var rightempty = true;
                                      var upempty = true;
                                      var enemyonright = "";
                                      var enemyontop = "";
                                      var enemyonleft = "";
                                      var enemyonbottom = "";
                                      var enemyonright2 = "";
                                      var enemyontop2 = "";
                                      var enemyonleft2 = "";
                                      var enemyonbottom2 = "";
                                      var enemyonright2index = "";
                                      var enemyontop2index = "";
                                      var enemyonleft2index = "";
                                      var enemyonbottom2index = "";
                                      var enemyonrightindex = "";
                                      var enemyontopindex = "";
                                      var enemyonleftindex = "";
                                      var enemyonbottomindex = "";
                                      var attackthisone = "";
                                      var row1empty=true;
                                      var row2empty=true;
                                      var row3empty=true;
                                      var row4empty=true;
                                      var row5empty=true;
                                      //determine enemy's image
                                      $('*').removeClass("selected");
                                    $("#" + y).addClass("selected");
                                      //Determine if below is empty
                                      for (var x = 0; x < Unit.length; x++) {
                                          if ((((Unit[x].curtop - 100) === Unit[y].curtop) && (Unit[x].curleft === Unit[y].curleft)) || Unit[y].curtop > 450) {
                                              belowempty = false;
                                          }
                                      }
                                      //Determine if above is empty
                                      for (var x = 0; x < Unit.length; x++) {
                                          if ((((Unit[x].curtop + 100) === Unit[y].curtop) && (Unit[x].curleft === Unit[y].curleft)) || Unit[y].curtop < 100) {
                                              upempty = false;
                                          }
                                      }
                                      //Determine if left is empty
                                      for (var x = 0; x < Unit.length; x++) {
                                          if ((((Unit[x].curleft + 100) === Unit[y].curleft) && (Unit[x].curtop === Unit[y].curtop)) || Unit[y].curleft < 100) {
                                              leftempty = false;
                                          }
                                      }
                                      //Determine if right is empty
                                      for (var x = 0; x < Unit.length; x++) {
                                          if ((((Unit[x].curleft - 100) === Unit[y].curleft) && (Unit[x].curtop === Unit[y].curtop)) || Unit[y].curleft > 400) {
                                              rightempty = false;
                                          }
                                      }

                                      //determine if row5 is empty
                                      for (var x = 0;x<3;x++){
                                          if(Unit[x].curtop===485){
                                              row5empty=false;
                                          }
                                          if(Unit[x].curtop===385){
                                              row4empty=false;
                                          }
                                          if(Unit[x].curtop===285){
                                              row3empty=false;
                                          }
                                          if(Unit[x].curtop===185){
                                              row2empty=false;
                                          }
                                          if(Unit[x].curtop===85){
                                              row1empty=false;
                                          }
                                      }

                                      //determine if enemy is beside this unit
                                      //if below
                                      function findenemy() {
                                          for (var x = 0; x < 3; x++) {
                                              if ((Unit[x].curtop - 100) === Unit[y].curtop && Unit[x].curleft === Unit[y].curleft) {
                                                  enemyonbottom = Unit[x].type;
                                                  enemyonbottomindex = x;
                                              }
                                              if ((Unit[x].curtop - 200) === Unit[y].curtop && Unit[x].curleft === Unit[y].curleft) {
                                                  enemyonbottom2 = Unit[x].type;
                                                  enemyonbottom2index = x;
                                              }
                                          }
                                          //if above
                                          for (var x = 0; x < 3; x++) {
                                              if (((Unit[x].curtop + 100) === Unit[y].curtop) && Unit[x].curleft === Unit[y].curleft) {
                                                  enemyontop = Unit[x].type;
                                                  enemyontopindex = x;
                                              }
                                              if (((Unit[x].curtop + 200) === Unit[y].curtop) && Unit[x].curleft === Unit[y].curleft) {
                                                  enemyontop2 = Unit[x].type;
                                                  enemyontop2index = x;
                                              }
                                          }
                                          //if right
                                          for (var x = 0; x < 3; x++) {
                                              if (((Unit[x].curleft - 100) === Unit[y].curleft) && Unit[x].curtop === Unit[y].curtop) {
                                                  enemyonright = Unit[x].type;
                                                  enemyonrightindex = x;
                                              }
                                              if (((Unit[x].curleft - 200) === Unit[y].curleft) && Unit[x].curtop === Unit[y].curtop) {
                                                  enemyonright2 = Unit[x].type;
                                                  enemyonright2index = x;
                                              }
                                              //if right
                                          }
                                          //if left
                                          for (var x = 0; x < 3; x++) {
                                              if (((Unit[x].curleft + 100) === Unit[y].curleft) && Unit[x].curtop === Unit[y].curtop) {
                                                  enemyonleft = Unit[x].type;
                                                  enemyonleftindex = x;
                                              }
                                              if (((Unit[x].curleft + 200) === Unit[y].curleft) && Unit[x].curtop === Unit[y].curtop) {
                                                  enemyonleft2 = Unit[x].type;
                                                  enemyonleft2index = x;
                                              }
                                          }
                                      }

                                      findenemy();

                                      function soldierwhotoattack(type) {
                                          if ((enemyonbottom === type) && (Unit[y].attacked === false)) {
                                              if (type != "Soldier" || Unit[y].moved===true) {
                                              attackthisone = enemyonbottomindex;
                                              var damage = Unit[y].attack - Unit[attackthisone].defense;
                                              if (damage < 0) {
                                                  damage = 0
                                              }
                                              $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[attackthisone].name + "</p>");
                                              Unit[attackthisone].health -= damage;
                                              Damaging(enemyonbottom, attackthisone);
                                                  Sword.play();
                                                  $("#background").append("<div class='Effects' style='top: " + Unit[attackthisone].curtop +"px; left: " + Unit[attackthisone].curleft +"px'><img src='images/gif/Effects/Slash.gif' /></div>");
                                                                              $(".Effects").fadeOut(500);
                                              if (Unit[attackthisone].health <= 0) {
                                                  Dies(enemyonbottom, attackthisone);
                                                  Unit[attackthisone].curleft = 10000;
                                                  Unit[attackthisone].curtop = 10000;
                                              }
                                              Unit[y].attacked = true;
                                          } else {
                                                  attackthisone = enemyonbottomindex;
                                                  var damage = 4 - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " used his special and did " + damage + " damage to " + Unit[attackthisone].name + ". He is exhausted and will skip his next turn.</p>");
                                                  Unit[y].usedspecial=true;
                                                  Unit[attackthisone].health -= damage;
                                                  Damaging(enemyonbottom, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonbottom, attackthisone);
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }
                                          }
                                          if (enemyonright === type && (Unit[y].attacked === false)) {
                                              if (type != "Soldier" || Unit[y].moved === true) {
                                                  attackthisone = enemyonrightindex;
                                                  var damage = Unit[y].attack - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[attackthisone].name + "</p>");
                                                  Unit[attackthisone].health -= damage;
                                                  Sword.play();
                                                  Damaging(enemyonright, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonright, attackthisone)
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }else {
                                                  attackthisone = enemyonrightindex;
                                                  var damage = 4 - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + "used his special and did " + damage + " to " + Unit[attackthisone].name + ". He is exhausted and will skip his next turn.</p>");
                                                  Unit[y].usedspecial=true;
                                                  Unit[attackthisone].health -= damage;
                                                  Damaging(enemyonright, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonbottom, attackthisone);
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }
                                          }
                                          if (enemyonleft === type && (Unit[y].attacked === false)) {
                                              if (type != "Soldier" || Unit[y].moved === true) {
                                                  attackthisone = enemyonleftindex;
                                                  var damage = Unit[y].attack - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[attackthisone].name + "</p>");
                                                  Unit[attackthisone].health -= damage;
                                                  Sword.play();
                                                  Damaging(enemyonleft, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonleft, attackthisone)
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              } else {
                                                  attackthisone = enemyonleftindex;
                                                  var damage = 4 - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " used his special and did " + damage + " damage to " + Unit[attackthisone].name + ". He is exhausted and will skip his next turn.</p>");
                                                  Unit[y].usedspecial=true;
                                                  Unit[attackthisone].health -= damage;
                                                  Damaging(enemyonleft, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonbottom, attackthisone);
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }
                                          }
                                          if (enemyontop === type && (Unit[y].attacked === false)) {
                                              if (type != "Soldier" || Unit[y].moved === true) {
                                                  attackthisone = enemyontopindex;
                                                  var damage = Unit[y].attack - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[attackthisone].name + "</p>");
                                                  Unit[attackthisone].health -= damage;
                                                  Sword.play();
                                                  Damaging(enemyontop, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyontop, attackthisone)
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              } else {
                                                  attackthisone = enemyontopindex;
                                                  var damage = 4 - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " used his special and did " + damage + " damage to " + Unit[attackthisone].name + ". He is exhausted and will skip his next turn.</p>");
                                                  Unit[y].usedspecial=true;
                                                  Unit[attackthisone].health -= damage;
                                                  Damaging(enemyontop, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonbottom, attackthisone);
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }
                                          }
                                      }//end of who to attack function
                                      function whotoattack(type) {
                                          if ((enemyonbottom === type) && (Unit[y].attacked === false)) {
                                              if (type != "Soldier" || Unit[y].moved===true) {
                                                  attackthisone = enemyonbottomindex;
                                                  var damage = Unit[y].attack - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[attackthisone].name + "</p>");
                                                  Unit[attackthisone].health -= damage;
                                                  Sword.play();
                                                  $("#background").append("<div class='Effects' style='top: " + Unit[attackthisone].curtop +"px; left: " + Unit[attackthisone].curleft +"px'><img src='images/gif/Effects/Slash.gif' /></div>");
                                                                              $(".Effects").fadeOut(500);

                                                  Damaging(enemyonbottom, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonbottom, attackthisone);
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              } else {
                                                  attackthisone = enemyonbottomindex;
                                                  var damage = 4 - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " used his special and did " + damage + " damage to " + Unit[attackthisone].name + ". He is exhausted and will skip his next turn.</p>");
                                                  Unit[y].usedspecial=true;
                                                  Unit[attackthisone].health -= damage;
                                                  Damaging(enemyonbottom, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonbottom, attackthisone);
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }
                                          }
                                          if (enemyonright === type && (Unit[y].attacked === false)) {
                                                  attackthisone = enemyonrightindex;
                                                  var damage = Unit[y].attack - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[attackthisone].name + "</p>");
                                                  Unit[attackthisone].health -= damage;
                                              Sword.play();
                                                  Damaging(enemyonright, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonright, attackthisone)
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }
                                          if (enemyonleft === type && (Unit[y].attacked === false)) {
                                                  attackthisone = enemyonleftindex;
                                                  var damage = Unit[y].attack - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[attackthisone].name + "</p>");
                                                  Unit[attackthisone].health -= damage;
                                              Sword.play();
                                                  Damaging(enemyonleft, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyonleft, attackthisone)
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }
                                          if (enemyontop === type && (Unit[y].attacked === false)) {
                                                  attackthisone = enemyontopindex;
                                                  var damage = Unit[y].attack - Unit[attackthisone].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[attackthisone].name + "</p>");
                                                  Unit[attackthisone].health -= damage;
                                              Sword.play();
                                                  Damaging(enemyontop, attackthisone);
                                                  if (Unit[attackthisone].health <= 0) {
                                                      Dies(enemyontop, attackthisone)
                                                      Unit[attackthisone].curleft = 10000;
                                                      Unit[attackthisone].curtop = 10000;
                                                  }
                                                  Unit[y].attacked = true;
                                              }
                                      }//end of who to attack function
                                      function rangedwhotoattack(type) {
                                          for (var x = 0; x < 3; x++) {
                                              if (Unit[x].type === type && (Unit[y].attacked === false)) {
                                                  var damage = Unit[y].attack - Unit[x].defense;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  ;
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " to " + Unit[x].name + "</p>");
                                                  Unit[x].health -= damage;
                                                shootarrow(x,y)
                                                  Damaging(type, x);
                                                  if (Unit[x].health <= 0) {

                                                      Dies(type, x);
                                                      Unit[x].curleft = 10000;
                                                      Unit[x].curtop = 10000;
                                                      Unit[x].type = "Dead";
                                                  }
                                                  Unit[y].attacked = true;
                                                  if (Unit[y].usedparalyze>=3){
                                                      $("#TEXT").append("<p>" + Unit[x].name + " is paralyzed for a turn.</p>");
                                                      Paralyzesound.play();
                                                      Unit[x].aparalyzed = true;
                                                      Unit[y].usedparalyze=0;
                                                  }
                                              }
                                          }
                                      }
                                      function wizardwhotoattack(type) {
                                          for (var x = 0; x < 3; x++) {
                                              if (Unit[x].type === type && (Unit[y].attacked === false)) {
                                                  var damage = 5 - Unit[x].resistance;
                                                  if (damage < 0) {
                                                      damage = 0
                                                  }
                                                  $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " damage to " + Unit[x].name + "</p>");
                                                  Unit[x].health -= damage;
                                                  Lightning.play();
                                                  $("#background").append("<div class='Effects' style= 'top: " + (Unit[x].curtop-320) +"px; left: " + (Unit[x].curleft-120) +"px'><img style='height: 400px; width: 400px' src='images/gif/Effects/Lightning.gif' /></div>");
                                                                              $(".Effects").fadeOut(1500);

                                                  Damaging(type, x);
                                                  if (Unit[x].health <= 0) {
                                                      Dies(type, x);
                                                      Unit[x].curleft = 10000;
                                                      Unit[x].curtop = 10000;
                                                      Unit[x].type = "Dead";
                                                  }
                                                  Unit[y].charge -= 3;
                                                  Unit[y].attacked = true;
                                              }
                                          }
                                      }
                                      function magewhotoattack(type) {
                                        attackthisone=-1;
                                          if ((enemyonbottom === type) && (Unit[y].attacked === false)) {
                                              attackthisone = enemyonbottomindex;
                                          }
                                          if (enemyonright === type && (Unit[y].attacked === false)) {
                                              attackthisone = enemyonrightindex;
                                          }
                                          if (enemyonleft === type && (Unit[y].attacked === false)) {
                                              attackthisone = enemyonleftindex;
                                          }
                                          if (enemyontop === type && (Unit[y].attacked === false)) {
                                              attackthisone = enemyontopindex;
                                          }
                                          if ((enemyonbottom2 === type) && (Unit[y].attacked === false)) {
                                              attackthisone = enemyonbottom2index;
                                          }
                                          if (enemyonright2 === type && (Unit[y].attacked === false)) {
                                              attackthisone = enemyonright2index;
                                          }
                                          if (enemyonleft2 === type && (Unit[y].attacked === false)) {
                                              attackthisone = enemyonleft2index;
                                            }
                                          if (enemyontop2 === type && (Unit[y].attacked === false)) {
                                              attackthisone = enemyontop2index;
                                          }
                                          if(attackthisone!=-1){
                                            var damage = 3 - Unit[attackthisone].resistance;
                                            if (damage < 0) {
                                                damage = 0
                                            }
                                            $("#TEXT").append("<p>" + Unit[y].name + " did " + damage + " to " + Unit[attackthisone].name + "</p>");
                                            Unit[attackthisone].health -= damage;
                                            Damaging(enemyontop2, attackthisone);
                                            if (Unit[attackthisone].health <= 0) {
                                                Dies(enemyontop2, attackthisone);
                                                Unit[attackthisone].curleft = 10000;
                                                Unit[attackthisone].curtop = 10000;
                                            }
                                            Unit[y].attacked = true;
                                            Unit[y].charge -= 1;
                                            $("#background").append("<div class='Effects' style='top: " + Unit[y].curtop +"px; left: " + Unit[y].curleft +"px'><img src='images/gif/Effects/Fire.gif' /></div>");
                                                                        $(".Effects").animate({
                                                                            left: Unit[attackthisone].curleft + "px",
                                                                                top: Unit[attackthisone].curtop + "px"
                                            },500).fadeOut(500);
                                          }

                                      }
                                      function Damaging(type, index) {
                                        $("#" + index).effect("shake")
                                        $("#HB" + index).remove();
                                        $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (Unit[index].health/Unit[index].maxhealth)*100 + '%"></div>');
                                      }
                                      function Dies(type, index) {
                                          $("#" + index).effect("explode")
                                      }
                                      function shootarrow(enemyindex,selectedindex){
                                                             //effects
                                                             var tempAngle = Math.atan((Unit[selectedindex].curleft-Unit[enemyindex].curleft)/(Unit[enemyindex].curtop-Unit[selectedindex].curtop))/(Math.PI/180);

                                                             if(Unit[selectedindex].curtop<=Unit[enemyindex].curtop){
                                                                 tempAngle+=180;
                                                             }
                                                             $("#background").append("<div class='Effects' style='top: " + Unit[selectedindex].curtop +"px; left: " + Unit[selectedindex].curleft +"px'><img style = ' -ms-transform: rotate(" + tempAngle + "deg); -webkit-transform: rotate(" + tempAngle + "deg); transform: rotate(" + tempAngle + "deg);' src='images/gif/Effects/Arrow.gif' /></div>");
                                                             $(".Effects").animate({
                                                                 left: Unit[enemyindex].curleft + "px",
                                                                 top: Unit[enemyindex].curtop + "px"
                                                             },500).fadeOut(500);
                                                             Arrow.play();
                                                         }

                                      //Soldier
                                      if ((Unit[y].type === "Soldier")) {

                                          if (Unit[y].usedspecial === true) {
                                              $("#TEXT").append("<p>" + Unit[y].name + " is exhausted for using his special and skips this turn</p>");
                                              Unit[y].usedspecial = false;
                                          } else {
                                          soldierwhotoattack("Wizard");
                                          soldierwhotoattack("Templar");
                                          soldierwhotoattack("Rouge");
                                          soldierwhotoattack("Mage");
                                          soldierwhotoattack("Guard");
                                          soldierwhotoattack("Soldier");
                                          //Move down
                                          if (belowempty === true && Unit[y].attacked === false && (Unit[y].curtop<Unit[0].curtop || Unit[y].curtop<Unit[1].curtop || Unit[y].curtop<Unit[2].curtop)) {
                                              Unit[y].curtop += 100;
                                              Unit[y].moved = true;
                                              $(".selected").animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                              if (rightempty === true && Unit[y].attacked === false && Unit[y].moved === false && ((Unit[y].curtop===Unit[0].curtop && Unit[y].curleft<Unit[0].curleft) || (Unit[y].curtop===Unit[1].curtop && Unit[y].curleft<Unit[1].curleft) || (Unit[y].curtop===Unit[2].curtop && Unit[y].curleft<Unit[2].curleft))) {
                                                  Unit[y].curleft += 100;
                                                  Unit[y].moved = true;
                                                  $('.selected').animate({
                                                      left: Unit[y].curleft + 'px',
                                                      top: Unit[y].curtop + 'px'
                                                  }, 500);
                                              }
                                              if (leftempty === true && Unit[y].attacked === false && Unit[y].moved === false && ((Unit[y].curtop===Unit[0].curtop && Unit[y].curleft>Unit[0].curleft) || (Unit[y].curtop===Unit[1].curtop && Unit[y].curleft>Unit[1].curleft) || (Unit[y].curtop===Unit[2].curtop && Unit[y].curleft>Unit[2].curleft))) {
                                                  Unit[y].curleft -= 100;
                                                  Unit[y].moved = true;
                                                  $('.selected').animate({
                                                      left: Unit[y].curleft + 'px',
                                                      top: Unit[y].curtop + 'px'
                                                  }, 500);
                                              }
                                              if (upempty === true && Unit[y].attacked === false && Unit[y].moved === false) {
                                                  Unit[y].curtop -= 100;
                                                  Unit[y].moved = true;
                                                  $('.selected').animate({
                                                      left: Unit[y].curleft + 'px',
                                                      top: Unit[y].curtop + 'px'
                                                  }, 500);
                                              }

                                              findenemy();
                                              soldierwhotoattack("Wizard");
                                              soldierwhotoattack("Templar");
                                              soldierwhotoattack("Rouge");
                                              soldierwhotoattack("Mage");
                                              soldierwhotoattack("Guard");
                                              soldierwhotoattack("Soldier");
                                      }
                                      }

                                      //Templar
                                      if ((Unit[y].type === "Templar")) {
                                          whotoattack("Wizard");
                                          whotoattack("Templar");
                                          whotoattack("Rouge");
                                          whotoattack("Mage");
                                          whotoattack("Guard");
                                          whotoattack("Soldier");
                                          //Move down
                                          if ((belowempty === true) && Unit[y].attacked === false && (Unit[y].curtop<Unit[0].curtop || Unit[y].curtop<Unit[1].curtop || Unit[y].curtop<Unit[2].curtop)) {
                                              Unit[y].curtop += 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (rightempty === true && Unit[y].attacked === false && Unit[y].moved === false && ((Unit[y].curtop===Unit[0].curtop && Unit[y].curleft<Unit[0].curleft) || (Unit[y].curtop===Unit[1].curtop && Unit[y].curleft<Unit[1].curleft) || (Unit[y].curtop===Unit[2].curtop && Unit[y].curleft<Unit[2].curleft))) {
                                              Unit[y].curleft += 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (leftempty === true && Unit[y].attacked === false && Unit[y].moved === false && ((Unit[y].curtop===Unit[0].curtop && Unit[y].curleft>Unit[0].curleft) || (Unit[y].curtop===Unit[1].curtop && Unit[y].curleft>Unit[1].curleft) || (Unit[y].curtop===Unit[2].curtop && Unit[y].curleft>Unit[2].curleft))) {
                                              Unit[y].curleft -= 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (upempty === true && Unit[y].attacked === false && Unit[y].moved === false) {
                                              Unit[y].curtop -= 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          findenemy();
                                          whotoattack("Wizard");
                                          whotoattack("Templar");
                                          whotoattack("Rouge");
                                          whotoattack("Mage");
                                          whotoattack("Guard");
                                          whotoattack("Soldier");
                                      }

                                      //Guard
                                      if ((Unit[y].type === "Guard")) {
                                          whotoattack("Wizard");
                                          whotoattack("Templar");
                                          whotoattack("Rouge");
                                          whotoattack("Mage");
                                          whotoattack("Guard");
                                          whotoattack("Soldier");
                                          //Move down
                                          if ((belowempty === true) && Unit[y].attacked === false && (Unit[y].curtop<Unit[0].curtop || Unit[y].curtop<Unit[1].curtop || Unit[y].curtop<Unit[2].curtop)) {
                                              Unit[y].curtop += 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (rightempty === true && Unit[y].attacked === false && Unit[y].moved === false && ((Unit[y].curtop===Unit[0].curtop && Unit[y].curleft<Unit[0].curleft) || (Unit[y].curtop===Unit[1].curtop && Unit[y].curleft<Unit[1].curleft) || (Unit[y].curtop===Unit[2].curtop && Unit[y].curleft<Unit[2].curleft))) {
                                              Unit[y].curleft += 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (leftempty === true && Unit[y].attacked === false && Unit[y].moved === false && ((Unit[y].curtop===Unit[0].curtop && Unit[y].curleft>Unit[0].curleft) || (Unit[y].curtop===Unit[1].curtop && Unit[y].curleft>Unit[1].curleft) || (Unit[y].curtop===Unit[2].curtop && Unit[y].curleft>Unit[2].curleft))) {
                                              Unit[y].curleft -= 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (upempty === true && Unit[y].attacked === false && Unit[y].moved === false) {
                                              Unit[y].curtop -= 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }

                                          findenemy();
                                          whotoattack("Wizard");
                                          whotoattack("Templar");
                                          whotoattack("Rouge");
                                          whotoattack("Mage");
                                          whotoattack("Guard");
                                          whotoattack("Soldier");
                                      }

                                      //Rouge
                                      if ((Unit[y].type === "Rouge")) {
                                          //Move left
                                          var moved = false;
                                          Unit[y].usedparalyze+=1;
                                          //move away from enemies
                                          if ((Unit[y].attacked === false) && moved === false && enemyonright != "") {
                                              if (leftempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft -= 100;
                                              }
                                              if (belowempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop += 100;
                                              }
                                              if (upempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop -= 100;
                                              }

                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if ((Unit[y].attacked === false) && enemyonleft != "" && moved === false) {
                                              if (rightempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft += 100;
                                              }
                                              if (belowempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop += 100;
                                              }
                                              if (upempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop -= 100;
                                              }

                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if ((Unit[y].attacked === false) && enemyontop != "" && moved === false) {
                                              if (rightempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft += 100;
                                              }
                                              if (belowempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop += 100;
                                              }
                                              if (leftempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft -= 100;
                                              }

                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if ((Unit[y].attacked === false) && enemyonbottom != "" && moved === false) {

                                              if (rightempty === true && moved === false) {

                                                  moved = true;
                                                  Unit[y].curleft += 100;
                                              }
                                              if (leftempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft -= 100;
                                              }
                                              if (upempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop -= 100;
                                              }

                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          //attack enemies
                                          rangedwhotoattack("Wizard");
                                          rangedwhotoattack("Templar");
                                          rangedwhotoattack("Rouge");
                                          rangedwhotoattack("Mage");
                                          rangedwhotoattack("Guard");
                                          rangedwhotoattack("Soldier");
                                      }

                                      //Wizard
                                      if ((Unit[y].type === "Wizard")) {
                                          //Move left
                                          var moved = false;
                                          //move away from enemies
                                          if ((Unit[y].attacked === false) && moved === false && enemyonright != "") {
                                              if (leftempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft -= 100;
                                              }
                                              if (belowempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop += 100;
                                              }
                                              if (upempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop -= 100;
                                              }

                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if ((Unit[y].attacked === false) && enemyonleft != "" && moved === false) {
                                              if (rightempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft += 100;
                                              }
                                              if (belowempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop += 100;
                                              }
                                              if (upempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop -= 100;
                                              }

                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if ((Unit[y].attacked === false) && enemyontop != "" && moved === false) {
                                              if (rightempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft += 100;
                                              }
                                              if (belowempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop += 100;
                                              }
                                              if (leftempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft -= 100;
                                              }

                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if ((Unit[y].attacked === false) && enemyonbottom != "" && moved === false) {

                                              if (rightempty === true && moved === false) {

                                                  moved = true;
                                                  Unit[y].curleft += 100;
                                              }
                                              if (leftempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curleft -= 100;
                                              }
                                              if (upempty === true && moved === false) {
                                                  moved = true;
                                                  Unit[y].curtop -= 100;
                                              }

                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          //attack enemies

                                          if (Unit[y].charge >= 3) {
                                              wizardwhotoattack("Soldier");
                                              wizardwhotoattack("Rouge");
                                              wizardwhotoattack("Mage");
                                              wizardwhotoattack("Guard");
                                              wizardwhotoattack("Wizard");
                                              wizardwhotoattack("Templar");
                                          } else {
                                              Unit[y].charge += 1;
                                              $('.selected').effect("pulsate");
                                              $("#TEXT").append("<p>" + Unit[y].name + " Charged his magic to " + Unit[y].charge + "</p>");
                                          }
                                      }

                                      //Mage
                                      if ((Unit[y].type === "Mage")) {
                                          if (Unit[y].charge >= 1) {
                                              magewhotoattack("Soldier");
                                              magewhotoattack("Rouge");
                                              magewhotoattack("Mage");
                                              magewhotoattack("Guard");
                                              magewhotoattack("Wizard");
                                              magewhotoattack("Templar");
                                          }
                                          //Move down
                                          if (belowempty === true && Unit[y].attacked === false && (Unit[y].curtop<Unit[0].curtop || Unit[y].curtop<Unit[1].curtop || Unit[y].curtop<Unit[2].curtop)) {
                                              Unit[y].curtop += 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (rightempty === true && Unit[y].attacked === false && Unit[y].moved === false && ((Unit[y].curtop===Unit[0].curtop && Unit[y].curleft<Unit[0].curleft) || (Unit[y].curtop===Unit[1].curtop && Unit[y].curleft<Unit[1].curleft) || (Unit[y].curtop===Unit[2].curtop && Unit[y].curleft<Unit[2].curleft))) {
                                              Unit[y].curleft += 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (leftempty === true && Unit[y].attacked === false && Unit[y].moved === false && ((Unit[y].curtop===Unit[0].curtop && Unit[y].curleft>Unit[0].curleft) || (Unit[y].curtop===Unit[1].curtop && Unit[y].curleft>Unit[1].curleft) || (Unit[y].curtop===Unit[2].curtop && Unit[y].curleft>Unit[2].curleft))) {
                                              Unit[y].curleft -= 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          if (upempty === true && Unit[y].attacked === false && Unit[y].moved === false) {
                                              Unit[y].curtop -= 100;
                                              Unit[y].moved = true;
                                              $('.selected').animate({
                                                  left: Unit[y].curleft + 'px',
                                                  top: Unit[y].curtop + 'px'
                                              }, 500);
                                          }
                                          findenemy();
                                          if (Unit[y].charge >= 1) {
                                              magewhotoattack("Soldier");
                                              magewhotoattack("Rouge");
                                              magewhotoattack("Mage");
                                              magewhotoattack("Guard");
                                              magewhotoattack("Wizard");
                                              magewhotoattack("Templar");
                                          }
                                          if (Unit[y].attacked === false) {
                                              Unit[y].charge += 1;
                                              $('.selected').effect("pulsate");
                                              var temp = Unit[y].charge;
                                              $("#TEXT").append("<p>" + Unit[y].name + " charged his magic to " + temp + "</p>");
                                          }

                                      }

                                      //gameover
                                      if (Unit[0].curleft === 10000 && Unit[1].curleft === 10000 && Unit[2].curleft === 10000) {
                                          $("#TEXT").empty;
                                          $("#TEXT").append("YOU LOSE");
                                          $(".actions").append("<div class= 'button' id = 'Lose' >Restart</div>");
                                          $('.button').click(function () {
                                              selectedaction = $(this).attr('id');
                                              if (selectedaction === "Lose") {
                                                  location.reload();
                                              }
                                              return;
                                          })//end of this button thing
                                      }
                                      Unit[y].attacked = false;
                                  }//End of isalive if statement

                              } else{$("#TEXT").append("<p>" + Unit[y].name + " has recovered from being paralyzed</p>");
                                  Unit[y].paralyzed=false
                              }//end of is paralyzed if statement
                          }//end of enemy's turns


                          $('*').attacked=false;
                          $('*').removeClass("selected");
                      }//end of passturn button

                  });//end of .button click event

}


//create spaces//
    for (var i = 1; i<26; i++) {
        $("#background").append("<div class='areas' id = 'space" + vert + horz + "' style ='position: absolute; LEFT: " + addLeft + "px; Top:" + addTop + "px'></div>");
        if (addLeft < 400) {
            addLeft += 100;
            vert+=1;
        } else {
            horz+=1;
            addTop += 100;
            addLeft = 65;
            vert=1;
        }
    }

    //create enemy methods
    function ESoldier(index){
        this.type= "Soldier";
        this.attack= 2;
        this.defense= 2;
        this.resistance= 0;
        this.health= 5;
              this.maxhealth= 5;
        this.paralyzed=false;
        this.usedspecial=false;
        this.index=index;
        this.attacked=false;
        this.alive=true;
        this.charge= "None";
        if (index===3){
            var newtop = 85;
            var newleft=175;
            this.name="Bane";
        } else if (index===4){
            var newtop = 85;
            var newleft=275;
            this.name="Thrasher";
        } else if (index===5) {
            var newtop = 85;
            var newleft = 375;
            this.name="Chainer";
        }else if (index===6) {
            var newtop = 85;
            var newleft = 475;
            this.name="Bulk";
        }else if (index===7) {
            var newtop = 85;
            var newleft = 75;
            this.name="Deathcheck";
        }
        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id = ' + index +' class="Eunit"  STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;"><img src="images/gif/Sprites/Warrior.gif"/></div>');
        $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function EWizard(index){
        this.attack= "None";
        this.type= "Wizard";
        this.charge= 0;
        this.lightning=5;
        this.defense= 0;
        this.resistance= 4;
        this.health= 3;
            this.maxhealth= 3;
        this.paralyzed=false;
        this.index=index;
        this.attacked=false;
        this.alive=true;
        if (index===3){
            var newtop = 85;
            var newleft=175;
            this.name="Mordoc";
        } else if (index===4){
            var newtop = 85;
            var newleft=275;
            this.name="Pine";
        } else if (index===5) {
            var newtop = 85;
            var newleft = 375;
            this.name="Sidius";
        }else if (index===6) {
            var newtop = 85;
            var newleft = 475;
            this.name="Torment";
        }else if (index===7) {
            var newtop = 85;
            var newleft = 75;
            this.name="Finale";
        }

        this.curleft=newleft;
        this.curtop=newtop;

        $('#background').append('<div  id = ' + index +' class="Eunit"  STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;"><img src="images/gif/Sprites/LightningElemental.gif"/></div>');
      $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function ERouge(index){
        this.type= "Rouge";
        this.attack= 1;
        this.defense= 1;
        this.resistance= 1;
        this.health= 4;
            this.maxhealth= 4;
        this.paralyzed=false;
        this.index=index;
        this.attacked=false;
        this.alive=true;
        this.charge= "None";
        this.usedparalyze=3;
        if (index===3){
            var newtop = 85;
            var newleft=175;
            this.name="Shadow";
        } else if (index===4){
            var newtop = 85;
            var newleft=275;
            this.name="Darkwater";
        } else if (index===5) {
            var newtop = 85;
            var newleft = 375;
            this.name="Nightwatch";
        }else if (index===6) {
            var newtop = 85;
            var newleft = 475;
            this.name="Knives";
        }else if (index===7) {
            var newtop = 85;
            var newleft = 75;
            this.name="Wounds";
        }
        this.curleft=newleft;
        this.curtop=newtop;

        $('#background').append('<div  id = ' + index +' class="Eunit"  STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;"><img src="images/gif/Sprites/Assassin.gif"/></div>');
      $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
      }
    function EGuard(index){
        this.type= "Guard";
        this.attack= 1;
        this.defense= 2;
        this.resistance= 2;
        this.health= 5;
            this.maxhealth= 5;
        this.paralyzed=false;
        this.index=index;
        this.attacked=false;
        this.alive=true;
        this.charge= "None";
        if (index===3){
            var newtop = 85;
            var newleft=175;
            this.name="Bull";
        } else if (index===4){
            var newtop = 85;
            var newleft=275;
            this.name="Donkey";
        } else if (index===5) {
            var newtop = 85;
            var newleft = 375;
            this.name="Mule";
        }else if (index===6) {
            var newtop = 85;
            var newleft = 475;
            this.name="Ox";
        }else if (index===7) {
            var newtop = 85;
            var newleft = 75;
            this.name="Horse";
        }
        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id = ' + index +' class="Eunit"  STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;"><img src="images/gif/Sprites/Golem.gif"/></div>');
      $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function ETemplar(index){
        this.type= "Templar";
        this.attack= 2;
        this.defense= 0;
        this.resistance= 3;
        this.health= 5;
            this.maxhealth= 5;
        this.paralyzed=false;
        this.index=index;
        this.attacked=false;
        this.alive=true;
        this.charge= "None";
        if (index===3){
            var newtop = 85;
            var newleft=175;
            this.name="Gallows";
        } else if (index===4){
            var newtop = 85;
            var newleft=275;
            this.name="Guillotine";
        } else if (index===5) {
            var newtop = 85;
            var newleft = 375;
            this.name="Plunge";
        }else if (index===6) {
            var newtop = 85;
            var newleft = 475;
            this.name="Electrocute";
        }else if (index===7) {
            var newtop = 85;
            var newleft = 75;
            this.name="Sickness";
        }
        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id = ' + index +' class="Eunit"  STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;"><img src="images/gif/Sprites/Angel.gif"/></div>');
      $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function EMage(index){
        this.type= "Mage";
        this.attack= "None";
        this.defense= 1;
        this.resistance= 1;
        this.health= 4;
            this.maxhealth= 4;
        this.paralyzed=false;
        this.index=index;
        this.attacked=false;
        this.charge=0;
        this.alive=true;
        if (index===3){
            var newtop = 85;
            var newleft=175;
            this.name="Mystery";
        } else if (index===4){
            var newtop = 85;
            var newleft=275;
            this.name="Enigma";
        } else if (index===5) {
            var newtop = 85;
            var newleft = 375;
            this.name="Unknown";
        }else if (index===6) {
            var newtop = 85;
            var newleft = 475;
            this.name="Myth";
        }else if (index===7) {
            var newtop = 85;
            var newleft = 75;
            this.name="Legend";
        }
        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id = ' + index +' class="Eunit"  STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;"><img src="images/gif/Sprites/Flamewraith.gif"/></div>');
          $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
      }
//create ally methods
    function Soldier(index){
        this.type= "Soldier";
        this.attack= 2;
        this.defense= 2;
        this.resistance= 0;
        this.health= 5;
            this.maxhealth= 5;
       this.charge= "none";
       this.usedspecial=false;
        this.moved=false;
        this.usedaction=false;
        this.index=index;
        this.aparalyzed=false;

       if (index===0){
           var newtop = 485;
           var newleft=175;
           this.name="Joe";
       } else if (index===1){
           var newtop = 485;
           var newleft=275;
           this.name="Bill";
       } else if (index===2) {
           var newtop = 485;
           var newleft = 375;
           this.name="Saul";
       }

       this.curleft=newleft;
       this.curtop=newtop;
            $('#background').append('<div  id=' + index +' STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;" class="unit" name= ' + this.name + '><img src="images/gif/Sprites/Soldier.gif"/></div>');
            $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function Wizard(index){
        this.attack= "None";
        this.type= "Wizard";
        this.charge= 0;
        this.lightning=5;
        this.defense= 0;
        this.resistance= 4;
        this.health= 3;
            this.maxhealth= 3;
        this.moved=false;
        this.usedaction=false;
        this.index=index;
        this.aparalyzed=false;
        if (index===0){
            var newtop = 485;
            var newleft=175;
            this.name="Merlin";
        } else if (index===1){
            var newtop = 485;
            var newleft=275;
            this.name="Voldon";
        } else if (index===2) {
            var newtop = 485;
            var newleft = 375;
            this.name="Rubin";
        }

        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id=' + index +' STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;" class="unit" name= ' + this.name + '><img src="images/gif/Sprites/Wizard.gif"/></div>');
        $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function Rouge(index){
        this.type= "Rouge";
        this.attack= 1;
        this.defense= 1;
        this.resistance= 1;
        this.health= 4;
            this.maxhealth= 4;
        this.usedparalyze=3;
        this.charge= "none";
        this.moved=false;
        this.usedaction=false;
        this.index=index;
        this.aparalyzed=false;
        if (index===0){
            var newtop = 485;
            var newleft=175;
            this.name="Jennifer";
        } else if (index===1){
            var newtop = 485;
            var newleft=275;
            this.name="Sneaks";
        } else if (index===2) {
            var newtop = 485;
            var newleft = 375;
            this.name="Shirley";
        }
        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id=' + index +' STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;" class="unit" name= ' + this.name + '><img src="images/gif/Sprites/Archer.gif"/></div>');
        $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function Guard(index){
        this.type= "Guard";
        this.attack= 1;
        this.defense= 2;
        this.resistance= 2;
        this.health= 5;
            this.maxhealth= 5;
        this.charge= "none";
        this.moved=false;
        this.usedaction=false;
        this.index=index;
        this.aparalyzed=false;
        if (index===0){
            var newtop = 485;
            var newleft=175;
            this.name="Victor";
        } else if (index===1){
            var newtop = 485;
            var newleft=275;
            this.name="Bigs";
        } else if (index===2) {
            var newtop = 485;
            var newleft = 375;
            this.name="Papabear";
        }
        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id=' + index +' STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;" class="unit" name= ' + this.name + '><img src="images/gif/Sprites/Guard.gif"/></div>');
        $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function Templar(index){
        this.type= "Templar";
        this.attack= 2;
        this.defense= 0;
        this.resistance= 3;
        this.health= 5;
            this.maxhealth= 5;
        this.usedShield=false;
        this.charge= "none";
        this.moved=false;
        this.usedaction=false;
        this.index=index;
        this.aparalyzed=false;
        if (index===0){
            var newtop = 485;
            var newleft=175;
            this.name="Joseph";
        } else if (index===1){
            var newtop = 485;
            var newleft=275;
            this.name="David";
        } else if (index===2) {
            var newtop = 485;
            var newleft = 375;
            this.name="Jeremiah";
        }
        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id=' + index +' STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;" class="unit" name= ' + this.name + '><img src="images/gif/Sprites/Knight.gif"/></div>');
        $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }
    function Mage(index){
        this.type= "Mage";
        this.attack= "None";
        this.defense= 1;
        this.resistance= 1;
        this.health= 4;
            this.maxhealth= 4;
        this.charge=0;
        this.moved=false;
        this.usedaction=false;
        this.index=index;
        this.aparalyzed=false;
        if (index===0){
            var newtop = 485;
            var newleft=175;
            this.name="Diana";
        } else if (index===1){
            var newtop = 485;
            var newleft=275;
            this.name="Electra";
        } else if (index===2) {
            var newtop = 485;
            var newleft = 375;
            this.name="Red";
        }
        this.curleft=newleft;
        this.curtop=newtop;
        $('#background').append('<div  id=' + index +' STYLE="position:absolute; TOP:'+ newtop + 'px; LEFT:' + newleft + 'px;" class="unit" name= ' + this.name + '><img src="images/gif/Sprites/Mage.gif"/></div>');
        $('#' + index).append('<div class="healthbar" id = "HB' + index + '" style="position: relative; margin-top:90%; width: ' + (this.health/this.maxhealth)*100 + '%"></div><div class="level"></div>');
    }

    //create enemies
    $("#TEXT").append("Welcome, General. You must defend the castle from these waves of enemies.You can only have three Units per wave, so make sure to use their strengths against the enemies' weaknesses.");

    Unit[3]=new ESoldier(3);
        Unit[4]=new ESoldier(4);

    getenemystats();

    //select enemy unit's stats
    function getenemystats(){
      $('.Eunit').click(function(){
          //gives stats on selected unit
          for (var i = 3; i < Unit.length; i++) {
              if (i == this.id) {
                  $('#TEXT').empty();
                  $('#TEXT').append("<ul>Stats for " + Unit[i].name + " <li>Type: " + Unit[i].type + "</li> <li>Attack: " + Unit[i].attack + "</li> <li>Defense: " + Unit[i].defense + "</li><li>Resistance: " + Unit[i].resistance + "</li><li>Charge: " + Unit[i].charge + "</li><li>Health: " + Unit[i].health + "</li></ul>");
                  var curtype = Unit[i].type;
              }
          }
      });
    }


//highlight spaces//
    $('.areas').mouseenter(function(){
        $(this).addClass("highlight")
    });
    $('.areas').mouseleave(function(){
        $(this).removeClass("highlight")
    });



    //rightclick to move units
    $('.areas').mousedown(function(e) {
        if(e.button === 2 ){

                switch(this.id){
                    case "space11":
                        var futureleft = 75;
                        var futuretop = 85;
                        break;
                    case "space21":
                        var futureleft = 175;
                        var futuretop = 85;
                        break;
                    case "space31":
                        var futureleft = 275;
                        var futuretop = 85;
                        break;
                    case "space41":
                        var futureleft = 375;
                        var futuretop = 85;
                        break;
                    case "space51":
                        var futureleft = 475;
                        var futuretop = 85;
                        break;
                    case "space12":
                        var futureleft = 75;
                        var futuretop = 185;
                        break;
                    case "space22":
                        var futureleft = 175;
                        var futuretop = 185;
                        break;
                    case "space32":
                        var futureleft = 275;
                        var futuretop = 185;
                        break;
                    case "space42":
                        var futureleft = 375;
                        var futuretop = 185;
                        break;
                    case "space52":
                        var futureleft = 475;
                        var futuretop = 185;
                        break;
                    case "space13":
                        var futureleft = 75;
                        var futuretop = 285;
                        break;
                    case "space23":
                        var futureleft = 175;
                        var futuretop = 285;
                        break;
                    case "space33":
                        var futureleft = 275;
                        var futuretop = 285;
                        break;
                    case "space43":
                        var futureleft = 375;
                        var futuretop = 285;
                        break;
                    case "space53":
                        var futureleft = 475;
                        var futuretop = 285;
                        break;
                    case "space14":
                        var futureleft = 75;
                        var futuretop = 385;
                        break;
                    case "space24":
                        var futureleft = 175;
                        var futuretop = 385;
                        break;
                    case "space34":
                        var futureleft = 275;
                        var futuretop = 385;
                        break;
                    case "space44":
                        var futureleft = 375;
                        var futuretop = 385;
                        break;
                    case "space54":
                        var futureleft = 475;
                        var futuretop = 385;
                        break;
                    case "space15":
                        var futureleft = 75;
                        var futuretop = 485;
                        break;
                    case "space25":
                        var futureleft = 175;
                        var futuretop = 485;
                        break;
                    case "space35":
                        var futureleft = 275;
                        var futuretop = 485;
                        break;
                    case "space45":
                        var futureleft = 375;
                        var futuretop = 485;
                        break;
                    case "space55":
                        var futureleft = 475;
                        var futuretop = 485;
                        break;
                }
            if((Unit[selectedindex].curtop - 100 === futuretop && Unit[selectedindex].curleft ===futureleft) || (Unit[selectedindex].curtop + 100 === futuretop && Unit[selectedindex].curleft ===futureleft) || (Unit[selectedindex].curleft - 100 === futureleft && Unit[selectedindex].curtop ===futuretop) || (Unit[selectedindex].curleft + 100 === futureleft && Unit[selectedindex].curtop ===futuretop)) {
               if (Unit[selectedindex].moved===true){
                   $('#TEXT').append("<p>" + Unit[selectedindex].name + " has already moved this turn</p>");
                   return;
               }

                if (Unit[selectedindex].aparalyzed===true){
                    $('#TEXT').append("<p>" + Unit[selectedindex].name + " is paralyzed</p>");
                    return;
                }
                $('.selectedUnit').animate({
                    left: futureleft+'px',
                    top: futuretop+'px'
                }, 500);
                Unit[selectedindex].curleft=futureleft;
                Unit[selectedindex].curtop=futuretop;
                Unit[selectedindex].moved=true;
            }
        }
    });



    //Done
});

},{}]},{},[1]);
