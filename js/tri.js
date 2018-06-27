  
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
	document.getElementById('tableau_saisi_text').innerHTML="Le tableau a tri\351e est :";
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
    document.getElementById('click_commencer').innerHTML="Veuillez entrer les \351l\351ments du tableau puis cliquer sur 'Commencer' :"
}





function tri_insert(t, nombre) {
        var i=nombre;
    //for(var i=1 ; i < t.length ; i++){
        var temp= t[i] ;
        var j = i-1 ;
        while( comparaison(temp,t[j]) && j>=0){
            t[j+1]= t[j]
            j-- ;
        };
        t[j+1]=temp ;
    //} 
    return t;
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

function trie_insert() {
    afficher_tableau();
    var y = document.getElementById("input_nb").value;
    var t = remplir_tab();
    
     
    for (var i = 1; i < t.length ; i++ ) {
        var etape = $('.etapeTemplate').clone().removeClass('hide').removeClass('etapeTemplate').addClass('etape' + i);
        etape.find('.itteration').append('itt\351ration '+i);
        etape.find('.tab_initial').append(getHtmlArray(t));
        var tab_triee = t.slice(0, i);
        var tab_non_triee = t.slice(i);
        etape.find('.tab_nn_triee').append(getHtmlArray(tab_non_triee, 'Orange'));
        etape.find('.tab_triee').append(getHtmlArray(tab_triee));
        etape.find('.element').append(getHtmlArray(tab_non_triee[0], 'Orange'));
        var premierElement = tab_non_triee[0];
        var tabb = tri_insert(t,i);
        var tab_triee_apres = tabb.slice(0,i+1);
        var tab_non_triee_apres = t.slice(i+1);
        etape.find('.tab_triee_apres').append(getHtmlArrayafter(tab_triee_apres, 'Orange', premierElement));
        etape.find('.tab_non_triee_apres').append(getHtmlArray(tab_non_triee_apres));
   
        $('#steps').append(etape);
        $('#steps').append('<br><br>');
        var t=tri_insert(t,i);
        etape.find('.resultat').append(getHtmlArray(t));
    } 
    document.getElementById('nb').innerHTML="(*) : l'\351l\351ment en orang\351 c'est l'\351l\351ment  \340 ins\351rer dans la partie tri\351e apr\351s insertion , en comparant cet \351l\351ment avec les autres \351l\351ments de la partie tri\351e puis l ins\351rer dans le bon endroit ."; 
}    