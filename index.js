$(document).ready(function() {

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

});