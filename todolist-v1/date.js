

//console.log(module);

module.exports = getDate;

function getDate() {

    var today = new Date();
    
    //sending from browser to server implementation
    var options = { 
        weekday: 'long' , 
        month: 'long',
         day: 'numeric'};

    var day  =today.toLocaleDateString("en-US",options);

    return day;
}
