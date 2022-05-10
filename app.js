// VARIABLES
const 
e = document.getElementById("empty"),
a = [    
    document.getElementById("a1"),
    document.getElementById("a2"),
    document.getElementById("a3"),
    document.getElementById("a4"),
    document.getElementById("a5"),
    document.getElementById("a6"),
    document.getElementById("a7"),
    document.getElementById("a8"),],
pos = [
    ["0px",     "0px"],
    ["200px",   "0px"],
    ["400px",   "0px"],
    ["0px",   "200px"],
    ["200px", "200px"],
    ["400px", "200px"],
    ["0px",   "400px"],
    ["200px", "400px"],
    ["400px", "400px"]],
positions = [pos[0], pos[1], pos[2], pos[3], pos[4], pos[5], pos[6], pos[7], pos[8]];
var ePos = [];

// MAIN
main();
function main()
{
    defaults();
}

// FUNCTIONS
function defaults()
{
    var rand = randomArray(0,8+1);
    ePos = positions[rand[8]];
    for (var i = 0; i < 8; i++)
    {
        a[i].style.marginLeft = positions[rand[i]][0];
        a[i].style.marginTop = positions[rand[i]][1];
    }
}
function check(a)
{
    var aPos = [a.style.marginLeft, a.style.marginTop];
    switch (ePos.toString())
    {
        case pos[0].toString():
            if (aPos.toString() == pos[1].toString() || aPos.toString() == pos[3].toString())
            {
                move(a, aPos);
            }
            break;
        case pos[1].toString():
            if ((aPos.toString() == pos[0].toString() || aPos.toString() == pos[2].toString()) || aPos.toString() == pos[4].toString())
            {
                move(a, aPos);
            }
            break;
        case pos[2].toString():
            if (aPos.toString() == pos[1].toString() || aPos.toString() == pos[5].toString())
            {
                move(a, aPos);
            }
            break;
        case pos[3].toString():
            if ((aPos.toString() == pos[0].toString() || aPos.toString() == pos[4].toString()) || aPos.toString() == pos[6].toString())
            {
                move(a, aPos);
            }
            break;
        case pos[4].toString():
            if ((aPos.toString() == pos[1].toString() || aPos.toString() == pos[3].toString()) || (aPos.toString() == pos[5].toString() || aPos.toString() == pos[7].toString()))
            {
                move(a, aPos);
            }
            break;
        case pos[5].toString():
            if ((aPos.toString() == pos[2].toString() || aPos.toString() == pos[4].toString()) || aPos.toString() == pos[8].toString())
            {
                move(a, aPos);
            }
            break;
        case pos[6].toString():
            if (aPos.toString() == pos[3].toString() || aPos.toString() == pos[7].toString())
            {
                move(a, aPos);
            }
            break;
        case pos[7].toString():
            if ((aPos.toString() == pos[4].toString() || aPos.toString() == pos[6].toString()) || aPos.toString() == pos[8].toString())
            {
                move(a, aPos);
            }
            break;
        case pos[8].toString():
            if (aPos.toString() == pos[5].toString() || aPos.toString() == pos[7].toString())
            {
                move(a, aPos);
            }
            break;
    }
}
function move(a, aPos)
{
    a.style.marginLeft = ePos[0];
    a.style.marginTop = ePos[1];
    ePos = aPos;
}

// CLICKS
function on_Click(a)
{
    check(a);
}

// STATIC FUNCTIONS
function randomArray(min, max)
{
    arr=[];
    for (i = 0; i < max; i++) 
    {
        x = Math.floor( Math.random() * max) + min;
        if(arr.includes(x) == true)
        {
            i=i-1;
        }
        else
        {
            if(x>max==false)
            {
                arr.push(x);
            }
        }
    }
    return arr;
}
