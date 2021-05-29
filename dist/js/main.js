const getPoeStatistics = async () => {
  const leagues = ["ultimatum", "hardcore-ultimatum", "ssf-ultimatum", "ssf-ultimatum-hc"];
  
  const dataArray = await Promise.all(leagues.map(league => {
    const url = `/poe/api/overview=${league}&type=exp&language=en`;
    const res = awati fetch(url);
    const { classNames, classes } = await res.json();
    return { classNames, classes }
  }))
  
  leagues.splice(0, 0, "classNames").forEach(league)
  
  const res = await fetch("/poe/api/overview=ultimatum&type=exp");
  const { classNames, classes } = await res.json();
  
  classNames.forEach((poeClass, i) => {
    const li = document.createElement("li");
    const text = document.createTextNode(`${poeClass}: ${classes.filter(x => x === i).length}`);
    li.appendChild(text);
    document.getElementById("poeClassNames").appendChild(li);
  })
}

getPoeStatistics();
