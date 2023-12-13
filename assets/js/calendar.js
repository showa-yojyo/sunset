document.addEventListener("DOMContentLoaded", initCalendar);

function initCalendar(event){
    const dateControl = document.querySelector('input[id="start"]');
    const today = new Date();
    const [month, date, year] = [
      today.getMonth() + 1,
      today.getDate() - 1,
      today.getFullYear(),
    ];

    dateControl.value = `${year}-${month}-${date}`;
    dateControl.min = '2020-04-27';
    dateControl.max = `${year}-${month}-${date}`;
}

function navigateToDiaryPage(){
    const base = '/sunset/diary'
    const dateControl = document.querySelector('input[id="start"]');
    const date = dateControl.value.replaceAll('-', '/'); // "YYYY/mm/dd"
    const url = `${base}/${date}/diary.html`
    console.debug(url);
    window.location.href = url;
}
