// Convertit le texte brut en HTML : \n => <br>, lignes "- xxx" => <ul><li>
function formaterTexte(texte) {
  var lignes = texte.split('\n');
  var html = '';
  var dansListe = false;

  lignes.forEach(function(ligne) {
    if (ligne.match(/^-[\s]/)) {
      if (!dansListe) {
        html += '<ul>';
        dansListe = true;
      }
      html += '<li>' + ligne.replace(/^-\s*/, '') + '</li>';
    } else {
      if (dansListe) {
        html += '</ul>';
        dansListe = false;
      }
      if (html) html += '<br>';
      html += ligne;
    }
  });

  if (dansListe) html += '</ul>';
  return html;
}

// Remplit la page avec le contenu défini dans contenu.js
function chargerContenu() {
  const page = document.body.dataset.page;
  if (!page || !contenu[page]) return;

  const data = contenu[page];

  // Titre
  const titreEl = document.getElementById('titre');
  if (titreEl && data.titre) titreEl.textContent = data.titre;

  // Sous-titre (accueil uniquement)
  const sousTitreEl = document.getElementById('sous-titre');
  if (sousTitreEl && data.sousTitre) sousTitreEl.textContent = data.sousTitre;

  // Texte
  const texteEl = document.getElementById('texte');
  if (texteEl && data.texte) texteEl.innerHTML = formaterTexte(data.texte);

  // Crédits (page fin)
  const creditsEl = document.getElementById('credits');
  if (creditsEl && data.credits) creditsEl.textContent = data.credits;

  // Quiz
  if (page === 'quiz' && data.questions) {
    chargerQuiz(data.questions);
  }
}

function chargerQuiz(questions) {
  const container = document.getElementById('quiz-container');
  const resultat = document.getElementById('quiz-resultat');
  if (!container) return;

  let score = 0;
  let repondu = 0;

  questions.forEach(function(q, i) {
    const bloc = document.createElement('div');
    bloc.className = 'quiz-question';

    const titre = document.createElement('p');
    titre.className = 'quiz-question-text';
    titre.textContent = (i + 1) + '. ' + q.question;
    bloc.appendChild(titre);

    q.choix.forEach(function(choix, j) {
      const btn = document.createElement('button');
      btn.className = 'quiz-choix';
      btn.textContent = choix;
      btn.addEventListener('click', function() {
        if (bloc.dataset.repondu) return;
        bloc.dataset.repondu = 'true';
        repondu++;

        if (j === q.reponse) {
          btn.classList.add('quiz-correct');
          score++;
        } else {
          btn.classList.add('quiz-faux');
          bloc.querySelectorAll('.quiz-choix')[q.reponse].classList.add('quiz-correct');
        }

        if (repondu === questions.length) {
          resultat.style.display = 'block';
          if (score === questions.length) {
            resultat.textContent = '🎉 Bravo ! ' + score + '/' + questions.length + ' – Tu as tout bon !';
            resultat.classList.add('quiz-parfait');
          } else {
            resultat.textContent = 'Tu as ' + score + '/' + questions.length + ' bonnes réponses !';
          }
        }
      });
      bloc.appendChild(btn);
    });

    container.appendChild(bloc);
  });
}

document.addEventListener('DOMContentLoaded', chargerContenu);
