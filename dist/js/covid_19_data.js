const colStart = 7;
const colEnd = 11;

const dateArray = [...Array(7)].map((x, i) => {
  const selectDate = new Date(Date.now() - (8 - i)*24*3600*1000).toJSON();
  const year = selectDate.slice(0, 4);
  const month = selectDate.slice(5, 7);
  const date = selectDate.slice(8, 10);
  return `${month}-${date}-${year}`
})

const createTableHead = statistics => {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.appendChild(document.createTextNode("Date"));
  th.setAttribute("scope", "col");
  tr.appendChild(th);
  
  statistics[0].colNames.slice(colStart, colEnd).forEach(colName => {
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(colName));
    th.setAttribute("scope", "col");
    tr.appendChild(th);
  })
  
  thead.appendChild(tr);
  
  return thead
}

const createTableBody = statistics => {
  const tbody = document.createElement("tbody");
  
  statistics.forEach(x => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(x.date));
    th.setAttribute("scope", "row");
    tr.appendChild(th);
    
    x.dataTaiwan.slice(colStart, colEnd).forEach(d => {
      const td = document.createElement("td");
      td.appendChild(document.createTextNode(d));
      tr.appendChild(td);
    })
    
    tbody.appendChild(tr);
  })
  
  return tbody
}

const getCovid19Data = async date => {
  const parser = new DOMParser();
  const res = await fetch(`/covid_19/api/${date}.csv`);
  const sourceString = await res.text();
  
  const doc = parser.parseFromString(sourceString, "text/html");
  const dataWorld = [...doc.querySelectorAll(".blob-code.blob-code-inner.js-file-line")]
  const colNames = dataWorld[0].innerText.split(",")
  const dataTaiwan = dataWorld.filter(x => x.innerText.split(",")[3].includes("Taiwan") )[0].innerText.split(",")
  
  return { date, colNames, dataTaiwan }
}

const getCovid19Statistics = async dateArray => {
  const statistics = await Promise.all(dateArray.map(async date => await getCovid19Data(date)));
  const thead = createTableHead(statistics);
  const tbody = createTableBody(statistics);
  const table = document.getElementById("covid19Table");
  table.appendChild(thead);
  table.appendChild(tbody);
}

getCovid19Statistics(dateArray);
