const getPoeStatistics = async () => {
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
