function getLocalStorage(button) {
    let value = localStorage.getItem(button);
    if (value) {
        $(`#text${button}`).text(value);
    }
}

$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {
        let row = $(`<div data-time=${i} id='${i}' class="row">`);
        let times = $('<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + '</p>');
        let events = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);        
        let save = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="save"></i></button>`)
        
        row.append(times);
        row.append(events);
        row.append(save);
        $(".container").append(row);

        getLocalStorage(i);
    }
    function formatAMPM(hours) {
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
formatAMPM();

let saveBtn = $('.saveBtn');
saveBtn.on('click', function(){
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.description').val();
    localStorage.setItem(eventId, eventText);
});});