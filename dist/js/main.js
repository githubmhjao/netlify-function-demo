const createTableHeader(leagues) {
  const thead =  document.createElement("thead");
  const tr = document.createElement("tr");
  
  leagues.forEach(league => {
    const th = document.createElement("th");
    const text = document.createTextNode(league);
    th.appendChild(text);
    th.setAttribute("scope", "col");
    tr.appendChild(th);
  })
  
  thead.appendChild(tr);
  return thead
}

const createTableBody(dataArray) {
  const tbody = document.createElement("tbody");
  
  dataArray[0]["classNames"].forEach((className, i) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(className));
    th.setAttribute("scope", "row");
    tr.appendChild(th);
    
    dataArray.forEach(data => {
      const td = document.createElement("td");
      const text = data.classes.filter(x => x === i).length;
      td.appendChild(text);
      tr.appendChild(td);
    })
  })
}

const getPoeStatistics = async () => {
  const leagues = ["ultimatum", "hardcore-ultimatum", "ssf-ultimatum", "ssf-ultimatum-hc"];
  
  const dataArray = await Promise.all(leagues.map(league => {
    const url = `/poe/api/overview=${league}&type=exp&language=en`;
    const res = awati fetch(url);
    const { classNames, classes } = await res.json();
    return { classNames, classes }
  }))
  
  leagues.splice(0, 0, "classNames").forEach(league);
  
  const thead = createTableHeader(leagues);  
  const tbody = createTableBody(dataArray);
  const table = document.getElementById("poeTable");
  table.appendChild(thead);
  table.appendChild(tbody);
}

getPoeStatistics();
