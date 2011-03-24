function rysujMenu()
{
    var i, menu = "", menu_lewe = "", menu_prawe = "";
    var uruchomiona;
    
    menu_lewe += "<h1>Zmiana planszy:</h1>";
    menu_prawe += "<h1>Twoje czasy</h1>";
    for (i = 0; i < plansze.length; ++i)
    {
        menu += "<div class=\"menu\" id=\"menu" + i + "\"> PLANSZA " + (i + 1) + "<\/div>";
        menu_lewe += "<div class=\"menu\" id=\"lewe_menu" + i + "\"> PLANSZA " + (i + 1) + "<\/div>";
        menu_prawe += "<div class=\"menu\" id=\"prawe_menu" + i + "\"> PLANSZA " + (i + 1) + "<\/div>";
    }
    menu_prawe += "<hr />";
    menu_prawe += "<h1 id=\"teraz\">Czas<h1>"
    menu_prawe += "<div id=\"stoper\">";
    $('#plansza').hide();
    $('#lewa').hide();
    $('#prawa').hide();
    $('#lewa').html(menu_lewe);
    $('#menu').html(menu);
    $('#prawa').html(menu_prawe);
    $('#teraz').mouseover(
        function()
        {
            $(this).hide();
            if (stop)
                $(this).text("Start");
            else
                $(this).text("Stop");
            $(this).fadeIn(600);
        }
    );
    $('#teraz').mouseout(
        function()
        {
            $(this).hide();
            $(this).text("Czas:");
            $(this).fadeIn(400);
        }
    );
    $('#teraz').click(function(){(stop == true) ? stop = false : stop = true;})
    $('[id^=menu]').css('width', '500px');
    $('[id^=menu]').click(
        function()
        {
            $('[id^=menu]').hide(1000, function () {$('[id^=menu]').remove();}).fadeIn(1000);
            if(!uruchomiona)
            {
                uruchomiona = true;
                gra($(this).attr('id').substr(4,5));
            }
            $('#plansza').delay(1000).show(1000).fadeIn(1000);
            $('#lewa').delay(1000).show(1000).fadeIn(1000);
            $('#prawa').delay(1000).show(1000).fadeIn(1000);
            setTimeout(stoper(stop), 1000);
        }
    );
    $('[id^=lewe_menu]').click(
        function()
        {
            $('#plansza').hide();
            uruchomiona = false;
            gra($(this).attr('id').substr(9,10));
            $('#plansza').show(1000).fadeIn(1000);
            
        }
    );
}
$(document).ready(function(){rysujMenu();});


