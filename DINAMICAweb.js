
/* ACTIVITIES */

"use strict";

var CATEGORIAS = [
  "Celebration Days",
  "Cultural & Diversity",
  "Games",
  "Social Impact",
  "Sport & Well-being",
  "Sustainability"
];

var COMPETENCIAS = [
  "Cognitive flexibility",
  "Communication",
  "Digital competence",
  "Global intercultural competence",
  "Problem solving",
  "Self-management",
  "Teamworking",
  "Technical competence"
];

var ATIVIDADES = [
  {
    id: 1,
    titulo: "Alliance Games 2024",
    data: "21-25 OCTOBER 2024",
    ano: "2024",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Sport & Well-being",
    competencias: ["Teamworking", "Global intercultural competence"]
  },
  {
    id: 2,
    titulo: "Wall of Femme 2025",
    data: "8 MARCH 2025",
    ano: "2025",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Social Impact",
    competencias: ["Communication", "Global intercultural competence"]
  },
  {
    id: 3,
    titulo: "EUNICE On Route 2025",
    data: "8 MAY 2025",
    ano: "2025",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Games",
    competencias: ["Digital competence", "Problem solving"]
  },
  {
    id: 4,
    titulo: "Palio d'Ateneo 2025",
    data: "16-18 MAY 2025",
    ano: "2025",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Sport & Well-being",
    competencias: ["Teamworking", "Self-management"]
  },
  {
    id: 5,
    titulo: "EUNICE & Music 2025",
    data: "22 MAY 2025",
    ano: "2025",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Cultural & Diversity",
    competencias: ["Communication", "Global intercultural competence"]
  },
  {
    id: 6,
    titulo: "Volunteering Camp 2025",
    data: "7-12 JULY 2025",
    ano: "2025",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Sustainability",
    competencias: ["Teamworking", "Technical competence"]
  },
  {
    id: 7,
    titulo: "Day of Languages 2025",
    data: "2 OCTOBER 2025",
    ano: "2025",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Celebration Days",
    competencias: ["Communication", "Global intercultural competence"]
  },
  {
    id: 8,
    titulo: "E-Chess Tournament 2025",
    data: "28 NOVEMBER 2025",
    ano: "2025",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Games",
    competencias: ["Cognitive flexibility", "Self-management"]
  },
  {
    id: 9,
    titulo: "Earth Day 2026",
    data: "22 APRIL 2026",
    ano: "2026",
    imagem: "IMAGENS/LOGOEUNICE.png",
    categoria: "Sustainability",
    competencias: ["Teamworking", "Problem solving"]
  }
];

function CartaoAtividade(props) {
  var item = props.atividade;
  var badges = [];
  var i;

  for (i = 0; i < item.competencias.length; i++) {
    badges.push(
      React.createElement(
        "span",
        { key: item.competencias[i], className: "badge-comp" },
        item.competencias[i]
      )
    );
  }

  return React.createElement(
    "article",
    { className: "cartao-ativ" },
    React.createElement("img", {
      src: item.imagem,
      alt: item.titulo
    }),
    React.createElement(
      "div",
      { className: "conteudo-cartao" },
      React.createElement("p", { className: "data-ativ" }, item.data),
      React.createElement("h3", { className: "titulo-ativ" }, item.titulo),
      React.createElement("span", { className: "badge-cat" }, item.categoria),
      badges
    )
  );
}

class ModuloAtividades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pesquisa: "",
      categoria: "",
      competencia: ""
    };
  }

  aoPesquisar(e) {
    this.setState({ pesquisa: e.target.value });
  }

  aoClicarCategoria(cat) {
    if (this.state.categoria === cat) {
      this.setState({ categoria: "" });
    } else {
      this.setState({ categoria: cat });
    }
  }

  aoClicarCompetencia(comp) {
    if (this.state.competencia === comp) {
      this.setState({ competencia: "" });
    } else {
      this.setState({ competencia: comp });
    }
  }

  aoLimpar() {
    this.setState({
      pesquisa: "",
      categoria: "",
      competencia: ""
    });
  }

  filtrarLista() {
    var lista = [];
    var termo = this.state.pesquisa.toLowerCase();
    var i;
    var j;

    for (i = 0; i < ATIVIDADES.length; i++) {
      var item = ATIVIDADES[i];
      var okPesquisa = true;
      var okCategoria = true;
      var okCompetencia = true;

      if (termo !== "") {
        var titulo = item.titulo.toLowerCase();
        var categoria = item.categoria.toLowerCase();
        var competencias = item.competencias.join(" ").toLowerCase();
        if (titulo.indexOf(termo) === -1 && categoria.indexOf(termo) === -1 && competencias.indexOf(termo) === -1) {
          okPesquisa = false;
        }
      }

      if (this.state.categoria !== "" && item.categoria !== this.state.categoria) {
        okCategoria = false;
      }

      if (this.state.competencia !== "") {
        var temComp = false;
        for (j = 0; j < item.competencias.length; j++) {
          if (item.competencias[j] === this.state.competencia) {
            temComp = true;
          }
        }
        if (!temComp) {
          okCompetencia = false;
        }
      }

      if (okPesquisa && okCategoria && okCompetencia) {
        lista.push(item);
      }
    }

    return lista;
  }

  render() {
    var self = this;
    var filtradas = this.filtrarLista();
    var catsRender = [];
    var compsRender = [];
    var cardsRender = [];
    var i;

    for (i = 0; i < CATEGORIAS.length; i++) {
      (function(nomeCat) {
        var cls = "cartao-cat";
        if (self.state.categoria === nomeCat) {
          cls = "cartao-cat cartao-cat-ativa";
        }
        catsRender.push(
          React.createElement(
            "div",
            {
              key: nomeCat,
              className: cls,
              onClick: function() { self.aoClicarCategoria(nomeCat); }
            },
            React.createElement("h3", null, nomeCat)
          )
        );
      })(CATEGORIAS[i]);
    }

    for (i = 0; i < COMPETENCIAS.length; i++) {
      (function(nomeComp) {
        var ativa = self.state.competencia === nomeComp;
        var clsComp = ativa ? "botao-comp botao-comp-ativa" : "botao-comp";
        var rotuloComp = ativa ? "✓ " + nomeComp : nomeComp;
        compsRender.push(
          React.createElement(
            "button",
            {
              key: nomeComp,
              type: "button",
              className: clsComp,
              onClick: function() { self.aoClicarCompetencia(nomeComp); }
            },
            rotuloComp
          )
        );
      })(COMPETENCIAS[i]);
    }

    for (i = 0; i < filtradas.length; i++) {
      cardsRender.push(
        React.createElement(CartaoAtividade, {
          key: filtradas[i].id,
          atividade: filtradas[i]
        })
      );
    }

    if (cardsRender.length === 0) {
      cardsRender.push(
        React.createElement("p", { key: "sem-resultados" }, "Nenhuma atividade encontrada.")
      );
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "section",
        { id: "atividades", className: "bloco-atividades" },
        React.createElement(
          "div",
          { className: "cabecalho-atividades" },
          React.createElement(
            "h1",
            null,
            "Discover.",
            React.createElement("br"),
            React.createElement("span", { className: "amarelo-eunice" }, "Filter. Remember.")
          ),
          React.createElement(
            "p",
            { className: "descricao-atividades" },
            "From classrooms to playing fields — discover the experiences that shaped the EUNICE community."
          )
        ),
        React.createElement("input", {
          type: "search",
          className: "campo-pesquisa",
          placeholder: "Search by activity, location or competency...",
          value: this.state.pesquisa,
          onChange: function(e) { self.aoPesquisar(e); }
        }),
        React.createElement("p", { className: "rotulo-filtro" }, "Categories"),
        React.createElement("div", { className: "grelha-categorias" }, catsRender),
        React.createElement("p", { className: "rotulo-filtro" }, "Competencies"),
        React.createElement("div", { className: "lista-comp" }, compsRender),
        React.createElement(
          "div",
          { className: "cabecalho-resultados" },
          React.createElement("p", null, "Activities (" + filtradas.length + ")"),
          React.createElement(
            "button",
            {
              type: "button",
              className: "botao-reset",
              onClick: function() { self.aoLimpar(); }
            },
            "Limpar filtros"
          )
        ),
        React.createElement("div", { className: "grelha-cartoes" }, cardsRender)
      )
    );
  }
}

ReactDOM.render(
  React.createElement(ModuloAtividades, null),
  document.getElementById("atividades-root")
);
