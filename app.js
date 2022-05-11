/* PAGE_1 */
// VARIABLES
const page1 = document.getElementById("page_1"),
page2 = document.getElementById("page_2"),
page3 = document.getElementById("page_3"),
animationBar = document.querySelector('.animation_bar').children;
let k = 3;

// MAIN
main_1();
function main_1()
{
    setInterval(function() 
    {
        animationBar[(k - 1) % 3].classList.remove('current_text');
        animationBar[k % 3].classList.add('current_text');
        k++;
    }, 2000);
}

// CLICKS
function start()
{
    page1.parentNode.removeChild(page1);
    page2.style.visibility = "visible";
    page2.style.width = "auto";
    page2.style.height = "auto";
}


/* PAGE_2*/
// VARIABLES
const contin = document.getElementById("continiue");
var image;

// CLICKS
function select(image)
{
    this.image = image;
    contin.style.visibility = "visible";
}
function continiue()
{
    page2.parentNode.removeChild(page2);
    page3.style.visibility = "visible";
    page3.style.width = "auto";
    page3.style.height = "auto";
    main_3();
}


/* PAGE_3 */
// VARIABLES
const 
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
var ePos = [], active = [];
var moves = 0, speed = 0;

// MAIN
function main_3()
{
    defaults();
}

// FUNCTIONS
function defaults()
{
    ePos = pos[0];
    for (var i = 0; i < 8; i++)
    {
        a[i].style.marginLeft = positions[i+1][0];
        a[i].style.marginTop = positions[i+1][1];
        switch (image)
        {
            case 1:
                a[i].style.backgroundImage = "url('assets/1.jpg')";
                break;
            case 2:
                a[i].style.backgroundImage = "url('assets/2.jpg')";
                break;
            case 3:
                a[i].style.backgroundImage = "url('assets/3.jpg')";
                break;
        }
    }
}
async function shuffle()
{    
    while (moves <= 30)
    {
        var array = [];
        switch (ePos.toString())
        {
            case pos[0].toString():
                array = [1,3];
                break;
            case pos[1].toString():
                array = [0,2,4];
                break;
            case pos[2].toString():
                array = [1,5];
                break;
            case pos[3].toString():
                array = [0,4,6];
                break;
            case pos[4].toString():
                array = [1,3,5,7];
                break;
            case pos[5].toString():
                array = [2,4,8];
                break;
            case pos[6].toString():
                array = [3,7];
                break;
            case pos[7].toString():
                array = [4,6,8];
                break;
            case pos[8].toString():
                array = [5,7];
                break;
        }
        var rand = randomArrayList(array);
        console.log(rand[0]);
        for (i = 0; i < a.length; i++)
        {
            var aPos = [a[i].style.marginLeft, a[i].style.marginTop];
            if (aPos.toString() == pos[rand[0]].toString())
            {
                check(a[i]);
                await sleep(600);
            }
        }
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
    moves++;
    checkComplete();
}
function checkComplete()
{
    all = [];
    all.push(ePos);
    for (i = 0; i < 8; i++)
    {
        var aPos = [a[i].style.marginLeft, a[i].style.marginTop];
        all.push(aPos);
    } 
    //
    for (i = 0; i < all.length; i++)
    {
        if (all[i].toString() == positions[i].toString())
        {
            a.forEach(ela => 
            {
                var aPos = [ela.style.marginLeft, ela.style.marginTop];
                if (all[i].toString() == aPos.toString())
                {
                    ela.style.borderColor = "green";
                }
                else
                {
                    console.log(all[i].toString() + "\n" +aPos.toString());
                    ela.style.borderColor = "red";
                }
            });
        }
    }
    //
    if (all.toString() == positions.toString())
    {
        complete();
    }
}
function complete()
{
    document.write("COMPLETED");
}

// CLICKS
function on_Click(a)
{
    check(a);
}
function hover()
{
    a.forEach(element => 
    {
        element.style.opacity = 0.8;
    });
}
function unhover()
{
    a.forEach(element => 
    {
        element.style.opacity = 1;
    });
}

// STATIC FUNCTIONS
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
function randomArrayList(nums) 
{
    ranNums = [],
    i = nums.length,
    j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }
    return ranNums;
}