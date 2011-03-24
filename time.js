var time = 0;
var stop = false;
// wymaga identyfikatora 'stoper'
function stoper()
{// CRAPPY!!!!!!!!!!!!!
    setInterval(
        function()
        {
            var mm, ss, hh, hhs;
            hh = Math.floor(time / 3600);
            (hh == 0) ? hhs = "" : hhs = hh.toString() + ":";
            mm = (Math.floor(time / 60) % 60).toString();
            ss = Math.floor(time % 60).toString();
            if (ss.length < 2)
                ss = "0" + ss;
            if (!stop)
                time += 0.004;
            $('#stoper').text(hhs + mm + ":" + ss);
        }, 
    10);
}