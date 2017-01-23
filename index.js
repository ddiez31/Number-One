$(document).ready(function() {
    var getHttpRequest = function() {
        var httpRequest = false;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            httpRequest = new XMLHttpRequest();
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (!httpRequest) {
            alert('Abandon :( Impossible de créer une instance XMLHTTP');
            return false;
        }
        return httpRequest;
    };

    // var xhr = getHttpRequest();
    // xhr.open('GET', 'index.xml', true);
    // // On envoit un header pour indiquer au serveur que la page est appellée en Ajax
    // xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
    // // On lance la requête
    // xhr.send();
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status === 200) {
    //             xhr.responseText // contient le résultat de la page
    //                 //root
    //         } else {
    //             // Le serveur a renvoyé un status d'erreur
    //             console.log("erreur");
    //         }
    //     };
    // };
    $.ajax({
        type: "GET",
        url: "index.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('repertoire').each(
                function() {
                    var client = $(this).find('client').text();
                    console.log(client);



                    var nom = $(this).find('nom').eq().html();
                    console.log(nom);

                    var prenom = $(this).find('prenom').html();
                    console.log(prenom);
                    var age = $(this).find('age').html();
                    console.log(age);
                    var profession = $(this).find('profession').html();
                    console.log(profession);
                    var telephone = $(this).find('telephone').html();
                    console.log(telephone);
                    var email = $(this).find('email').html();
                    console.log(email);



                    // $('<div class="items" id="link_' + client + '"></div>').html('<a href="' + prenom + '">' + nom + '</a>').appendTo('.reponse');
                    $(this).find('desc').each(
                        function() {
                            var brief = $(this).find('brief').text();
                            var long = $(this).find('long').text();
                            $('<div class="brief"></div>').html(brief).appendTo('#link_' + id);
                            $('<div class="long"></div>').html(long).appendTo('#link_' + id);
                        });

                });


        }

    });






});