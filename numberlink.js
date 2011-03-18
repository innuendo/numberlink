var opisPlanszy =
        "0004000" +
        "0300250" +
        "0003100" +
        "0005000" +
        "0000000" +
        "0010000" +
        "2000400";
var rozmiar = 7;
var kolory = new Array();
var graf;
var zaznaczanaSciezka = new Array();
var odznaczanaSciezka = new Array();
var zaznaczam =  0; // 0 - nie zaznaczam, 1 - zaznaczam, 2 - odznaczam
var poczatekZaznaczenia;

function wspolrzedne(i, j, rozmiar)
{
    return (i * rozmiar + j);
}

function kolor(i)
{
    var kolor = new Array(2), r, g, b;
    if (i == 0) r = g = b =255;
    else
    {
        r = Math.floor(Math.random() * 200 + 55);
        g = Math.floor(Math.random() * 200 + 55);
        b = Math.floor(Math.random() * 200 + 55);
        
    }
    kolor[0] = "rgb(" + r + ", " + g + ", " + b + ")";
    var srednia = (r + g + b) / 3;
    if (srednia > 127) r = g = b = 0;
    else r = g = b = 255;
    kolor[1] = "rgb(" + r + ", " + g + ", " + b +")"
    return kolor;
}



function rysujPlansze(opis, rozmiar)
{
    var i, j;
    plansza = "<table id = 'plansza_tabela'>";
    for(i = 0; i < rozmiar; ++i)
    {
        plansza += "<tr class = 'rzad' id = 'tr"+ i +"'>";
        for (j = 0; j < rozmiar; ++j) 
        {
            plansza += "<td class = 'pole" + 
                        opis[wspolrzedne(i, j, rozmiar)] +
                         "' id = 'td"+ wspolrzedne(i, j, rozmiar) +"'>";
            if (opis[wspolrzedne(i, j, rozmiar)] != 0)
                plansza += opis[wspolrzedne(i, j, rozmiar)];
            plansza += "<\/td>";
        }
        plansza += "<\/tr>";
    }
    return plansza+"<\/table>";
};

function nalozStyle(rozmiar, kolory)
{
    var i, j;
    var para_kolorow;
    for (i = 0; i < rozmiar; ++i)
    {
        para_kolorow = kolor(i);
        $('.pole' + i).css('background-color', para_kolorow[0]);
        $('.pole' + i).css('color', para_kolorow[1]);
        kolory.push(para_kolorow);
    }
    for(i = 0; i < rozmiar; ++i) 
    {
        for (j = 0; j < rozmiar; ++j)
        {
            $('#td' + wspolrzedne(i, j, rozmiar)).css('width', '50px');
            $('#td' + wspolrzedne(i, j, rozmiar)).css('height', '50px');
            $('#td' + wspolrzedne(i, j, rozmiar)).css('border-left', '1px solid');
            $('#td' + wspolrzedne(i, j, rozmiar)).css('border-right', '1px solid');
            $('#td' + wspolrzedne(i, j, rozmiar)).css('border-top', '1px solid');
            $('#td' + wspolrzedne(i, j, rozmiar)).css('border-bottom', '1px solid');
        }
    }
    return
}

function podswietlKomorke(id)
{
    $('#td' + id).css('background-color', '#CAEEFF');
    $('#td' + id).css('color', '#000000')
}

function zgasPodswietlenie(klasa, kolory)
{    
    $('.pole' + klasa).css('background-color', kolory[klasa][0]);
    $('.pole' + klasa).css('color', kolory[klasa][1]);
}

function budujGraf(rozmiar)
{
   for (i = 0; i < rozmiar * rozmiar; ++i)
   {
       this['td' + i] = new Array();
   }
   return this;
}

function uaktualnijGraf(id1, id2, graf)
{
    if (id1 == id2)
    {
        alert('Złe dane do uaktualnijGraf!');
        return;
    }
    graf[id1][graf[id1].length] = id2;
    graf[id2][graf[id2].length] = id1;
}
    
function zmienKlase(obiekt, na)
{
    $(obiekt).removeClass($(obiekt).attr('class'));
    $(obiekt).addClass(poczatekZaznaczenia);
    zgasPodswietlenie($(obiekt).attr('class').substr(4, 5), kolory);
}

function mouseover(obiekt)
{
    $('#debug').text($(obiekt).attr('id'));
    if (zaznaczam == 1)
    {
        if (poczatekZaznaczenia == 'pole0')
            $(obiekt).css('background-color', '#AACCFF');
        else if ($(obiekt).attr('class') == 'pole0')
            zmienKlase(obiekt, poczatekZaznaczenia);
        zaznaczanaSciezka.push($(obiekt).attr('id'));
    }
    else if (zaznaczam == 2)
    {
        zmienKlase(obiekt, 'pole0');
        odznaczanaSciezka.push($(obiekt).attr('id'));
    }
    else
        podswietlKomorke($(obiekt).attr('id').substr(2,3));
}

function mouseout(obiekt)
{
    if (zaznaczam == 0)
        zgasPodswietlenie($(obiekt).attr('class').substr(4, 5), kolory);
}

function mousedown(zdarzenie, obiekt)
{
    if (zdarzenie.which == 1)
    {
        zaznaczanaSciezka.push($(obiekt).attr('id'));
        zaznaczam = 1
    }
    else 
    {
        odznaczanaSciezka.push($(obiekt).attr('id'));
        zaznaczam = 2;
        $(obiekt).removeClass($(obiekt).attr('class'));
        $(obiekt).addClass('pole0');
    }    
    poczatekZaznaczenia = $(obiekt).attr('class');
    return false;
}

function mouseup(obiekt)
{
    var i, id;
    $('#debug').text($(obiekt).attr('id'));
    if (zaznaczam == 1) {
        while (zaznaczanaSciezka.length > 0)
        {
            id = '#' + zaznaczanaSciezka.pop();
            if ($(id).attr('class') != $(obiekt).attr('class') &&
                poczatekZaznaczenia == 'pole0')
            {
                $(id).removeClass('pole0');
                $(id).addClass($(obiekt).attr('class'));
            }
        }
    }
    zgasPodswietlenie($(obiekt).attr('class').substr(4, 5), kolory);
    zaznaczam = 0;
    return false;
}


$(document).ready(
    function()
    {
        graf = budujGraf(rozmiar);
        $('#plansza').html(rysujPlansze(opisPlanszy, rozmiar));
        $('#plansza').bind("contextmenu",function(){return false;});
        nalozStyle(rozmiar, kolory);
        $('[class^=pole]').mouseover(function(){mouseover(this)});
        $('[class^=pole]').mouseout(function(){mouseout(this)});
        $('[class^=pole]').mousedown(function(zdarzenie){return mousedown(zdarzenie, this)});
        $('[class^=pole]').mouseup(function(){return mouseup(this)});
    }
);


