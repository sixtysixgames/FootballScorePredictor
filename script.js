/*
Copyright (C) 2021 sixtysixgames

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* 
    Created on : 
    Author     : sixtysixgames
*/
    bDebug = false;
    iDefaultMaxGoals = 10;
    iDefaultMinGoals = 2;
    iDefaultHomeGoals = 3;
    iDefaultAwayGoals = 2;
    iDefaultRange1 = 8;
    iDefaultRange2 = 250;
    iDefaultRange3 = 3000;

    var dm = (document.getElementById) ? 1 : 0; // is it w3c
    var ie = (document.all) ? 1:0; //is it explorer
    var ns = (document.layers) ? 1:0; //is it netscape

    sDebug = "";

    function debug(val){
        if (bDebug){
            sDebug += ("> " + val + "\n");
        }
    }
    function numformat(p){

        if (p < 10){
            r = "  " + (p) + " ";
        } else if (p < 100){
            r = " " + (p) + " ";
        } else {
            r = (p) + " ";
        }
        return r;
    }

    function selectGoals(sName, sDefault){
        sRet = "";
        sRet += "<select name=\"" + sName + "\" id=\"" + sName + "\">\n";
        for(var i=1; i<=9; i++){
            if (i == sDefault)
                selected = "selected=\"selected\"";
            else
                selected = "";
            sRet += "<option value=\"" + i + "\" " + selected + ">" + i + "</option>\n";
        }
        sRet += "</select>";
        return sRet;
    }

    function optionOdds(iVal, iDefault){
        sRet = "";
        if (iDefault == iVal)
            selected = "selected=\"selected\"";
        else
            selected = "";
        sRet += "<option value=\"" + iVal + "\" " + selected + ">" + iVal + "</option>\n";
        return sRet
    }

    function selectOdds(sName, iDefault){
        sRet = "";
        sRet += "<select name=\"" + sName + "\" id=\"" + sName + "\">\n";

        sRet += optionOdds(1, iDefault);
        sRet += optionOdds(2, iDefault);
        sRet += optionOdds(3, iDefault);
        sRet += optionOdds(4, iDefault);
        sRet += optionOdds(5, iDefault);
        sRet += optionOdds(8, iDefault);
        sRet += optionOdds(10, iDefault);
        sRet += optionOdds(20, iDefault);
        sRet += optionOdds(30, iDefault);
        sRet += optionOdds(40, iDefault);
        sRet += optionOdds(60, iDefault);
        sRet += optionOdds(80, iDefault);
        sRet += optionOdds(100, iDefault);
        sRet += optionOdds(150, iDefault);
        sRet += optionOdds(200, iDefault);
        sRet += optionOdds(300, iDefault);
        sRet += optionOdds(500, iDefault);
        sRet += optionOdds(750, iDefault);
        sRet += optionOdds(1000, iDefault);
        sRet += optionOdds(1500, iDefault);
        sRet += optionOdds(2000, iDefault);
        sRet += optionOdds(3000, iDefault);
        sRet += optionOdds(5000, iDefault);
        sRet += optionOdds(6000, iDefault);
        sRet += optionOdds(7500, iDefault);
        sRet += optionOdds(10000, iDefault);
        sRet += ( "</select>");
        //alert(sRet);
        return sRet;
    }
    /*
    function selectOdds(sName, iDefault){
        sRet = "";
        sRet += ( "<select name=\"" + sName + "\" id=\"" + sName + "\">\n");
        for(var i=0; i<14; i++){
            iVal = Math.pow(2, i);
            if (iVal == iDefault)
                selected = "selected=\"selected\"";
            else
                selected = "";

            sRet += ( "<option value=\"" + iVal + "\" " + selected + ">" + iVal + "</option>\n");
        }
        sRet += ( "</select>");
        //alert(sRet);
        return sRet;
    }
*/
    // initialise column indices
    i = 0;
    iColName = i++;
    iColInits = i++;
    iColOdds = i++;
    iColPoints = i++;
    iColWon = i++;
    iColDrew = i++;
    iColLost = i++;
    iColFor = i++;
    iColAgainst = i++;
    iColMorale = i++;

    // initialise end position ranks
    ichampions = 1;
    iuefa = 2;
    imidtable = 3;
    irelegation = 4;


    //debug(iodds);
    //1 2 3 4 5  6  7  8   9   10  11   12   13   14   15    16    17    18     19     20
    //1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072,262144,524288
    //use these values
    //1,2,3,4,5,8,10,20,30,40,50,75,100,150,200,300,500,750,1000,1500,2000,3000,5000,7500,10000
    // from oddschecker - best odds
    var ateams = new Array(
    new Array("Arsenal      ", "Ars",   150, 0, 0, 0, 0, 0, 0),
    new Array("Aston Villa  ", "Ast",   300, 0, 0, 0, 0, 0, 0),
    //new Array("Birmingham   ", "Bir",  7500, 0, 0, 0, 0, 0, 0),
    new Array("Brentford    ", "Bre",   500, 0, 0, 0, 0, 0, 0),
    new Array("Brighton     ", "Bri",   500, 0, 0, 0, 0, 0, 0),
    new Array("Burnley      ", "Bur",  1000, 0, 0, 0, 0, 0, 0),
    //new Array("Blackburn    ", "Bla",  3000, 0, 0, 0, 0, 0, 0),
    //new Array("Bolton       ", "Bol",  5000, 0, 0, 0, 0, 0, 0),
    new Array("Chelsea      ", "Che",     3, 0, 0, 0, 0, 0, 0),
    new Array("Crystal Pal  ", "Cry",  1000, 0, 0, 0, 0, 0, 0),
    new Array("Everton      ", "Eve",   150, 0, 0, 0, 0, 0, 0),
    //new Array("Fulham       ", "Ful",  2000, 0, 0, 0, 0, 0, 0),
    //new Array("Hull City    ", "Hul", 10000, 0, 0, 0, 0, 0, 0),
    new Array("Leeds        ", "Lee",   300, 0, 0, 0, 0, 0, 0),
    new Array("Leicester    ", "Lei",    75, 0, 0, 0, 0, 0, 0),
    new Array("Liverpool    ", "Liv",     4, 0, 0, 0, 0, 0, 0),
    new Array("Man City     ", "MnC",     1, 0, 0, 0, 0, 0, 0),
    new Array("Man Utd      ", "MnU",     5, 0, 0, 0, 0, 0, 0),
    new Array("Newcastle    ", "New",  1000, 0, 0, 0, 0, 0, 0),
    new Array("Norwich      ", "Nor",  1500, 0, 0, 0, 0, 0, 0),
    //new Array("Portsmouth   ", "Por",  1500, 0, 0, 0, 0, 0, 0),
    //new Array("Stoke City   ", "Sto",  7500, 0, 0, 0, 0, 0, 0),
    //new Array("Sunderland   ", "Sun",  3000, 0, 0, 0, 0, 0, 0),
    new Array("Southampton  ", "Sou",   750, 0, 0, 0, 0, 0, 0),
    new Array("Tottenham    ", "Tot",    30, 0, 0, 0, 0, 0, 0),
    new Array("Watford      ", "WHU",  1000, 0, 0, 0, 0, 0, 0),
    new Array("West Ham     ", "WHU",   150, 0, 0, 0, 0, 0, 0),
    //new Array("Wigan        ", "Wig",  5000, 0, 0, 0, 0, 0, 0),
    new Array("Wolves       ", "Wol",   500, 0, 0, 0, 0, 0, 0)
);

    function resetTeams(){
        for(var i=0; i<20; i++){
            ateams[i][iColPoints] = 0;
            ateams[i][iColWon] = 0;
            ateams[i][iColDrew] = 0;
            ateams[i][iColLost] = 0;
            ateams[i][iColFor] = 0;
            ateams[i][iColAgainst] = 0;
            ateams[i][iColMorale] = 0;
        }
        // sort alphabetically
        for(var home=0; home<ateams.length - 1 ; home++){
            for(var away=home+1; away<ateams.length; away++){
                if (ateams[home][iColName] > ateams[away][iColName]){
                    atemp = new Array();
                    atemp = ateams[home];
                    ateams[home] = ateams[away];
                    ateams[away] = atemp;
                }
            }
        }
    }
    resetTeams();

    // initialise distribution
    var aresults = new Array(
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
);
    function resetDist(){
        for(var h=0;h<=9;h++){
            for(a=0;a<=9;a++){
                aresults[h][a] = 0;
            }
        }
    }


    function getOdds(){
        for(var home=0; home<ateams.length; home++){
            oSelect = document.getElementById(ateams[home][iColInits]);
            iTheseOdds = oSelect.options[oSelect.selectedIndex].value;
            //alert(ateams[home][iColInits] + " " + iTheseOdds)
            ateams[home][iColOdds] = parseInt(iTheseOdds);
        }
    }

    // create scores and build final table
    function calculate(){
        seasons = 1;
        resetTeams();
        getOdds();
        resetDist();
//document.getElementById("finaltable").innerHTML = "";
        var sOutput = "";
        sOutput += "<pre>";

        oSelect = document.getElementById("homegoals");
        iMaxHomeGoals = parseInt(oSelect.options[oSelect.selectedIndex].value);
        oSelect = document.getElementById("awaygoals");
        iMaxAwayGoals = parseInt(oSelect.options[oSelect.selectedIndex].value);
        
        oSelect = document.getElementById("champs");
        iRange1 = parseInt(oSelect.options[oSelect.selectedIndex].value);
        oSelect = document.getElementById("europe");
        iRange2 = parseInt(oSelect.options[oSelect.selectedIndex].value);
        oSelect = document.getElementById("midtable");
        iRange3 = parseInt(oSelect.options[oSelect.selectedIndex].value);

        bAddGoal = document.getElementById("addgoal").checked;
        bRemoveGoal = document.getElementById("removegoal").checked;

        iAddRange = 0;
        if(document.getElementById("addrange1").checked){
            iAddRange = 1;
        }
        if(document.getElementById("addrange2").checked){
            iAddRange = 2;
        }
        if(document.getElementById("addrange3").checked){
            iAddRange = 3;
        }

        iRemRange = 0;
        if(document.getElementById("remrange1").checked){
            iRemRange = 1;
        }
        if(document.getElementById("remrange2").checked){
            iRemRange = 2;
        }
        if(document.getElementById("remrange3").checked){
            iRemRange = 3;
        }


//alert(iAddRange);

        debug("iMaxHomeGoals " + iMaxHomeGoals);
        debug("iMaxAwayGoals " + iMaxAwayGoals);
        debug("iRange1 " + iRange1);
        debug("iRange2 " + iRange2);
        debug("iRange3 " + iRange3);

        for(var season = 1; season <= seasons; season++){

            if(season==seasons){
                sOutput += ("<table border=\"1\" cellspacing=\"0\"><tr><td>&nbsp;</td>");
                for(away=0; away<ateams.length; away++){
                    if(away % 3 == 2){sclass="shaded";} else {sclass="";}
                    sOutput += ("<th width=\"25\" class=\"" + sclass + "\"><small>" + ateams[away][iColInits] + "</small></th>")
                }
                sOutput += ("</tr>\n");
            }
            for(var home = 0; home < ateams.length; home++){
                // alternate row shading
                if(season==seasons){
                    if(home % 3 == 2){sclass="shaded";} else {sclass="";}
                    sOutput += ("<tr><th align=\"left\" class=\"" + sclass + "\"><small>" + ateams[home][iColName] + "</small></th>");
                }
                for(var away = 0; away < ateams.length; away++){
                    // alternate column shading
                    if(season == seasons){
                        if (home % 3 != 2){
                            if(away % 3 == 2){sclass="shaded";} else {sclass="";}
                        }
                    }

                    if(home != away){
                        // calculate scores
                        hs = iMaxHomeGoals;
                        as = iMaxAwayGoals;
                        debug(ateams[home][0] + " v " + ateams[away][0]);
                        debug("odds: " + ateams[home][iColOdds] + ", away " + ateams[away][iColOdds]);

                        // some adjusting based on strengths


                        // now give an advantage to the stronger team
                        if (bAddGoal){
                            if (parseInt(ateams[home][iColOdds]) < parseInt(ateams[away][iColOdds])){
                                hs++;
                                debug("increase home " + hs);
                            } else if (parseInt(ateams[home][iColOdds]) > parseInt(ateams[away][iColOdds])) {
                                as++;
                                debug("increase away " + as);
                            }
                        }
                        if (bRemoveGoal){
                            if (parseInt(ateams[home][iColOdds]) < parseInt(ateams[away][iColOdds])){
                                as--;
                                debug("decrease away " + as);
                            } else if (parseInt(ateams[home][iColOdds]) > parseInt(ateams[away][iColOdds])) {
                                hs--;
                                debug("decrease home " + hs);
                            }
                        }


                        // more adjusting based on strengths
                        // ADD BY RANGE
                        if (iAddRange == 1){
                            // range 1
                            if(parseInt(ateams[home][iColOdds]) <= iRange1 && parseInt(ateams[away][iColOdds]) > iRange1){
                                hs++;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange1 && parseInt(ateams[home][iColOdds]) > iRange1){
                                as++;
                                debug("increase away " + as);
                            }

                            //range 2
                            if(parseInt(ateams[home][iColOdds]) <= iRange2 && parseInt(ateams[away][iColOdds]) > iRange2){
                                hs++;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange2 && parseInt(ateams[home][iColOdds]) > iRange2){
                                as++;
                                debug("increase away " + as);
                            }

                            //range 3
                            if(parseInt(ateams[home][iColOdds]) <= iRange3 && parseInt(ateams[away][iColOdds]) > iRange3){
                                hs++;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange3 && parseInt(ateams[home][iColOdds]) > iRange3){
                                as++;
                                debug("increase away " + as);
                            }
                        }
                        if (iAddRange == 2){
                            if(parseInt(ateams[home][iColOdds]) <= iRange1 && parseInt(ateams[away][iColOdds]) > iRange2){
                                hs++;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange1 && parseInt(ateams[home][iColOdds]) > iRange2){
                                as++;
                                //hs--;
                                debug("increase away " + as);
                            }
                            if(parseInt(ateams[home][iColOdds]) <= iRange2 && parseInt(ateams[away][iColOdds]) > iRange3){
                                hs++;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange2 && parseInt(ateams[home][iColOdds]) > iRange3){
                                as++;
                                debug("increase away " + as);
                            }
                            
                        }
                        if (iAddRange == 3){
                            if(parseInt(ateams[home][iColOdds]) <= iRange1 && parseInt(ateams[away][iColOdds]) > iRange3){
                                hs++;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange1 && parseInt(ateams[home][iColOdds]) > iRange3){
                                as++;
                                debug("increase away " + as);
                            }
                        }

                        // REMOVE BY RANGE
                        if (iRemRange == 1){
                            // range 1
                            if(parseInt(ateams[home][iColOdds]) <= iRange1 && parseInt(ateams[away][iColOdds]) > iRange1){
                                as--;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange1 && parseInt(ateams[home][iColOdds]) > iRange1){
                                hs--;
                                debug("increase away " + as);
                            }

                            //range 2
                            if(parseInt(ateams[home][iColOdds]) <= iRange2 && parseInt(ateams[away][iColOdds]) > iRange2){
                                as--;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange2 && parseInt(ateams[home][iColOdds]) > iRange2){
                                hs--;
                                debug("increase away " + as);
                            }

                            //range 3
                            if(parseInt(ateams[home][iColOdds]) <= iRange3 && parseInt(ateams[away][iColOdds]) > iRange3){
                                as--;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange3 && parseInt(ateams[home][iColOdds]) > iRange3){
                                hs--;
                                debug("increase away " + as);
                            }
                        }
                        if (iRemRange == 2){
                            if(parseInt(ateams[home][iColOdds]) <= iRange1 && parseInt(ateams[away][iColOdds]) > iRange2){
                                as--;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange1 && parseInt(ateams[home][iColOdds]) > iRange2){
                                hs--;
                                debug("increase away " + as);
                            }
                            if(parseInt(ateams[home][iColOdds]) <= iRange2 && parseInt(ateams[away][iColOdds]) > iRange3){
                                as--;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange2 && parseInt(ateams[home][iColOdds]) > iRange3){
                                hs--;
                                debug("increase away " + as);
                            }

                        }
                        if (iRemRange == 3){
                            if(parseInt(ateams[home][iColOdds]) <= iRange1 && parseInt(ateams[away][iColOdds]) > iRange3){
                                as--;
                                debug("increase home " + hs);
                            }
                            if(parseInt(ateams[away][iColOdds]) <= iRange1 && parseInt(ateams[home][iColOdds]) > iRange3){
                                hs--;
                                debug("increase away " + as);
                            }
                        }



                        // SCORES
                        // generate actual scores
                        if (hs > iDefaultMaxGoals) hs = iDefaultMaxGoals;
                        if (as > iDefaultMaxGoals) as = iDefaultMaxGoals;
                        if (hs < iDefaultMinGoals) hs = iDefaultMinGoals;
                        if (as < iDefaultMinGoals) as = iDefaultMinGoals;

                        debug("scores: " + hs + ", away " + as);
                        hs = Math.floor(Math.random() * hs); // use floor to ensure more nils
                        as = Math.floor(Math.random() * as);
                        debug("results: " + hs + ", away " + as);

                        // POINTS
                        if (hs > as){
                            ateams[home][iColPoints] += 3;
                            ateams[home][iColWon] += 1;
                            ateams[away][iColLost] += 1;
                        } else if (as > hs){
                            ateams[away][iColPoints] += 3;
                            ateams[away][iColWon] += 1;
                            ateams[home][iColLost] += 1;
                        } else {
                            ateams[home][iColPoints] += 1;
                            ateams[away][iColPoints] += 1;
                            ateams[home][iColDrew] += 1;
                            ateams[away][iColDrew] += 1;
                        }

                        ateams[home][iColFor] += hs;
                        ateams[home][iColAgainst] += as;
                        ateams[away][iColFor] += as;
                        ateams[away][iColAgainst] += hs;

                        if(season == seasons){
                            sOutput += ("<td align=\"center\" class=\"" + sclass + "\"><small>" + hs + "-" + as + "</small></td>" );
                        }
                        aresults[hs][as] += 1;

                    } else {
                        if(season == seasons){
                            sOutput += ("<td align=\"center\" class=\"" + sclass + "\"><small>-</small></td>" );
                        }
                    } // end if
                } // next away
                if(season == seasons){
                    sOutput += "</tr>\n";
                }
            } // next home
            if(season == seasons){
                sOutput += "</table>\n";
            }

            // final table sort
            for(var home = 0; home < ateams.length - 1 ; home++){
                for(var away = home + 1; away < ateams.length; away++){
                    if (ateams[home][iColPoints] < ateams[away][iColPoints]){
                        atemp = new Array();
                        atemp = ateams[home];
                        ateams[home] = ateams[away];
                        ateams[away] = atemp;
                    } else if (ateams[home][iColPoints] == ateams[away][iColPoints]){
                        iHomeGD = ateams[home][iColFor] - ateams[home][iColAgainst];
                        iAwayGD = ateams[away][iColFor] - ateams[away][iColAgainst];
                        if (iHomeGD < iAwayGD){
                            atemp = new Array();
                            atemp = ateams[home];
                            ateams[home] = ateams[away];
                            ateams[away] = atemp;
                        } else if (iHomeGD == iAwayGD){
                           if (ateams[home][iColFor] < ateams[away][iColFor]){
                                atemp = new Array();
                                atemp = ateams[home];
                                ateams[home] = ateams[away];
                                ateams[away] = atemp;
                           }
                        }
                    }
                }
            }
            if(season == seasons){
                sOutput += ("\n\n");
            }

            // output table
            sTable = "<pre>";
            if(season == seasons){
                sTable += "<b>Final Table</b>       Pts    W   D   L   F   A<br />";
                for(var p = 0; p < ateams.length; p++){
                    if (p+1 < 10){
                        sTable += (" " + (p + 1));
                    } else {
                        sTable += (p + 1);
                    }
                    sTable += ". " + ateams[p][iColName] + " " + numformat(ateams[p][iColPoints]) + " ";
                    sTable += numformat(ateams[p][iColWon]) ;
                    sTable += numformat(ateams[p][iColDrew]) ;
                    sTable += numformat(ateams[p][iColLost]) ;
                    sTable += numformat(ateams[p][iColFor]) ;
                    sTable += numformat(ateams[p][iColAgainst]);
                    sTable += "<br />";
                }
            }
            sTable += "</pre>";
            document.getElementById("finaltable").innerHTML = sTable;
        } // season

        // output results distribution
        //sOutput += ("\n");
        sOutput += "<h3>Results Distribution</h3>";
        sOutput += "<b>     ";
        for(var a=0; a<=9; a++){
            sOutput += (numformat(a) + ".");
        }
         sOutput += ("</b><br />");

        for(var h=0; h<=9; h++){
            sOutput += "<b>" + numformat(h) + "</b>.";
            for(var a=0; a<=9; a++){
                sOutput += (numformat(aresults[h][a]) + ".");
            }
            sOutput += ("<br />");
        }

        if (bDebug)
            sOutput += sDebug;

        sOutput += ("</pre>");

        document.getElementById("predictions").innerHTML = sOutput;
    }

    //calculate();

        var sSetup = "<form name=\"frmSetup\" id=\"frmSetup\">";


        sSetup += "<table>";

        sSetup += "<tr>";
        sSetup += "<td width=\"150\">Base Home Goals:</td>";
        sSetup += "<td>" + selectGoals("homegoals", iDefaultHomeGoals) + "</td>";
        sSetup += "<td>The number of goals may go up or down depending on the odds of the team</td>";
        sSetup += "</tr>";

        sSetup += "<tr>";
        sSetup += "<td>Base Away Goals:</td>";
        sSetup += "<td>" + selectGoals("awaygoals", iDefaultAwayGoals) + "</td>";
        sSetup += "</tr>";

        sSetup += "<tr>";
        sSetup += "<td>Potential Champions:</td>";
        sSetup += "<td>" + selectOdds("champs", iDefaultRange1) + "</td>";
        sSetup += "<td>Teams with these odds or less could win the league.&nbsp; (Range 1)</td>";
        sSetup += "</tr>";

        sSetup += "<tr>";
        sSetup += "<td>Europe Contenders:</td>";
        sSetup += "<td>" + selectOdds("europe", iDefaultRange2) + "</td>";
        sSetup += "<td>Teams with these odds or less could get into Europe.&nbsp; (Range 2)</td>";
        sSetup += "</tr>";

        sSetup += "<tr>";
        sSetup += "<td>Mid-table Obscurity:</td>";
        sSetup += "<td>" + selectOdds("midtable", iDefaultRange3) + "</td>";
        sSetup += "<td>Teams with these odds or less will end up mid-table.&nbsp; (Range 3)";
        sSetup += "<br />Teams with odds higher than this are relegation fodder.&nbsp; (Range 4)</td>";
        sSetup += "</tr>";

        sSetup += "<tr>";
        sSetup += "<td>&nbsp;</td>";
        sSetup += "<td align=\"right\"><input type=\"checkbox\" id=\"addgoal\" name=\"addgoal\" checked=\"true\" /></td>";
        sSetup += "<td>Add a goal for the team with the lower odds.</td>";
        sSetup += "</tr>";

        sSetup += "<tr>";
        sSetup += "<td>&nbsp;</td>";
        sSetup += "<td align=\"right\"><input type=\"checkbox\" id=\"removegoal\" name=\"removegoal\" /></td>";
        sSetup += "<td>Remove a goal for the team with the higher odds.</td>";
        sSetup += "</tr>";
        sSetup += "</table>";

        sSetup += "<table>";
        sSetup += "<tr>";
        sSetup += "<td align=\"right\" width=\"25\">";
        sSetup += "<input type=\"radio\" id=\"addrange0\" name=\"addrange\" value=\"0\" /></td>";
        sSetup += "<td>Do not add extra goals per range(s).</td>";
        sSetup += "<td align=\"right\" width=\"25\">";
        sSetup += "<input type=\"radio\" id=\"remrange0\" name=\"remrange\" value=\"0\" /></td>";
        sSetup += "<td>Do not remove goals per range(s).</td>";
        sSetup += "</tr>";
        sSetup += "<tr>";
        sSetup += "<td align=\"right\">";
        sSetup += "<input type=\"radio\" id=\"addrange1\" name=\"addrange\" value=\"1\" /></td>";
        sSetup += "<td>Add a goal per range for the team with the lower odds.</td>";
        sSetup += "<td align=\"right\">";
        sSetup += "<input type=\"radio\" id=\"remrange1\" name=\"remrange\" value=\"1\" /></td>";
        sSetup += "<td>Remove a goal per range for the team with the higher odds.</td>";
        sSetup += "</tr>";
        sSetup += "<tr>";
        sSetup += "<td align=\"right\">";
        sSetup += "<input type=\"radio\" id=\"addrange2\" name=\"addrange\" value=\"2\" checked=\"true\" /></td>";
        sSetup += "<td>Add a goal per two ranges for the team with the lower odds.</td>";
        sSetup += "<td align=\"right\">";
        sSetup += "<input type=\"radio\" id=\"remrange2\" name=\"remrange\" value=\"2\" /></td>";
        sSetup += "<td>Remove a goal per two ranges for the team with the higher odds.</td>";
        sSetup += "</tr>";
        sSetup += "<tr>";
        sSetup += "<td align=\"right\">";
        sSetup += "<input type=\"radio\" id=\"addrange3\" name=\"addrange\" value=\"3\" /></td>";
        sSetup += "<td>Add a goal per three ranges for the team with the lower odds.</td>";
        sSetup += "<td align=\"right\">";
        sSetup += "<input type=\"radio\" id=\"remrange3\" name=\"remrange\" value=\"3\" checked=\"true\" /></td>";
        sSetup += "<td>Remove a goal per three ranges for the team with the higher odds.</td>";
        sSetup += "</tr>";


        sSetup += "</table>";
        //document.write(sSetup);
        document.getElementById("setup").innerHTML += sSetup;

        sSetup = "";
        sSetup += "<table width=\"100%\">\n";
        sSetup += "<tr>\n";
        sSetup += "<td width=\"50%\" colspan=4><b>Team Odds *</b></td>";
        sSetup += "<td width=\"50%\" rowspan=13><div name=\"finaltable\" id=\"finaltable\"></div></td>";
        sSetup += "</tr>\n";
        sSetup += "<tr>\n";
        for(var i = 0; i < 20; i++){
            sSetup += "<td>\n";
            sSetup += ateams[i][0];
            sSetup += ":</td>\n";
            sSetup += "<td>\n";
            sSetup += selectOdds(ateams[i][iColInits], ateams[i][iColOdds]);
            sSetup += "</td>\n";
            if ((i != 19) && (((i+1) % 2) == 0)){
                sSetup += "</tr><tr>\n";
            }
        }
        sSetup += "</tr>\n";
        sSetup += "<tr>\n";
        sSetup += "<td colspan=4 align=\"center\">";
        sSetup += "<input type=\"button\" value=\"Predict\" onclick=\"calculate();\" />";
        sSetup += " &nbsp; <input type=\"reset\" />";
        sSetup += "</td>";
        sSetup += "</tr>\n";
        sSetup += "</table>\n";
        //document.write(sSetup);
        document.getElementById("setup").innerHTML += sSetup + "</form>" ;

