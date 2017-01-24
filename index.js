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

    var xhr = getHttpRequest();
    xhr.open('GET', 'index.xml', true);
    // On envoit un header pour indiquer au serveur que la page est appellée en Ajax
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
    // On lance la requête
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xhr.responseText // contient le résultat de la page
                    //root

                $.ajax({
                    type: "GET",
                    url: "index.xml",
                    dataType: "xml",
                    success: xmlFunction,
                    error: function() {
                        alert("404 Not Found - Oops something went wrong !");
                    }
                });

                var value, num, nom, prenom;
                var tabNum = [];

                function xmlFunction(xml) {

                    $(xml).find('client').each(function() {
                        num = $(this).attr('num');
                        tabNum.push(num);
                        nom = $(this).find('nom').text();
                        prenom = $(this).find('prenom').text();
                        $(".liste").append($('<option>', { value: num, text: prenom + " " + nom }));
                    });

                    $('select').change(function() {
                        value = this.value;
                        var x = tabNum.indexOf(value);
                        nom = xml.getElementsByTagName("nom")[x].firstChild.nodeValue;
                        prenom = xml.getElementsByTagName("prenom")[x].firstChild.nodeValue;
                        var age = xml.getElementsByTagName("age")[x].firstChild.nodeValue;
                        var profession = xml.getElementsByTagName("profession")[x].firstChild.nodeValue;
                        var telephone = xml.getElementsByTagName("telephone")[x].firstChild.nodeValue;
                        var email = xml.getElementsByTagName("email")[x].firstChild.nodeValue;

                        $(".selectedClient").html(
                            "Nom : " + nom + "<br>" +
                            "Prénom : " + prenom + "<br>" +
                            "Age : " + age + "<br>" +
                            "Profession : " + profession + "<br>" +
                            "Tel : " + telephone + "<br>" +
                            "Mail : " + email);
                    })

                };

            } else {
                // Le serveur a renvoyé un status d'erreur
                console.log("erreur");
            }
        };
    };

});