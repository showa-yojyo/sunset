document.addEventListener("DOMContentLoaded", initCalendar);

function initCalendar(event){
    const dateControl = document.querySelector('input[id="start"]');
    const today = new Date();
    const todayYYYYmmdd = today.toISOString().split('T', 1);

    dateControl.value = todayYYYYmmdd;
    dateControl.min = '2020-04-27';
    dateControl.max = todayYYYYmmdd;
}

function navigateToDiaryPage(basePath){
    const dateControl = document.querySelector('input[id="start"]');
    const date = dateControl.value.replaceAll('-', '/'); // "YYYY/mm/dd"
    const url = `${basePath}/diary/${date}/diary.html`
    window.location.href = encodeURI(url);
}
