/* PAGE_1 */
// VARIABLES
const page1 = document.getElementById("page_1"),
page2 = document.getElementById("page_2"),
page3 = document.getElementById("page_3");
welcome = document.querySelectorAll(".welcome");
// MAIN
main_1();
async function main_1()
{
    for (let i=0; i<3; i++)
    {
        setInterval(() => 
        {
            clear(welcome[i]);
        }, 6000);
        await sleep(2000);
    }
    async function clear(except)
    {
        except.style.opacity = 1;
        except.style.marginTop = 0;
        await sleep(2000);
        except.style.opacity = 0;
        except.style.marginTop = "30vw";
    }
}
// CLICKS
function start()
{
    page1.parentNode.removeChild(page1);
    page2.style.visibility = "visible";
    page2.style.width = "auto";
    page2.style.height = "auto";
}

/* PAGE_2 */
// VARIABLES
const contin = document.getElementById("continiue"),
pics = document.querySelectorAll(".pic"),
pick = document.getElementById("add"),
img = document.getElementById("img_0");
var image;
// MAIN
pick.addEventListener('change', (event) => 
{
    var image = pick.files[0];
    var reader = new FileReader();
    reader.onload = function(e) 
    {
      img.src = e.target.result;
    }
    reader.readAsDataURL(image);
});
// CLICKS
function select(image, pic)
{
    this.image = image.getAttribute('src');
    pics.forEach(element => { element.style.boxShadow = ''; });
    pic.style.boxShadow = '0 0 7px 7px rgba(0, 0, 0, 0.4)';
    contin.style.visibility = "visible";
    contin.style.opacity = "1";
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
const a = [],
selection = document.getElementById("select"),
shuffleBtn = document.getElementById("shuffle"),
text = [
    document.getElementById("h1"),
    document.getElementById("h2"),
    document.getElementById("h5")];
for (i=1; i<=8; i++) { a.push(document.getElementById("a" + i)) }
const pos = [
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
var ePos = [], moves = 0, shuffleLimit = 30, speed = 600, shuffled = false;
// MAIN
function main_3()
{
    defaults();
}
// FUNCTIONS
function defaults()
{
    ePos = pos[0];
    for (var i = 0; i < a.length; i++)
    {
        a[i].style.marginLeft = positions[i+1][0];
        a[i].style.marginTop = positions[i+1][1];
        a[i].style.backgroundImage = "url(" + image + ")";
    }
    selection.addEventListener('click', () => 
    {
        var promise = new Promise((resolve) => 
        {
            if(selection.value != 0) { resolve() };
        });
        promise.then(() => 
        {
            shuffleBtn.style.visibility = "visible";
            shuffleBtn.style.opacity = 1;
        });
    });
}
async function shuffle()
{
    text[0].style.visibility = "hidden";
    text[0].style.marginTop = "-5vw";
    text[0].style.opacity = 0;
    for (i=1; i<text.length; i++)
    {
        text[i].style.opacity = 1;
        text[i].style.visibility = "visible";
        text[i].style.marginTop = "5vw";
    }
    text[2].style.marginTop = "2vw";
    shuffleBtn.style.opacity = 0;
    shuffleBtn.style.visibility = "hidden";
    selection.style.opacity = 0;
    selection.style.visibility = "hidden";
    switch (selection.value)
    {
        case "3":
            speed = 600;
            break;
        case "30":
            speed = 300;
            break;
        default:
            speed = 2000 / selection.value;
            break;
    }
    shuffleLimit = selection.value;
    while (moves < shuffleLimit)
    {
        var array = [], last;
        switch (ePos.toString())
        {
            case pos[0].toString():
                array = [1,3];
                if (array.indexOf(last) != -1) { array.splice(array.indexOf(last), 1); }
                last = 0;
                break;
            case pos[1].toString():
                array = [0,2,4];
                array.splice(array.indexOf(last), 1);
                last = 1;
                break;
            case pos[2].toString():
                array = [1,5];
                array.splice(array.indexOf(last), 1);
                last = 2;
                break;
            case pos[3].toString():
                array = [0,4,6];
                array.splice(array.indexOf(last), 1);
                last = 3;
                break;
            case pos[4].toString():
                array = [1,3,5,7];
                array.splice(array.indexOf(last), 1);
                last = 4;
                break;
            case pos[5].toString():
                array = [2,4,8];
                array.splice(array.indexOf(last), 1);
                last = 5;
                break;
            case pos[6].toString():
                array = [3,7];
                array.splice(array.indexOf(last), 1);
                last = 6;
                break;
            case pos[7].toString():
                array = [4,6,8];
                array.splice(array.indexOf(last), 1);
                last = 7;
                break;
            case pos[8].toString():
                array = [5,7];
                array.splice(array.indexOf(last), 1);
                last = 8;
                break;
        }
        var rand = randomArrayList(array);
        for (i = 0; i < a.length; i++)
        {
            var aPos = [a[i].style.marginLeft, a[i].style.marginTop];
            if (aPos.toString() == pos[rand[0]].toString())
            {
                check(a[i]);
                await sleep(speed);
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
            { move(a, aPos); }
            break;
        case pos[1].toString():
            if ((aPos.toString() == pos[0].toString() || aPos.toString() == pos[2].toString()) || aPos.toString() == pos[4].toString())
            { move(a, aPos); }
            break;
        case pos[2].toString():
            if (aPos.toString() == pos[1].toString() || aPos.toString() == pos[5].toString())
            { move(a, aPos); }
            break;
        case pos[3].toString():
            if ((aPos.toString() == pos[0].toString() || aPos.toString() == pos[4].toString()) || aPos.toString() == pos[6].toString())
            { move(a, aPos); }
            break;
        case pos[4].toString():
            if ((aPos.toString() == pos[1].toString() || aPos.toString() == pos[3].toString()) || (aPos.toString() == pos[5].toString() || aPos.toString() == pos[7].toString()))
            { move(a, aPos); }
            break;
        case pos[5].toString():
            if ((aPos.toString() == pos[2].toString() || aPos.toString() == pos[4].toString()) || aPos.toString() == pos[8].toString())
            { move(a, aPos); }
            break;
        case pos[6].toString():
            if (aPos.toString() == pos[3].toString() || aPos.toString() == pos[7].toString())
            { move(a, aPos); }
            break;
        case pos[7].toString():
            if ((aPos.toString() == pos[4].toString() || aPos.toString() == pos[6].toString()) || aPos.toString() == pos[8].toString())
            { move(a, aPos); }
            break;
        case pos[8].toString():
            if (aPos.toString() == pos[5].toString() || aPos.toString() == pos[7].toString())
            { move(a, aPos); }
            break;
    }
}
function move(a, aPos)
{
    a.style.marginLeft = ePos[0];
    a.style.marginTop = ePos[1];
    ePos = aPos;
    moves++;
    if (moves >= shuffleLimit) { shuffled = true}
    checkComplete();
}
function checkComplete()
{
    all = [];
    all.push(ePos);
    a.forEach(element => 
    {
        var aPos = [element.style.marginLeft, element.style.marginTop];
        all.push(aPos);
    });
    for (i = 0; i < all.length; i++)
    {
        if (i != 0)
        {
            a[i-1].style.borderColor = "red";
            if (all[i].toString() == positions[i].toString()) 
            { a[i-1].style.borderColor = "green"; }
        } 
    }
    if (all.toString() == positions.toString()) { complete(); }
}
function complete()
{
    document.write("COMPLETED");
}
// CLICKS
function on_Click(a)
{
    if(shuffled) { check(a); }
}
function hover()
{
    a.forEach(element => 
    { 
        element.style.opacity = 0.8;
        var aPos = [element.style.marginLeft, element.style.marginTop];
        switch (ePos.toString())
        {
            case pos[0].toString():
                if (aPos.toString() == pos[1].toString() || aPos.toString() == pos[3].toString())
                element.style.opacity = 1;
                break;
            case pos[1].toString():
                if ((aPos.toString() == pos[0].toString() || aPos.toString() == pos[2].toString()) || aPos.toString() == pos[4].toString())
                element.style.opacity = 1;
                break;
            case pos[2].toString():
                if (aPos.toString() == pos[1].toString() || aPos.toString() == pos[5].toString())
                element.style.opacity = 1;
                break;
            case pos[3].toString():
                if ((aPos.toString() == pos[0].toString() || aPos.toString() == pos[4].toString()) || aPos.toString() == pos[6].toString())
                element.style.opacity = 1;
                break;
            case pos[4].toString():
                if ((aPos.toString() == pos[1].toString() || aPos.toString() == pos[3].toString()) || (aPos.toString() == pos[5].toString() || aPos.toString() == pos[7].toString()))
                element.style.opacity = 1;
                break;
            case pos[5].toString():
                if ((aPos.toString() == pos[2].toString() || aPos.toString() == pos[4].toString()) || aPos.toString() == pos[8].toString())
                element.style.opacity = 1;
                break;
            case pos[6].toString():
                if (aPos.toString() == pos[3].toString() || aPos.toString() == pos[7].toString())
                element.style.opacity = 1;
                break;
            case pos[7].toString():
                if ((aPos.toString() == pos[4].toString() || aPos.toString() == pos[6].toString()) || aPos.toString() == pos[8].toString())
                element.style.opacity = 1;
                break;
            case pos[8].toString():
                if (aPos.toString() == pos[5].toString() || aPos.toString() == pos[7].toString())
                element.style.opacity = 1;
                break;
        }
    });
}
function unhover()
{
    a.forEach(element => { element.style.opacity = 1; });
}
// STATIC FUNCTIONS
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
function randomArrayList(nums) 
{
    ranNums = [], i = nums.length, j = 0;
    while (i--) 
    {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }
    return ranNums;
}