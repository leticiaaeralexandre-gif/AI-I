'use strict';

function RedesSociais(props) {
    var lista = props.redes;
    var itens = [];
    var i;

    for (i = 0; i < lista.length; i++) {
        itens.push(
            React.createElement(
                "a",
                {
                    key: "rede-" + i,
                    href: lista[i].ligacao,
                    className: "rede-social",
                    title: lista[i].nome
                },
                React.createElement(
                    "span",
                    { className: "circulo-rede" },
                    React.createElement("img", {
                        src: lista[i].imagem,
                        alt: lista[i].nome,
                        className: "icone-img"
                    })
                )
            )
        );
    }

    return React.createElement(
        "div",
        { className: "redes-sociais-container" },
        itens
    );
}

var redesEunice = [
    {
        nome: "Instagram EUNICE",
        ligacao: "https://www.instagram.com/eunice_university/",
        imagem: "imagens/instagram.png"
    },
    {
        nome: "LinkedIn EUNICE",
        ligacao: "https://www.linkedin.com/school/eunice-european-university/",
        imagem: "imagens/linkedin.png"
    },
    {
        nome: "YouTube EUNICE",
        ligacao: "https://www.youtube.com/@eunice_university",
        imagem: "imagens/youtube.png"
    },
    {
        nome: "Facebook EUNICE",
        ligacao: "https://www.facebook.com/eunice.european.university/",
        imagem: "imagens/facebook.png"
    }
];

function iniciarFooterDinamico() {
    var contentorRedes = document.getElementById("redes-sociais-react");
    if (contentorRedes) {
        ReactDOM.render(
            React.createElement(RedesSociais, { redes: redesEunice }),
            contentorRedes
        );
    }

    var logoTopo = document.getElementById("logo-eunice-link");
    if (logoTopo) {
        logoTopo.addEventListener("click", function () {
            window.location.href = "#topo";
        });
    }
}

iniciarFooterDinamico();