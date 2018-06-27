function addInput(nombre) {
    var input = document.createElement("input"); // element <input>
    input.name = 'element_' + nombre;
    
    var label = document.createElement('label'); // element <label>
    label.innerText = 'nombre : ' + parseInt(nombre + 1);

    var br = document.createElement('br'); // retour a la ligne (<br>)
    
    document.getElementById('tableau_a_trier').appendChild(label);
    document.getElementById('tableau_a_trier').appendChild(input);
    document.getElementById('tableau_a_trier').appendChild(br);
}
	
function remplir_tab(){
	document.getElementById('tableau_saisi_text').innerHTML="le tableau a triee est :";
	var y = document.getElementById("input_nb").value;
	var tab = Array(y);
	for(var i=0 ; i < y ; i++){
		tab[i]=document.getElementsByName('element_' + i)[0].value;
	}
  	
  	return tab;
}




function comparaison(a, b){ 
	return a < b;
}

function getHtmlElement(element, text) {
    var element = document.createElement(element);
    element.innerText = text;
    return element;
}


function afficher_tableau(){
            
    var elmt = document.getElementById("tableau_global");
    elmt.className="tabglo";

    var y = document.getElementById("input_nb").value;
    var t = remplir_tab();
    //document.getElementById('message_du_tableau').innerHTML="le tableau a triee :";
   for(var i=y-1 ; i>=0 ; i--){
        var row = document.getElementById("tableau_saisi_tab");
        var x = row.insertCell(0);
        x.innerHTML = t[i];
    }
}

function display_cases() {
    var elmt3 = document.getElementById("commencer");
        elmt3.className="com";


    document.getElementById('tableau_a_trier').innerHTML = '';
    var y = document.getElementById("input_nb").value;
    if (y < 2 || y > 20) {
        alert('check the selected number !');
        return false;
    }
    for (var i = 0 ; i < y; i++) {
        console.log('creating input num : ' + i );
        addInput(i);
    }
    document.getElementById('click_commencer').innerHTML="veuillez entrer les elements du tableau puis cliquer sur Commencer"
}


function getHtmlArraybefore(tab, colorlastElement) {
    var $table = $( "<table></table>" );
    var $line = $( "<tr></tr>" );
    for ( var i = 0; i < tab.length; i++ ) {
        var cssClass = "";
        if (typeof colorlastElement !== "undefined" && i == (tab.length-1) ) {
            cssClass = colorlastElement;
        }
        $line.append( $( "<td class='" + cssClass + "'' ></td>" ).html( tab[i] ) );
        $table.append( $line );
    }
    return $table;
}


function getHtmlArraymin(tab, colorFirstElement) {
    var $table = $( "<table></table>" );
    var $line = $( "<tr></tr>" );
    var mini=Min(tab);
    for ( var i = 0; i < tab.length; i++ ) {
        var cssClass = "";
        if (typeof colorFirstElement !== "undefined" && tab[i]==mini ) {
            cssClass = colorFirstElement;
        }
        $line.append( $( "<td class='" + cssClass + "'' ></td>" ).html( tab[i] ) );
        $table.append( $line );
    }
    return $table;
}

function getHtmlArray(tab, colorFirstElement) {
    var $table = $( "<table></table>" );
    var $line = $( "<tr></tr>" );
    for ( var i = 0; i < tab.length; i++ ) {
        var cssClass = "";
        if (typeof colorFirstElement !== "undefined" && i == 0 ) {
            cssClass = colorFirstElement;
        }
        $line.append( $( "<td class='" + cssClass + "'' ></td>" ).html( tab[i] ) );
        $table.append( $line );
    }
    return $table;
}


function getHtmlArrayafter(tab, colorFirstElement, elementinsert) {
    var $table = $( "<table></table>" );
    var $line = $( "<tr></tr>" );
    for ( var i = 0; i < tab.length; i++ ) {
        var cssClass = "";
        if (typeof colorFirstElement !== "undefined" && tab[i] == elementinsert ) {
            cssClass = colorFirstElement;
        }
        $line.append( $( "<td class='" + cssClass + "'' ></td>" ).html( tab[i] ) );
        $table.append( $line );
    }
    return $table;
}
function recherchepos(tab,element){
    for (var i=0 ; i<tab.length ; i++){
        if (tab[i]==element){
            return(i)
        }
    }
}


function tri(l,nb_itter){
                    var i=nb_itter;
                    for(var j=i+1; j< l.length; j++){
                        if(comparaison(l[j],l[i]) ){
                            var temp = l[j];
                            l[j]=l[i];
                            l[i]=temp;
                        }
                    }
            return l ;
            }

function Min(arr) {
            return Math.min.apply(null, arr);
            }

function trie_select() {
    afficher_tableau();
    var y = document.getElementById("input_nb").value;
    var t = remplir_tab();
    
    for (var i = 1; i < t.length ; i++ ) {
        var etape = $('.etapeTemplate').clone().removeClass('hide').removeClass('etapeTemplate').addClass('etape' + i);
        etape.find('.itteration').append('itteration ' +i);
        etape.find('.tab_initial').append(getHtmlArray(t));
        var tab_triee = t.slice(0, i);
        var tab_non_triee = t.slice(i);
        etape.find('.tab_nn_triee').append(getHtmlArraymin(tab_non_triee, 'DeepSkyBLue'));
        etape.find('.tab_triee').append(getHtmlArraybefore(tab_triee,'LightGreen'));
        var Element_min = Min(tab_non_triee);
        var tab10=t.slice(recherchepos(t,Element_min),recherchepos(t,Element_min)+1);
        etape.find('.element').append(getHtmlArray(tab10, 'DeepSkyBLue'));
        etape.find('.elementder').append(getHtmlArray(tab_triee[(tab_triee.length)-1], 'LightGreen'));
        var tabb = tri(t,i-1);
        var der_elem=tab_triee[tab_triee.length-1];
        var tab_triee_apres = tabb.slice(0,i);
        var tab_non_triee_apres = t.slice(i);
        etape.find('.tab_triee_apres').append(getHtmlArrayafter(tab_triee_apres, 'DeepSkyBLue',Element_min));
        etape.find('.tab_non_triee_apres').append(getHtmlArrayafter(tab_non_triee_apres,'LightGreen',der_elem));
        etape.find('.resultat').append(getHtmlArray(tabb));
        $('#steps').append(etape);
        $('#steps').append('<br><br>');
    }   
    document.getElementById('nb').innerHTML="(*):Si l'\351l\351ment s\351l\351ctionn\351 (en bleu) est inf\351rieur au dernier \351l\351ment du partie tri\351e (\351l\351ment en vert) on \351change les deux \351l\351ments entre eux sinon s'il est sup\351rieur rien ne se passe ."; 
}    