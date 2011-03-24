function gra(numer_planszy)
{
    var kolory = new Array();
    var zaznaczanaSciezka = new Array();
    var odznaczanaSciezka = new Array();
    var zaznaczam =  0; // 0 - nie zaznaczam, 1 - zaznaczam, 2 - odznaczam
    var poczatekZaznaczenia;
    var rozmiar = plansze[numer_planszy].rozmiar;
    var opisPlanszy = plansze[numer_planszy].opis;
    
    function zamienNaIdentyfikator(i, j)
    {
        return (i * rozmiar + j);
    }

    function zamienNaWspolrzedne(id)
    {
        var wynik = new Array();
        wynik.push(Math.floor(id / rozmiar));
        wynik.push(Math.floor(id % rozmiar));
        return wynik;
    }
    
    function struktura(rozmiar_, opisPlanszy_)
    {
        var plansza = new Array();
        var pozycje = new Array();
        var rozmiar = rozmiar_;
        var opisPlanszy = opisPlanszy_;
        
        this.buduj = function()
        {
            var i, j, miejsce;
            for (i = 0; i < rozmiar; ++i)
            {
                plansza[i] = new Array();
                for (j = 0; j < rozmiar; ++j)
                {
                    miejsce = zamienNaIdentyfikator(i, j)
                    plansza[i].push(opisPlanszy[miejsce]);
                    if (pozycje[opisPlanszy[miejsce]] == null)
                        pozycje[opisPlanszy[miejsce]] = new Array();
                    if (opisPlanszy[miejsce] != 0)
                        pozycje[opisPlanszy[miejsce]].push(miejsce);
                }
            }
        }
        
        this.uaktualnij = function(sciezka, kasuj)
        {
            var aktualny, i, j;
            while (sciezka.length > 0)
            {
                aktualny = sciezka.pop();
                i = zamienNaWspolrzedne(aktualny.substr(2,3))[0];
                j = zamienNaWspolrzedne(aktualny.substr(2,3))[1];
                if (kasuj && opisPlanszy[aktualny.substr(2,3)] == 0)
                    plansza[i][j] = 0;
                else if (opisPlanszy[aktualny.substr(2,3)] == 0)
                    plansza[i][j] = $('#' + aktualny).attr('class').substr(4,5);
            }
        }
        
        function dfs(numer)
        {
            var i1, i2, j1, j2;
            i1 = zamienNaWspolrzedne(pozycje[numer][0])[0];
            j1 = zamienNaWspolrzedne(pozycje[numer][0])[1];
            i2 = zamienNaWspolrzedne(pozycje[numer][1])[0];
            j2 = zamienNaWspolrzedne(pozycje[numer][1])[1];
            return true;
            
        }
        
        this.sprawdz = function()
        {
            for (i = 1; i < pozycje.length; ++i)
                if (!dfs(i)) return false;
            return true;
        }
    }    
    
    var graf = new struktura(rozmiar, opisPlanszy);
    graf.buduj();
    
    function kolor(i)
    {
        var kolor = new Array(2), r, g, b;
        if (i == 0)
        {
            kolor[0] = "#F5F3F3";
            kolor[1] = "#3F3F3F";
        }
        else
        {
            r = Math.floor(Math.random() * 100 + 155);
            g = Math.floor(Math.random() * 135 + 120);
            b = Math.floor(Math.random() * 200 + 55);
            kolor[0] = "rgb(" + r + ", " + g + ", " + b + ")";
            var srednia = (r + g + b) / 3;
            if (srednia > 127) r = g = b = 63;
            else r = g = b = 255;
            kolor[1] = "rgb(" + r + ", " + g + ", " + b +")"
        }
        return kolor;
    }
    
    
    
    function rysujPlansze()
    {
        var i, j;
        plansza = "<table id = 'plansza_tabela'>";
        for(i = 0; i < rozmiar; ++i)
        {
            plansza += "<tr class = 'rzad' id = 'tr"+ i +"'>";
            for (j = 0; j < rozmiar; ++j) 
            {
                plansza += "<td class = 'pole" + 
                            opisPlanszy[zamienNaIdentyfikator(i, j, rozmiar)] +
                             "' id = 'td"+ zamienNaIdentyfikator(i, j, rozmiar) +"'>";
                if (opisPlanszy[zamienNaIdentyfikator(i, j, rozmiar)] != 0)
                    plansza += opisPlanszy[zamienNaIdentyfikator(i, j, rozmiar)];
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
        for (i = 0; i <= rozmiar; ++i)
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
                $('#td' + zamienNaIdentyfikator(i, j, rozmiar)).css('width', '50px');
                $('#td' + zamienNaIdentyfikator(i, j, rozmiar)).css('height', '50px');
                $('#td' + zamienNaIdentyfikator(i, j, rozmiar)).css('border-left', '1px solid');
                $('#td' + zamienNaIdentyfikator(i, j, rozmiar)).css('border-right', '1px solid');
                $('#td' + zamienNaIdentyfikator(i, j, rozmiar)).css('border-top', '1px solid');
                $('#td' + zamienNaIdentyfikator(i, j, rozmiar)).css('border-bottom', '1px solid');
                $('#td' + zamienNaIdentyfikator(i, j, rozmiar)).css('font-size', '28px');
            }
        }
    }
    
    function podswietlKomorke(id)
    {
        var klasa = $('#td' + id).attr('class')
        $('#td' + id).css('background-color', '#CDD0D3');
        if(klasa != 'pole0')
        {
            $('.' + klasa).css('color', '#9F1E19');
            $('.' + klasa).css('font-size', '35px');
        }
    }
    
    function zgasPodswietlenie(klasa, kolory)
    {    
        $('.pole' + klasa).css('background-color', kolory[klasa][0]);
        $('.pole' + klasa).css('color', kolory[klasa][1]);
        $('.pole' + klasa).css('font-size', '26px');
    }
    
    function zmienKlase(obiekt, na)
    {
        if (opisPlanszy[$(obiekt).attr('id').substr(2,3)] == 0)
        {
            $(obiekt).removeClass($(obiekt).attr('class'));
            $(obiekt).addClass(na);
            zgasPodswietlenie($(obiekt).attr('class').substr(4, 5), kolory);
        }
    }
    
    function mouseover(obiekt)
    {
        if (zaznaczam == 1)
        {
            if (poczatekZaznaczenia == 'pole0')
                $(obiekt).css('background-color', '#B4B7BC');
            else
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
            if (opisPlanszy[$(obiekt).attr('id').substr(2,3)] == 0)
                zmienKlase(obiekt, "pole0");
        }    
        poczatekZaznaczenia = $(obiekt).attr('class');
        return false;
    }
    
    function mouseup(obiekt)
    {
        var i, id;
        if (zaznaczam == 1)
        {
            graf.uaktualnij(zaznaczanaSciezka, false);
            while (zaznaczanaSciezka.length > 0)
            {
                id = '#' + zaznaczanaSciezka.pop();
                if ($(id).attr('class') != $(obiekt).attr('class') &&
                    poczatekZaznaczenia == 'pole0')
                    zmienKlase(id, $(obiekt).attr('class'));
            }
        }
        else if (zaznaczam == 2)
        {
            graf.uaktualnij(odznaczanaSciezka, true);
            odznaczanaSciezka = new Array();
        }
        zaznaczam = 0;
        return false;
    }
    $('#plansza').html(rysujPlansze());
    $('#plansza').bind("contextmenu",function(){return false;});
    nalozStyle(rozmiar, kolory);
    $('[class^=pole]').mouseover(function(){mouseover(this)});
    $('[class^=pole]').mouseout(function(){mouseout(this)});
    $('[class^=pole]').mousedown(function(zdarzenie){return mousedown(zdarzenie, this)});
    $('[class^=pole]').mouseup(function(){return mouseup(this)});
}
