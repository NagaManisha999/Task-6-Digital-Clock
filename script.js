function updateClock() {

    const now = new Date();
    const df = new Intl.DateTimeFormat("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const parts = df.formatToParts(now);
    const map = {};
    parts.forEach(p => { if (p.type !== "literal") map[p.type] = p.value; });

    const hours24 = parseInt(map.hour, 10);
    const minutes = parseInt(map.minute, 10);
    const seconds = parseInt(map.second, 10);
    const period = hours24 >= 12 ? "AM": "PM";
    const hours12 = hours24 % 12 || 12;

    const formatTime = value => String(value).padStart(2, "0");

    document.getElementById("time").textContent =
        `${formatTime(hours12)}:${formatTime(minutes)}:${formatTime(seconds)}`;

    document.getElementById("period").textContent = period;

    document.getElementById("date").textContent =
        `${map.weekday}, ${map.month} ${map.day}, ${map.year}`;

    const statusEl = document.querySelector(".status");
    if (statusEl) {
        statusEl.textContent = `● Now live time is ${period}`;
    }
}

updateClock();

setInterval(updateClock, 1000);