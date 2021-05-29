const getPoeStatistics = async () => {
  const res = await fetch("/poe/api");
  const { poeClassNames, poeClasses } = await res.json();
  
  poeClassNames.forEach((poeClass, i) => {
    const li = document.createElement("li");
    const text = document.createTextNode(`${poeClass}: ${poeClasses.filter(x => x === i).length}`);
    li.appendChild(text);
    document.getElementById("poeClassNames").appendChild(li);
  })
}

getPoeStatistics();
